import { describe, it, expect } from "vitest";
import {
  createBoard,
  getRecoloredBoard,
  getWinner,
  PLAYER_RED,
  PLAYER_BLUE,
  PLAYER_FILL_PERCENTAGE,
  type Board,
} from "../logic/boardLogic";

describe("boardLogic", () => {
  describe("createBoard", () => {
    it("creates a board of the specified size", () => {
      const board = createBoard(10);
      expect(board).toHaveLength(10);
    });

    it("fills red and blue cells", () => {
      const size = 10;
      const board = createBoard(size);

      const expectedPlayerCount = Math.floor(size * PLAYER_FILL_PERCENTAGE);
      const playerRedCount = board.filter((cell) => cell === PLAYER_RED).length;
      const playerBlueCount = board.filter((cell) => cell === PLAYER_BLUE).length;

      expect(playerRedCount).toBe(expectedPlayerCount);
      expect(playerBlueCount).toBe(expectedPlayerCount);
    });
  });

  describe("getRecoloredBoard", () => {
    it("recolors empty cells between two same-colored cells", () => {
      const board: Board = [PLAYER_RED, null, null, null, PLAYER_RED, PLAYER_BLUE];
      const clickedIndex = 2;
      board[clickedIndex] = PLAYER_RED;
      const newBoard = getRecoloredBoard(board, clickedIndex, PLAYER_RED);
      expect(newBoard).toEqual([PLAYER_RED, PLAYER_RED, PLAYER_RED, PLAYER_RED, PLAYER_RED, PLAYER_BLUE]);
    });

    it("recolors a chain of opponent cells if they are 'sandwiched' by player's cells", () => {
      const board: Board = [PLAYER_RED, PLAYER_BLUE, PLAYER_BLUE, PLAYER_BLUE, PLAYER_RED, PLAYER_BLUE];
      const clickedIndex = 2;
      board[clickedIndex] = PLAYER_RED;
      const newBoard = getRecoloredBoard(board, clickedIndex, PLAYER_RED);
      expect(newBoard).toEqual([PLAYER_RED, PLAYER_RED, PLAYER_RED, PLAYER_RED, PLAYER_RED, PLAYER_BLUE]);
    });

    it("does not recolor cells if they are not between two same-colored cells", () => {
      const board: Board = [PLAYER_RED, null, null, null, PLAYER_RED, PLAYER_BLUE];
      const clickedIndex = 2;
      board[clickedIndex] = PLAYER_BLUE;
      const newBoard = getRecoloredBoard(board, clickedIndex, PLAYER_BLUE);
      expect(newBoard).toEqual([PLAYER_RED, null, PLAYER_BLUE, null, PLAYER_RED, PLAYER_BLUE]);
    });
  });

  describe("getWinner", () => {
    it("returns PLAYER_RED if there are no blue cells on the board", () => {
      const board: Board = [PLAYER_RED, PLAYER_RED, PLAYER_RED, null, null];
      expect(getWinner(board)).toBe(PLAYER_RED);
    });

    it("returns PLAYER_BLUE if there are no red cells on the board", () => {
      const board: Board = [PLAYER_BLUE, PLAYER_BLUE, PLAYER_BLUE, PLAYER_BLUE, PLAYER_BLUE];
      expect(getWinner(board)).toBe(PLAYER_BLUE);
    });

    it("returns null if both colors are still present", () => {
      const board: Board = [PLAYER_RED, PLAYER_BLUE, null, null, null];
      expect(getWinner(board)).toBeNull();
    });
  });
});
