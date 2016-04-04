var React = require('react');
var ReactDOM = require('react-dom');

import MatrixView from './MatrixView';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            classes: ['negative', 'positive', 'one', 'two', 'three'],
            prediction: [
                [7, 1, 0, 1, 0],
                [2, 2, 0, 0, 0],
                [0, 1, 4, 0, 0],
                [2, 1, 0, 6, 0],
                [0, 1, 0, 1, 4]
            ]
        };
    }

    correct() {
        return this.state.prediction.reduce((a,b, i) => {
            return a + b[i];
        }, 0);
    }

    total() {
        return this.state.prediction.reduce((a,b) => {
            return a + b.reduce((c,d)=> { return c+d; }, 0);
        }, 0);
    }

    largest() {
        return Math.max.apply(
            Math, this.state.prediction.map((arr) => {
                return Math.max.apply(Math, arr);
            })
        );
    }

    render() {
        let total = this.total();
        let correct = this.correct();

        return <div>
            <MatrixView
                largest={this.largest()}
                classes={this.state.classes}
                prediction={this.state.prediction}
            />

            <div className="result">
                <div>
                    <label>Accuracy:</label>
                    <span>{(correct/total*100).toFixed(2)}%     {correct}/{total}</span>
                </div>
            </div>
        </div>;
    }
}

ReactDOM.render(<App/>, document.getElementById('main'));
