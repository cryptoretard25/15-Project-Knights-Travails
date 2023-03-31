const { log } = console;

function getMoves(coords) {
  const [row, col] = coords;
  return [
    [row - 2, col - 1],
    [row - 2, col + 1],
    [row - 1, col - 2],
    [row - 1, col + 2],
    [row + 1, col - 2],
    [row + 1, col + 2],
    [row + 2, col - 1],
    [row + 2, col + 1],
  ].filter((move) => {
    const row = move[0];
    const col = move[1];
    return row >= 0 && row <= 7 && col >= 0 && col <= 7;
  });
}

function knightMoves(start, end) {
  const count = { [JSON.stringify(start)]: 0 };
  const queue = [{ current: start, path: [start] }];

  while (queue.length) {
    const { current, path } = queue.shift();
    const currToString = JSON.stringify(current);
    const endToString = JSON.stringify(end);
    if (currToString === endToString) {
      return `You made it in ${
        count[endToString]
      } moves!  Here's your path:\n${path
        .map((item) => JSON.stringify(item))
        .join("\n")}`;
    }
    const moves = getMoves(current);
    for (let move of moves) {
      queue.push({ current: move, path: [...path, move] });
      count[JSON.stringify(move)] = count[currToString] + 1;
    }
  }
  return null;
}

log(knightMoves([0, 0], [1, 2]));
log(knightMoves([3, 3], [4, 3]));
log(knightMoves([0, 0], [3, 3]));
log(knightMoves([3, 3], [0, 0]));
