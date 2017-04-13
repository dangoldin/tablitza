"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ReactDataSheet from 'react-datasheet';

class Main extends Component {
    constructor(props){
        super(props)

        this.state = {
            config: {
                'row': 5,
                'col': 5
            },
            data: [
                [{value: '', readOnly: true}, {value: 'A', readOnly: true}, {value: '+', readOnly: true}],
                [{value: 1, readOnly: true},{value: 4}],
                [{value: 2, readOnly: true},{value: 6}],
                [{value: 3, readOnly: true},{value: 8}],
                [{value: 4, readOnly: true},{value: 10}],
                [{value: '', readOnly: false, component: (
                    <button onClick={() => this.insertRow() }>
                        +
                    </button>
                ), forceComponent: true}]
            ]
        }
    }

    insertRow() {
        let data = this.state.data;
        data.push([{value: '', readOnly: false}]);

        this.setState({
            data: data
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
