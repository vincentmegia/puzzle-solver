class MazeSolver {
    constructor(arrayBackGroundColor) {
        this.arrayBackGroundColor = arrayBackGroundColor;
        this.stack = [];
        this.isEnd = false;
    }

    /**
     * 
     * @param {*} node 
     */
    solve(node) {
        if (this.isEnd || node.isVisited) return;
        node.isVisited = true;
        this.stack.push(node.id);
        if (node.value === "e") {
            console.log("goal has been reached");
            this.isEnd = true;
            return;
        }
        if (node.value === "w") {
            this.stack.pop();
            return;
        }

        if (node.upNode !== null && !node.upNode.isVisited) {
            this.solve(node.upNode);
        }

        if (node.rightNode !== null && !node.rightNode.isVisited) {
            this.solve(node.rightNode);
        }

        if (node.downNode !== null  && !node.downNode.isVisited) {
            this.solve(node.downNode);
        }

        if (node.leftNode !== null  && !node.leftNode.isVisited) {
            this.solve(node.leftNode);
        }
    }

    colorNodes() {
        for (let item of this.stack) {
            let tokens = item.split("-");
            this.arrayBackGroundColor[tokens[0]][tokens[1]] = 'green';
        }
        return this.arrayBackGroundColor;
    }
}
export default MazeSolver;