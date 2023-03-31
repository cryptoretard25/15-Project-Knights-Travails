const { log } = console;

class Node {
  constructor(row, col, distance) {}
}

class KnightMoves {
  constructor(numVerticles) {
    this.numVerticles = numVerticles;
    this.matrix = Array(numVerticles)
      .fill()
      .map(() => Array(numVerticles).fill(0));
  }

  addEdge(vertex1, vertex2) {
    if (vertex1 > this.numVerticles || vertex2 > this.numVerticles)
      return "Invalid vertex";
    this.matrix[vertex1][vertex2] = 1;
    this.matrix[vertex2][vertex1] = 1;
  }

  getVertexNum(row, col) {
    const size = 8;
    return row * size + col;
  }

  getCoords(vertexNum) {
    const size = 8;
    const row = Math.floor(vertexNum / size);
    const col = vertexNum % size;
    return [row, col];
  }

  allPossibleEdges(row, col) {
    const fromVertex = this.getVertexNum(row, col);
    const moves = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    for (let move of moves) {
      const size = 8;
      const toRow = row + move[0];
      const toCol = col + move[1];
      if (toRow >= 0 && toRow < size && toCol >= 0 && toCol < size) {
        const toVertex = this.getVertexNum(toRow, toCol);
        this.addEdge(fromVertex, toVertex);
      }
    }
  }

  build() {
    const size = 8;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        this.allPossibleEdges(row, col);
      }
    }
  }

  levelOrder(startVertex) {
    const result = [];
    const queue = [startVertex];
    const visited = Array(this.matrix.length).fill(false);
    visited[startVertex] = true;
    while (queue.length) {
      const currentVertex = queue.shift();
      log(currentVertex);

      const adjacentVerticles = this.matrix[currentVertex];
      for (let i = 0; i < adjacentVerticles.length; i++) {
        if (adjacentVerticles[i] === 1 && !visited[i]) {
          visited[i] = true;
          queue.push(i);
        }
      }
    }
    return result;
  }

  _levelOrder(startVertex) {
    const queue = [{ vertex: startVertex, level: 0 }];
    const visited = Array(this.matrix.length).fill(false);
    visited[startVertex] = true;

    const levels = [[]];
    let currLevel = 0;

    while (queue.length) {
      const { vertex, level } = queue.shift();
      if (level > currLevel) {
        currLevel = level;
        levels.push([]);
      }
      levels[currLevel].push(vertex);

      const adjacentVertices = this.matrix[vertex];
      for (let i = 0; i < adjacentVertices.length; i++) {
        if (adjacentVertices[i] === 1 && !visited[i]) {
          visited[i] = true;
          queue.push({ vertex: i, level: level + 1 });
        }
      }
    }
    return levels;
  }

  bfs(start, end) {
    const startVertexNum = this.getVertexNum(start[0], start[1]);
    const endVertexNum = this.getVertexNum(end[0], end[1]);
    const queue = [{ vertex: startVertexNum, path: [startVertexNum] }];
    const visited = Array(this.matrix.length).fill(false);

    visited[startVertexNum] = true;

    while (queue.length) {
      const { vertex, path } = queue.shift();
      log('vertex', vertex)
      if (vertex === endVertexNum) {
        const result = path.map((item) => this.getCoords(item));
        // return `You made it in ${result.length-1} moves! Here's your path: ${result.map(item=> item.join(',')).join(' -> ')}`

        return `You made it in ${result.length - 1} moves! Here's your path: ${result.map((item)=>JSON.stringify(item)).join('->')}`;
        // return path;
      }
      const adjacentVertices = this.matrix[vertex];
      for (let i = 0; i < adjacentVertices.length; i++) {
        if (adjacentVertices[i] === 1 && !visited[i]) {
          visited[i] = true;
          const newPath = [...path, i];
          //log(`vertex ${i}:`, newPath);
          queue.push({ vertex: i, path: newPath });
          log(queue)
        }
      }
    }

    return null;
  }

  print() {
    //log(this.matrix);
    for (let row of this.matrix) {
      console.log(row.join(" "));
    }
  }
}

const board = new KnightMoves(64);
board.build();
log(board.bfs([0, 0], [2, 1]));
//log(board.bfs([3, 3], [4, 3]));

//module.exports = knightMoves;
