var React = require('react');

class MatrixView extends React.Component {

    renderSide(type) {
        return <div className={'side-' + type}>
            <label>{type}</label>
            {this.props.classes.map((cl)=> {
                return <div className="th" key={cl}>{cl}</div>;
            })}
        </div>;
    }

    render() {
        return <div>
            {this.renderSide('predicted')}
            {this.renderSide('actual')}
            <div className="table">
                {this.props.prediction.map((row, i) => {
                    return <div className="row" key={i}>
                        {row.map((count, i) => {
                            return <div className="cell" key={i}>{count}</div>;
                        })}
                    </div>;
                })}
            </div>
        </div>;
    }
}

export default MatrixView;

