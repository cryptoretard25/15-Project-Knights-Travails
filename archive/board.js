const { log } = console;

class Knight {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.path = []
  }
}

class Board {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.matrix = Array(numVertices)
      .fill()
      .map((item) => (item = Array(numVertices)).fill(0));
  }

  addEdge(vertex1, vertex2){
    if(vertex1>this.numVertices||vertex2> this.numVertices) return 'Invalid vertex';
    this.matrix[vertex1][vertex2] = 1;
    this.matrix[vertex2][vertex1] = 1
  }
  
  getVertexNum(row, col){
    const size = 8;
    return row * size + col
  }

}

