import React from 'react';
// import './App.css';
import Header from './header/Header';
// import PropTypes from 'prop-types';
// import Footer from './footer/Footer';
import Maze from './maze/Maze';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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
                    maxItemValue: 'w',
                    isStartButtonEnabled: false,
                    isEndButtonEnabled: false,
                    isWallButtonEnabled: true,
                    isOpenButtonEnabled: true});
                break;
            case 'w':
                this.setState({maxItemValue: 'w'});
                break;
            case 'o':
                this.setState({maxItemValue: ''});
                break;
            default:
                break;
        }
    }

    render() {
        return (
        <div className="App">
            <Header/>
                <section>
                    <ul>
                        <li><div style={{marginBottom: '20px'}}>
                        I wanted to learn what's the fuzz about ReactJs so this is my test project. It's fairly straighforward framework
                with a few challenges I've encountered coming from Angular. It has its pros and cons. Am I liking it? every technology
                has it's usages. I chose <b>Depth First Search and simple heuristic (right, down, left, up) </b> to compliment the algo. 
                        </div>
                        </li>
                        <li>
                            <b>INSTRUCTIONS:</b>
                            <ul>
                                <li>A 6x6 grid can be populated by clicking</li>
                                <li>First click will mark an "s" which will denote the start of the puzzle</li>
                                <li>Second click will mark an "e" which will denote the end or goal of the puzzle</li>
                                <li>Wall button will mark a "w" which will denote a wall or an obstacle</li>
                                <li>Open button will mark a grid empty or free space</li>
                                <li>Solve button will initiate the puzzle solving process</li>
                                <li>Reset button will reset the process</li>
                            </ul>
                        </li>
                    </ul>
                
                </section>
            <br/>
            <div className="d-flex flex-row justify-content-center mb-12">
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group mr-2" role="group" aria-label="First group">
                        <button style={{marginRight: '10px'}} type="button" className="btn btn-primary-outline button-spacer" disabled={!this.state.isStartButtonEnabled}>Start</button>
                        <button style={{marginRight: '10px'}} type="button" className="btn btn-primary-outline button-spacer" disabled={!this.state.isEndButtonEnabled}>End</button>
                        <button style={{marginRight: '10px'}} type="button" className="btn btn-primary-outline button-spacer" onClick={() => this.mazeItemCallback('w')} disabled={!this.state.isWallButtonEnabled}>Wall</button>
                        <button style={{marginRight: '10px'}} type="button" className="btn btn-primary-outline button-spacer" onClick={() => this.mazeItemCallback('o')} disabled={!this.state.isOpenButtonEnabled}>Open</button>
                    </div>
                </div>
                
            </div>
            <br/>
            
            {/* <Footer/> */}
            <BrowserRouter basename='http://localhost:3000'>
                <Switch>
                    <Route path="/">
                        <Maze onMazeItemCallback={this.mazeItemCallback} mazeItemValue={this.state.maxItemValue}/>
                    </Route>
                    <Route path="/:axisHidden">
                        <Maze onMazeItemCallback={this.mazeItemCallback} mazeItemValue={this.state.maxItemValue}/>
                    </Route>
                </Switch>
            </BrowserRouter>
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