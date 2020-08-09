class MazeNode {
    constructor(id, value) {
        this.id = id;
        this.value = value;
        this.upNode = null;
        this.rightNode = null;
        this.downNode = null;
        this.leftNode = null;
        this.isVisited = false;
    }

    setUpNode(node) {
        this.upNode = node;
        if (node.downNode == null)
            node.setDownNode(this);
    }

    setDownNode(node) {
        this.downNode = node;
        if (node.upNode == null){
            node.setUpNode(this);
        }
    }   

    setRightNode(node) {
        this.rightNode = node;
        if (node.leftNode == null) {
            node.setLeftNode(this);
        }
    }

    setLeftNode(node) {
        this.leftNode = node;
        if (node.rightNode == null) {
            node.setRightNode(this);
        }
    }

    setId(id) {
        this.id = id;
    }
}
export default MazeNode;