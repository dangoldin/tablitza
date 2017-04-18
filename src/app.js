"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ReactDataSheet from 'react-datasheet';

class Main extends Component {
    constructor(props){
        super(props)

        const origData = [
            [{value: '', readOnly: true}, {value: 'A', readOnly: true}, this.getAddColCell()],
            [{value: 1, readOnly: true}],
            [{value: 2, readOnly: true}],
            [{value: 3, readOnly: true}],
            [{value: 4, readOnly: true}],
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
    }

    getAddRowCell() {
        return {value: '', readOnly: true, className: 'add read-only', component: (
                    <button onClick={() => this.addRow() }>
                        +
                    </button>
                ), forceComponent: true};
    }

    getAddColCell() {
        return {value: '', readOnly: true, className: 'add read-only', component: (
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
                    vals[i] = {value: char, readOnly: true};
                }

                return vals;
            }

            const vals = row;
            vals[0] = { value: idx, readOnly: true };
            for (var i = row.length; i < cols; i++) {
                vals[i] = {value: ''};
            }
            return vals;
        });

        newRows.pop(); // This is the old addRow

        const emptyRow = [];
        for (var i = 0; i < cols; i++) {
            emptyRow[i] = {value: ''};
        }

        for (var i = data.length - 1; i < rows; i++) {
            const newRow = Array.from(emptyRow);
            newRow[0] = {value: i, readOnly: true};

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

    render(){
        return (
            <div>
                <h1>Tablitza</h1>
                <div className="sheet-container">
                    <ReactDataSheet
                        data={this.state.data}
                        valueRenderer={(cell) => cell.value}
                        onChange={(cell, colI, rowJ, value) =>
                            this.setState({
                                data: this.state.data.map((col) =>
                                    col.map((rowCell) =>
                                        (rowCell == cell) ? ({value: value}) : rowCell
                                    )
                                )
                            })
                        }
                    />
                </div>
            </div>
        )
    }
}

var main = document.getElementById('main');
ReactDOM.render(<Main />, main);
