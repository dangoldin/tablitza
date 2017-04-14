"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ReactDataSheet from 'react-datasheet';

class Main extends Component {
    constructor(props){
        super(props)

        const addRowCell = {value: '', readOnly: true, component: (
                    <button onClick={() => this.addRow() }>
                        +
                    </button>
                ), forceComponent: true};

        const addColCell = {value: '', readOnly: true, component: (
                    <button onClick={() => this.addCol() }>
                        +
                    </button>
                ), forceComponent: true}

        this.state = {
            config: {
                'rows': 10,
                'cols': 5
            },
            data: [
                [{value: '', readOnly: true}, {value: 'A', readOnly: true}, addColCell],
                [{value: 1, readOnly: true},{value: 4}],
                [{value: 2, readOnly: true},{value: 6}],
                [{value: 3, readOnly: true},{value: 8}],
                [{value: 4, readOnly: true},{value: 10}],
                [addRowCell]
            ]
        }
    }

    getData() {
        let config = this.state.config;
        let data = this.state.data;
        const rows = config.rows;
        const cols = config.cols;

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
            for (var i = row.length - 1; i < cols; i++) {
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
        newRows[newRows.length - 1][0] = {
            value: '', readOnly: true, component: (
                    <button onClick={() => this.addRow() }>
                        +
                    </button>
                ), forceComponent: true}

        // addCol option
        newRows[0][cols - 1] = {
            value: '', readOnly: true, component: (
                    <button onClick={() => this.addCol() }>
                        +
                    </button>
                ), forceComponent: true}

        return newRows;
    }

    addRow() {
        let config = this.state.config;
        config.rows += 1;

        this.setState({
            config: config,
            data: this.getData()
        })
    }

    addCol() {
        let config = this.state.config;
        config.cols += 1;

        this.setState({
            config: config,
            data: this.getData()
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
