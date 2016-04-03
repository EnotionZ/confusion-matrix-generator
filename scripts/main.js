var React = require('react');
var ReactDOM = require('react-dom');

class Component extends React.Component {
    render() {
        return <div>component</div>;
    }
}

class App extends React.Component {
    render() {
        return <div><Component/></div>;
    }
}

ReactDOM.render(<App/>, document.getElementById('main'));
