import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom'
import NodeBuilder from './NodeBuilder';
import MazeSolver from './MazeSolver';
import queryString from 'query-string';
import './Maze.css';

class Maze extends React.Component {
    constructor(props) {
        super(props);
        this.array = [
            [0,1,2,3,4,5],
            [0,1,2,3,4,5],
            [0,1,2,3,4,5],
            [0,1,2,3,4,5],
            [0,1,2,3,4,5],
            [0,1,2,3,4,5]
        ];
        this.arrayBackGroundColor = [
            [0,1,2,3,4,5],
            [0,1,2,3,4,5],
            [0,1,2,3,4,5],
            [0,1,2,3,4,5],
            [0,1,2,3,4,5],
            [0,1,2,3,4,5]            
        ];
        this.state = {
            array: this.array,
            arrayBackGroundColor: this.arrayBackGroundColor,
            mazeItemValue: '',
            axisHidden: true
        };
        
        this.nodeBuilder = new NodeBuilder(this.array);
        this.mazeSolver = new MazeSolver(this.arrayBackGroundColor);
    }

    initialize() {
        for (let row = 0; row < this.array.length; row++) {
            for (let col = 0; col < this.array.length; col++) {
                this.array[row][col] = '';
                this.arrayBackGroundColor[row][col] = '';
            }
        }
    }


    onMazeItemCallback = (message) => {
        this.props.onMazeItemCallback(this.props.mazeItemValue);
    }

    componentDidMount() {
        this.initialize();
        this.setState({array: this.array});
        const values = queryString.parse(this.props.location.search);
        this.setState({axisHidden: values.debug === undefined});
    }
    
    /**
     * 
     * @param {*} row 
     * @param {*} col 
     */
    onButtonClick = (row, col) => {
        if (this.props.mazeItemValue === '') {
            this.nodeBuilder.startKey = `${row}-${col}`;
        }
        this.array[row][col] = (this.props.mazeItemValue === '') ? 's' : this.props.mazeItemValue;
        this.setState({array: this.array});
        this.props.onMazeItemCallback(this.array[row][col]);
    }

    /**
     * 
     */
    onSolveClick = () => {
        this.nodeBuilder.build();
        const startNode = this.nodeBuilder.getStartNode();
        this.mazeSolver.solve(startNode);
        const stack = this.mazeSolver.stack;
        const arrayBackGroundColor = this.mazeSolver.colorNodes(stack);
        this.setState({arrayBackGroundColor: arrayBackGroundColor});
    }
    
    /**
     * 
     */
    onReset = () => {
        window.location.reload(false);
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-row justify-content-center mb-12">
                    {this.state.array.map((rowItem, rowIndex) => {
                        let columns = rowItem.map((colItem, colIndex) => {
                            return <button key={uuidv4()}  
                                            style={{
                                                width: '100px', 
                                                height: '50px', 
                                                backgroundColor: this.state.arrayBackGroundColor[rowIndex][colIndex]
                                            }} 
                                            onClick={() => this.onButtonClick(rowIndex, colIndex)}>
                                    <span hidden={this.state.axisHidden} style={{fontSize: '8px'}}>${rowIndex}-${colIndex}</span>
                                    {this.state.array[rowIndex][colIndex]}</button>;
                        });
                        return <div key={uuidv4()} className="d-flex flex-column bd-highlight mb-3">{columns}</div>
                    })}
                </div>
                <div className="d-flex flex-row justify-content-center mb-12">
                    <button  type="button" className="btn btn-primary-outline" onClick={this.onSolveClick}>Solve</button>
                    <button style={{marginRight: '10px'}}  type="button" className="btn btn btn-primary-outline" onClick={this.onReset}>Reset</button>
                </div>
            </div>
        )
    }
}
export default withRouter(Maze);