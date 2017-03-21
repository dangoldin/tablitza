import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import SpreadsheetComponent from 'react-spreadsheet-component';

class Main extends Component {
    constructor(props){
        super();
    }

    render(){
        const initialData = {
            rows: [
                ['Key', 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG'],
                ['COM', '0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6'],
                ['DIV', '1,0', '1,1', '1,2', '1,3', '1,4', '1,5', '1,6'],
                ['DEV', '2,0', '2,1', '2,2', '2,3', '2,4', '2,5', '2,6'],
                ['ACC', '3,0', '3,1', '3,2', '3,3', '3,4', '3,5', '3,6']
            ]
        };

        const config = {
            // Initial number of row
            rows: 5,
            // Initial number of columns
            columns: 8,
            // True if the first column in each row is a header (th)
            hasHeadColumn: true,
            // True if the data for the first column is just a string.
            // Set to false if you want to pass custom DOM elements.
            isHeadColumnString: true,
            // True if the first row is a header (th)
            hasHeadRow: true,
            // True if the data for the cells in the first row contains strings.
            // Set to false if you want to pass custom DOM elements.
            isHeadRowString: true,
            // True if the user can add rows (by navigating down from the last row)
            canAddRow: true,
            // True if the user can add columns (by navigating right from the last column)
            canAddColumn: true,
            // Override the display value for an empty cell
            emptyValueSymbol: '-',
            // Fills the first column with index numbers (1...n) and the first row with index letters (A...ZZZ)
            hasLetterNumberHeads: true
        };

        return (
            <div>
                <h1>Tablitza</h1>
                <SpreadsheetComponent initialData={initialData} config={config} spreadsheetId="1" />, document.getElementsByTagName('body'));
            </div>
        )
    }
}

var main = document.getElementById('main');
ReactDOM.render(<Main />, main);
