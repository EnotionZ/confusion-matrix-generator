var React = require('react');
var ReactDOM = require('react-dom');

import MatrixView from './MatrixView';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            classes: ['negative', 'positive', 'one', 'two', 'three'],
            prediction: [
                [2, 1, 0, 0, 0],
                [2, 1, 0, 0, 0],
                [2, 1, 0, 0, 0],
                [2, 1, 0, 0, 0],
                [4, 2, 0, 0, 0]
            ]
        };
    }

    render() {
        return <div>
            <MatrixView
                classes={this.state.classes}
                prediction={this.state.prediction}
            />
        </div>;
    }
}

ReactDOM.render(<App/>, document.getElementById('main'));
