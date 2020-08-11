import MazeNode from './MazeNode';

class NodeBuilder {
    constructor(array) {
        this.array = array;
        this.parentNode = null;
        this.store = {};
    }

    /**
     * create nodes out of
     */
    build() {
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
        return this.parentNode;
    }

    /**
     * 
     * @param {*} key 
     * @param {*} i 
     * @param {*} j 
     */
    getNode(key, i, j) {
        let node = this.store[key];
        if (node === null || node === undefined) {
            node = new MazeNode(key, this.array[i][j]);
        }
        return node;
    }
}

export default NodeBuilder;