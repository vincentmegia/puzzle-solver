import React from 'react';
import MazeNode from './MazeNode';
import { v4 as uuidv4 } from 'uuid';

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
        this.state = {
            array: this.array,
            mazeItemValue: ''
        };
        this.store = {};
        this.parentNode = null;
        this.stack = [];
    }

    initialize() {
        for (let row = 0; row < this.array.length; row++) {
            for (let col = 0; col < this.array.length; col++) {
                this.array[row][col] = '';
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

    /**
     * create nodes out of
     */
    createNodes() {
        const length = this.array.length;
        this.parentNode = new MazeNode("0-0", this.array[0][0]);
        this.store["0-0"] = this.parentNode;
        let node = this.parentNode;
        for (let i = 0; i <= length - 1; i++) {
            for (let j = 0; j <= length - 1; j++) {
                const upKey = `${i + 1}-${j}`;
                const downKey = `${i - 1}-${j}`;
                const rightKey = `${i}-${j + 1}`;
                const leftKey = `${i}-${j - 1}`;
                node = this.getNode(`${i}-${j}`, i, j);

                if (i > 0) {// set down node
                    const downNode = this.getNode(downKey, i - 1, j)
                    node.setDownNode(downNode);
                    this.store[downNode] = downNode;
                }
                if (j > 0) { //set left node
                    const leftNode = this.getNode(leftKey, i, j - 1);
                    node.setLeftNode(leftNode);
                    this.store[leftKey] = leftNode;
                }
                if (j + 1 < length) {//set right node
                    const rightNode = this.getNode(rightKey, i, j + 1);
                    node.setRightNode(rightNode);
                    this.store[rightKey] = rightNode;
                }
                if (i + 1 < length) {//set up node
                    const upNode = this.getNode(upKey, i + 1, j)
                    node.setUpNode(upNode);
                    this.store[upKey] = upNode;
                }
            }
        }
    }

    solve(node) {
        //keep going up if not wall and upNode is not null\
        node.isVisited = true;
        this.stack.push(node.id);
        if (node.value === "e") {
            console.log("goal has been reached");
            return;
        }
        if (node.value === "x") {
            this.stack.pop();
            return;
        }

        if (node.upNode === null) return;
        if (node.upNode !== null && !node.upNode.isVisited) {
            this.solve(node.upNode);
        }
        if (node.rightNode === null) return;
        if (node.rightNode !== null && !node.rightNode.isVisited) {
            this.solve(node.rightNode);
        }
        if (node.downNode === null) return;
        if (node.downNode !== null  && !node.downNode.isVisited) {
            this.solve(node.downNode);
        }
        if (node.leftNode === null) return;
        if (node.leftNode !== null  && !node.leftNode.isVisited) {
            this.solve(node.leftNode);
        }
        debugger;
    }

    getNode(key, i, j) {
        let node = this.store[key];
        if (node == null) {
            node = new MazeNode(key, this.array[i][j]);
        }
        return node;
    }

    onMazeItemCallback = (message) => {
        this.props.onMazeItemCallback(this.props.mazeItemValue);
    }

    componentDidMount() {
        this.initialize();
        this.createNodes();
        this.setState({array: this.array});
    }
    
    buttonClick = (row, col) => {
        this.array[row][col] = (this.props.mazeItemValue === '') ? 's' : this.props.mazeItemValue;
        this.setState({array: this.array});
        this.props.onMazeItemCallback(this.array[row][col]);
    }

    render() {
        
        return (
            <div className="d-flex justify-content-center mb-12">
                {this.state.array.map((rowItem, rowIndex) => {
                    let columns = rowItem.map((colItem, colIndex) => {
                        return <button key={uuidv4()}  
                            style={{width: '50px', height: '50px'}} 
                            onClick={() => this.buttonClick(rowIndex, colIndex)}>{this.state.array[rowIndex][colIndex]}</button>;
                    });
                    return <div key={uuidv4()} className="d-flex flex-column bd-highlight mb-3">{columns}</div>
                })}
            </div>
        )
    }
}
export default Maze;