class Graph {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.matrix = Array(numVertices)
      .fill()
      .map(() => Array(numVertices).fill(0));
  }

  addEdge(vertex1, vertex2) {
    if (vertex1 >= this.numVertices || vertex2 >= this.numVertices) {
      throw new Error("Invalid vertex");
    }
    this.matrix[vertex1][vertex2] = 1;
    this.matrix[vertex2][vertex1] = 1;
  }

  getVertexNumber(row, col) {
    return row * 8 + col;
  }

 

  addPossibleEdges(row, col) {
    const vertexNum = this.getVertexNumber(row, col);
    const possibleMoves = [
      [row - 2, col - 1],
      [row - 2, col + 1],
      [row - 1, col - 2],
      [row - 1, col + 2],
      [row + 1, col - 2],
      [row + 1, col + 2],
      [row + 2, col - 1],
      [row + 2, col + 1],
    ];
    for (let i = 0; i < possibleMoves.length; i++) {
      const [r, c] = possibleMoves[i];
      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const destVertexNum = this.getVertexNumber(r, c);
        this.addEdge(vertexNum, destVertexNum);
      }
    }
  }

  build() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const vertexNum = this.getVertexNumber(row, col);
        this.addPossibleEdges(row, col);
      }
    }
  }

  print() {
    console.log(this.matrix);
  }
}

const graph = new Graph(64);
graph.build();
graph.print();
