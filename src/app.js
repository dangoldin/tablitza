"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Cell extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <td>
                <input type="text" value={this.props.value} />
            </td>
        )
    }
}

class Spreadsheet extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const Rows = this.props.spreadsheet.map(function(row) {
            const Row = row.map(function(cell) {
                return <Cell value={cell} />
            })
            return (
                <tr>
                    {Row}
                </tr>
            )
        })
        return (
            <table>
                <tbody>
                    {Rows}
                </tbody>
            </table>
        )
    }
}

class Main extends Component {
    constructor(props){
        super(props)

        this.state = {
            config: {
                'row': 5,
                'col': 5
            },
            data : [
                [1,2],
                [3,4],
                [5,6]
            ]
        }
    }

    render(){
        return (
            <div>
                <h1>Tablitza</h1>
                <Spreadsheet spreadsheet={this.state.data} />
            </div>
        )
    }
}

var main = document.getElementById('main');
ReactDOM.render(<Main />, main);
