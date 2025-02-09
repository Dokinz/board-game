export const PLAYER_RED = "red";
export const PLAYER_BLUE = "blue";
export const PLAYER_FILL_PERCENTAGE = 0.2;
export const DEFAULT_BOARD_SIZE = 10;

export type Player = typeof PLAYER_RED | typeof PLAYER_BLUE;
export type Cell = Player | null;
export type Winner = Player | null;
export type Board = Cell[];

export function createBoard(boardSize: number): Board {
  const playerCellCount = Math.floor(boardSize * PLAYER_FILL_PERCENTAGE);
  return [
    ...Array(playerCellCount).fill(PLAYER_RED),
    ...Array(playerCellCount).fill(PLAYER_BLUE),
    ...Array(boardSize - 2 * playerCellCount).fill(null),
  ];
}

export function recolorCells(
  board: Board,
  fromIndex: number,
  direction: number,
  chainColor: Cell,
  currentPlayerColor: Player
): Board {
  let newBoard = [...board];
  let scanIndex = fromIndex + direction;

  while (newBoard[scanIndex] === chainColor) {
    scanIndex += direction;
  }

  if (newBoard[scanIndex] === currentPlayerColor) {
    let recolorIndex = scanIndex - direction;
    while (recolorIndex !== fromIndex) {
      newBoard[recolorIndex] = currentPlayerColor;
      recolorIndex -= direction;
    }
  }

  return newBoard;
}

export function getRecoloredBoard(board: Board, index: number, currentPlayer: Player): Board {
  let newBoard = [...board];
  const opponentPlayer = getOpponentPlayer(currentPlayer);

  newBoard = recolorCells(newBoard, index, -1, opponentPlayer, currentPlayer);
  newBoard = recolorCells(newBoard, index, -1, null, currentPlayer);
  newBoard = recolorCells(newBoard, index, 1, opponentPlayer, currentPlayer);
  newBoard = recolorCells(newBoard, index, 1, null, currentPlayer);

  return newBoard;
}

export function getWinner(board: Board): Cell {
  const hasRed = board.includes(PLAYER_RED);
  if (!hasRed) return PLAYER_BLUE;

  const hasBlue = board.includes(PLAYER_BLUE);
  if (!hasBlue) return PLAYER_RED;

  return null;
}

export function getOpponentPlayer(player: Player): Player {
  return player === PLAYER_RED ? PLAYER_BLUE : PLAYER_RED;
}

export function shuffleBoard(board: Board): Board {
  return [...board].sort(() => Math.random() - 0.5);
}

export function getRandomPlayer(): Player {
  return Math.random() < 0.5 ? PLAYER_RED : PLAYER_BLUE;
}
