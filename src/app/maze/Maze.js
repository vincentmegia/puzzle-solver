import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom'
import NodeBuilder from './NodeBuilder';
import MazeSolver from './MazeSolver';

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
            mazeItemValue: ''
        };
        
        this.nodeBuilder = new NodeBuilder(this.array);
        this.mazeSolver = new MazeSolver(this.arrayBackGroundColor);
    }

    initialize() {
        debugger;
        for (let row = 0; row < this.array.length; row++) {
            for (let col = 0; col < this.array.length; col++) {
                this.array[row][col] = '';
                this.arrayBackGroundColor[row][col] = '';
            }
        }
        return;
        // this.array[0][0] = "s";
        // this.array[0][1] = "";
        // this.array[0][2] = "x";
        // this.array[0][3] = "x";
        // this.array[0][4] = "x";
        // this.array[0][5] = "";

        // this.array[1][0] = "x";
        // this.array[1][1] = "";
        // this.array[1][2] = "x";
        // this.array[1][3] = "";
        // this.array[1][4] = "";
        // this.array[1][5] = "";

        // this.array[2][0] = "x";
        // this.array[2][1] = "";
        // this.array[2][2] = "x";
        // this.array[2][3] = "";
        // this.array[2][4] = "x";
        // this.array[2][5] = "";

        // this.array[3][0] = "x";
        // this.array[3][1] = "";
        // this.array[3][2] = "x";
        // this.array[3][3] = "";
        // this.array[3][4] = "x";
        // this.array[3][5] = "";

        // this.array[4][0] = "x";
        // this.array[4][1] = "";
        // this.array[4][2] = "";
        // this.array[4][3] = "";
        // this.array[4][4] = "x";
        // this.array[4][5] = "";

        // this.array[5][0] = "x";
        // this.array[5][1] = "x";
        // this.array[5][2] = "x";
        // this.array[5][3] = "x";
        // this.array[5][4] = "x";
        // this.array[5][5] = "e";
    }


    onMazeItemCallback = (message) => {
        this.props.onMazeItemCallback(this.props.mazeItemValue);
    }

    componentDidMount() {
        this.initialize();
        this.setState({array: this.array});
    }
    
    /**
     * 
     * @param {*} row 
     * @param {*} col 
     */
    onButtonClick = (row, col) => {
        this.array[row][col] = (this.props.mazeItemValue === '') ? 's' : this.props.mazeItemValue;
        this.setState({array: this.array});
        this.props.onMazeItemCallback(this.array[row][col]);
    }

    /**
     * 
     */
    onSolveClick = () => {
        const node = this.nodeBuilder.build();
        this.mazeSolver.solve(node);
        const stack = this.mazeSolver.stack;
        const arrayBackGroundColor = this.mazeSolver.colorNodes(stack);
        debugger;
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
                                    {/* <span style={{fontSize: '8px'}}>${rowIndex}-${colIndex}</span> */}
                                    {this.state.array[rowIndex][colIndex]}</button>;
                        });
                        return <div key={uuidv4()} className="d-flex flex-column bd-highlight mb-3">{columns}</div>
                    })}
                </div>
                <div className="d-flex flex-row justify-content-center mb-12">
                    <button style={{marginRight: '10px'}}  type="button" className="btn btn-primary" onClick={this.onSolveClick}>Solve</button>
                    <button style={{marginRight: '10px'}}  type="button" className="btn btn-primary" onClick={this.onReset}>Reset</button>
                </div>
            </div>
        )
    }
}
export default withRouter(Maze);