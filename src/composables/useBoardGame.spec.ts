import { describe, it, expect, beforeEach } from "vitest";
import { useBoardGame } from "../composables/useBoardGame";
import { PLAYER_RED, PLAYER_BLUE } from "../logic/boardLogic";

describe("useBoardGame", () => {
  let composable: ReturnType<typeof useBoardGame>;

  beforeEach(() => {
    composable = useBoardGame();
  });

  it("startGame initializes the board and chooses a random current player", () => {
    composable.boardSize.value = 5;
    composable.startGame();

    expect(composable.board.value.length).toBe(5);
    expect([PLAYER_RED, PLAYER_BLUE]).toContain(composable.currentPlayer.value);
    expect(composable.winner.value).toBeNull();
  });

  it("handleCellClick colors the cell with the current player's color and switches player", () => {
    composable.board.value = [null, null, null, PLAYER_RED, PLAYER_BLUE];
    composable.currentPlayer.value = PLAYER_RED;

    composable.handleCellClick(1);
    expect(composable.board.value[1]).toBe(PLAYER_RED);
    expect(composable.currentPlayer.value).toBe(PLAYER_BLUE);
  });

  it("handleCellClick updates the winner if only one color remains after the move", () => {
    composable.board.value = [PLAYER_RED, PLAYER_RED, null, null, PLAYER_BLUE];
    composable.currentPlayer.value = PLAYER_RED;

    composable.handleCellClick(4);
    expect(composable.winner.value).toBe(PLAYER_RED);
  });
});
