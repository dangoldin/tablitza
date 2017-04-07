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
                [{value: 1},{value: 2}],
                [{value: 3},{value: 4}],
                [{value: 5},{value: 6}]
            ]
        }
    }

    render(){
        return (
            <div>
                <h1>Tablitza</h1>
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
        )
    }
}

var main = document.getElementById('main');
ReactDOM.render(<Main />, main);
