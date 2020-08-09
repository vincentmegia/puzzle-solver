import React from 'react';
// import './App.css';
import Header from './header/Header';
// import PropTypes from 'prop-types';
// import Footer from './footer/Footer';
import Maze from './maze/Maze';
import MazeNode from './maze/MazeNode';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStartButtonEnabled: true,
            isEndButtonEnabled: false,
            isWallButtonEnabled: false,
            isOpenButtonEnabled: false,
            maxItemValue: ''
        };
        this.start = false;
        this.end = false;
        this.counter = 0;
    }
    
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    mazeItemCallback = (message) => {
        switch(message) {
                case '':
                    this.start = true;
                    this.setState({maxItemValue: 's'});
                    break;
            case 's':
                this.start = true;
                this.setState({
                    isEndButtonEnabled: true,
                    isWallButtonEnabled: false,
                    isStartButtonEnabled: false,
                    isOpenButtonEnabled: false,
                    maxItemValue: 'e'});
                break;
            case 'e':
                this.end = true;
                this.setState({
                    isStartButtonEnabled: false,
                    isEndButtonEnabled: false,
                    isWallButtonEnabled: true,
                    isOpenButtonEnabled: true});
                break;
            case 'w':
                this.setState({maxItemValue: 'w'});
                break;
            case 'o':
                this.setState({maxItemValue: 'o'});
                break;
            default:
                break;
        }
    }

    render() {
        return (
        <div className="App">
            <Header/>
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" className="btn btn-secondary" disabled={!this.state.isStartButtonEnabled}>Start</button>
                    <button type="button" className="btn btn-secondary" disabled={!this.state.isEndButtonEnabled}>End</button>
                    <button type="button" className="btn btn-secondary" onClick={() => this.mazeItemCallback('w')} disabled={!this.state.isWallButtonEnabled}>Wall</button>
                    <button type="button" className="btn btn-secondary" onClick={() => this.mazeItemCallback('o')} disabled={!this.state.isOpenButtonEnabled}>Open</button>
                </div>
            </div>
            <Maze onMazeItemCallback={this.mazeItemCallback} mazeItemValue={this.state.maxItemValue}/>
            {/* <Footer/> */}
        </div>
        );
    }
}
    
// componentDidMount() {

// }

// componentWillUnmount() {

// }

// App.propTypes = {
//     appname: PropTypes.number.isRequired
// }

// App.defaultProps = {
//     appname: 123
// }
export default App;