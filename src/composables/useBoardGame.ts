import { ref } from "vue";
import {
  type Player,
  type Winner,
  type Board,
  PLAYER_RED,
  DEFAULT_BOARD_SIZE,
  getRecoloredBoard,
  getWinner,
  createBoard,
  getOpponentPlayer,
  shuffleBoard,
  getRandomPlayer,
} from "../logic/boardLogic";

export function useBoardGame() {
  const board = ref<Board>([]);
  const boardSize = ref<number>(DEFAULT_BOARD_SIZE);
  const currentPlayer = ref<Player>(PLAYER_RED);
  const winner = ref<Winner>(null);

  function startGame() {
    currentPlayer.value = getRandomPlayer();
    board.value = shuffleBoard(createBoard(boardSize.value));
    winner.value = null;
  }

  function handleCellClick(index: number) {
    if (winner.value || board.value[index] === currentPlayer.value) return;

    board.value[index] = currentPlayer.value;
    board.value = getRecoloredBoard(board.value, index, currentPlayer.value);
    winner.value = getWinner(board.value);

    if (!winner.value) {
      currentPlayer.value = getOpponentPlayer(currentPlayer.value);
    }
  }

  return {
    board,
    boardSize,
    currentPlayer,
    winner,
    startGame,
    handleCellClick,
  };
}
