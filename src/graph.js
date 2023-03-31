const { log } = console;

class Board {
  constructor(size) {
    this.board = new Map();
    this.size = size;
  }

  addVertices() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.board.set(JSON.stringify([i, j], []));
      }
    }
  }

  addEdges() {
    for (let [pos] of this.board) {
      const [row, col] = JSON.parse(pos);
      //   log(row, col);
      const moves = [
        [row + 1, col + 2],
        [row + 2, col + 1],
        [row + 2, col - 1],
        [row + 1, col - 2],
        [row - 1, col - 2],
        [row - 2, col - 1],
        [row - 2, col + 1],
        [row - 1, col + 2],
      ].filter((move) => {
        return move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8;
      });
      this.board.set(pos, moves);
    }
  }
}

class Knight {
  constructor(size) {
    this.board = new Board(size);
    this.board.addVertices();
    this.board.addEdges();
  }

  knightMoves(start, end) {
    const count = { [JSON.stringify(start)]: 0 };
    const queue = [{ current: start, path: [start] }];
    const visited = new Set();

    while (queue.length) {
      const { current, path } = queue.shift();
      const currStr = JSON.stringify(current);
      const endStr = JSON.stringify(end);
      if (currStr === endStr) return `You made it in ${count[endStr]} moves! Here's your path:\n${path.map(item=>JSON.stringify(item)).join('\n')}`
      const moves = this.board.board.get(currStr);
      for (let move of moves) {
        if (!visited.has(move)) {
          queue.push({ current: move, path: [...path, move] });
          count[JSON.stringify(move)] = count[currStr] + 1;
          visited.add(move);
        }
      }
    }
    return null;
  }
}

// first impelementation
class Graph {
  constructor(size) {
    this.board = new Map();
    this.size = size;
  }

  addVertices() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.board.set(JSON.stringify([i, j], []));
      }
    }
  }

  addEdges() {
    for (let [pos] of this.board) {
      const [row, col] = JSON.parse(pos);
      //   log(row, col);
      const moves = [
        [row + 1, col + 2],
        [row + 2, col + 1],
        [row + 2, col - 1],
        [row + 1, col - 2],
        [row - 1, col - 2],
        [row - 2, col - 1],
        [row - 2, col + 1],
        [row - 1, col + 2],
      ].filter((move) => {
        return move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8;
      });
      this.board.set(pos, moves);
    }
  }

  knightMoves(start, end) {
    const count = { [JSON.stringify(start)]: 0 };
    const queue = [{ current: start, path: [start] }];
    const visited = new Set();

    while (queue.length) {
      const { current, path } = queue.shift();
      const currStr = JSON.stringify(current);
      const endStr = JSON.stringify(end);
      if (currStr === endStr) return path;
      const moves = this.board.get(currStr);
      for (let move of moves) {
        if (!visited.has(move)) {
          queue.push({ current: move, path: [...path, move] });
          count[JSON.stringify(move)] = count[currStr] + 1;
          visited.add(move)
        }else{continue}
      }
    }

    return null;
  }
}

const knight = new Knight(8)
log(knight.knightMoves([0, 0], [1, 2]));
log(knight.knightMoves([3, 3], [4, 3]));
log(knight.knightMoves([0, 0], [3, 3]));
log(knight.knightMoves([3, 3], [0, 0]));