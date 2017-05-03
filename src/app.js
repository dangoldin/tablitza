"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ReactDataSheet from 'react-datasheet';
import mathjs from 'mathjs';
import _ from 'lodash';

// https://github.com/nadbm/react-datasheet/blob/master/docs/src/examples/MathSheet.js

class Main extends Component {
    constructor(props){
        super(props)

        const origData = [
            [{value: '', expr: '', readOnly: true}, {value: 'A', expr: 'A', readOnly: true}, this.getAddColCell()],
            [{value: 1, expr: 1, readOnly: true}],
            [{value: 2, expr: 1, readOnly: true}],
            [{value: 3, expr: 1, readOnly: true}],
            [{value: 4, expr: 1, readOnly: true}],
            [this.getAddRowCell()]
        ];

        const origConfig = {
            rows: 10,
            cols: 5
        }

        this.state = {
            config: origConfig,
            data: this.getData(origConfig, origData)
        }

        this.onChange = this.onChange.bind(this);
    }

    getAddRowCell() {
        return {value: '', expr: '', readOnly: true, className: 'add read-only', component: (
                    <button onClick={() => this.addRow() }>
                        +
                    </button>
                ), forceComponent: true};
    }

    getAddColCell() {
        return {value: '', expr: '', readOnly: true, className: 'add read-only', component: (
                    <button onClick={() => this.addCol() }>
                        +
                    </button>
                ), forceComponent: true}
    }

    getData(config, data) {
        const rows = config.rows;
        const cols = config.cols;

        // Go through each existing row
        const newRows = data.map((row, idx) => {
            // First row
            if (idx == 0) {
                const vals = row;

                for (var i = row.length - 1; i < cols; i++) {
                    // TODO: Go past 26
                    const char = String.fromCharCode(65 + i);
                    vals[i] = {value: char, expr: char, readOnly: true};
                }

                return vals;
            }

            const vals = row;
            vals[0] = { value: idx, expr: idx, readOnly: true };
            for (var i = row.length; i < cols; i++) {
                vals[i] = {value: '', expr: ''};
            }
            return vals;
        });

        newRows.pop(); // This is the old addRow

        const emptyRow = [];
        for (var i = 0; i < cols; i++) {
            emptyRow[i] = {value: '', expr: ''};
        }

        for (var i = data.length - 1; i < rows; i++) {
            // Need to do it this way as a deep copy
            const newRow =  JSON.parse(JSON.stringify(emptyRow));
            newRow[0] = {value: i, expr: i, readOnly: true};

            newRows.push(newRow);
        }

        // addRow option
        newRows[newRows.length - 1][0] = this.getAddRowCell();

        // addCol option
        newRows[0][cols - 1] = this.getAddColCell();

        return newRows;
    }

    addRow() {
        let config = this.state.config;
        config.rows += 1;

        this.setState({
            config: config,
            data: this.getData(config, this.state.data)
        })
    }

    addCol() {
        let config = this.state.config;
        config.cols += 1;

        this.setState({
            config: config,
            data: this.getData(config, this.state.data)
        })
    }

    validateExp(trailKeys, expr) {
        let valid = true;
        const matches = expr.match(/[A-Z][1-9]+/g) || [];
        matches.map(match => {
        if(trailKeys.indexOf(match) > -1) {
            valid = false
        } else {
            valid = this.validateExp([...trailKeys, match], this.state[match].expr)
        }
        })
        return valid
    }

    computeExpr(key, expr, scope) {
        let value = null;
        if(expr.charAt(0) !== '=') {
            return {className: '', value: expr, expr: expr};
        } else {
            try {
                value = mathjs.eval(expr.substring(1), scope)
            } catch(e) {
                value = null
            }

            if(value !== null && this.validateExp([key], expr)) {
                return {className: 'equation', value, expr}
            } else {
                return {className: 'error', value: 'error', expr: ''}
            }
        }
    }

    cellUpdate(state, changeCell, expr) {
        const scope = _.mapValues(state, (val) => isNaN(val.value) ? 0 : parseFloat(val.value))
        const updatedCell = _.assign({}, changeCell, this.computeExpr(changeCell.key, expr, scope))
        state[changeCell.key] = updatedCell

        _.each(state, (cell, key) => {
            debugger;

            if(cell.expr.charAt(0) === '=' && cell.expr.indexOf(changeCell.key) > -1 && key !== changeCell.key) {
                state = this.cellUpdate(state, cell, cell.expr)
            }
        })
        return state
    }

    onChange(changeCell, i, j, expr) {
        const grid = _.assign({}, this.state)
        this.cellUpdate(state, changeCell, expr)
        this.setState(state)
    }

    render(){
        return (
            <div>
                <h1>Tablitza</h1>
                <div className="sheet-container">
                    <ReactDataSheet
                        data={this.state.data}
                        valueRenderer={(cell) => cell.value}
                        dataRenderer={(cell) => cell.expr}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}

var main = document.getElementById('main');
ReactDOM.render(<Main />, main);
