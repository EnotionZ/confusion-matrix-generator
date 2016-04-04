var React = require('react');

let cellSize = 45;
let labelSize = 40;
let classSize = 120;

class MatrixView extends React.Component {

    renderSide(type) {
        let labelStyle = {width: this.props.classes.length*cellSize};

        if(type === 'actual') {
            labelStyle['top'] = this.props.classes.length*cellSize;
        }


        return <div className={'side side-' + type}>
            <label style={labelStyle}>{type}</label>
            {this.props.classes.map((cl, i)=> {
                return <div
                    className="th"
                    key={cl}
                    style={{
                        height: cellSize,
                        width: classSize,
                        left: (i+1)*cellSize
                    }}>{cl}</div>;
            })}
        </div>;
    }

    render() {
        let len = this.props.classes.length;
        let size = labelSize + classSize + (len+1)*cellSize;

        return <div className="matrix-view" style={{width: size, height: size}}>
            {this.renderSide('predicted')}
            {this.renderSide('actual')}
            <div className="table">
                {this.props.prediction.map((row, i) => {
                    return <div className="row" key={i}>
                        {row.map((count, i) => {
                            return <div
                                className="cell"
                                key={i}
                                style={{
                                    width: cellSize,
                                    height: cellSize,
                                    backgroundColor: `rgba(70, 70, 70, ${count/this.props.largest})`
                                }}
                            >{count || ' '}</div>;
                        })}
                    </div>;
                })}
            </div>
        </div>;
    }
}

export default MatrixView;

