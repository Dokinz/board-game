<template>
  <form @submit.prevent="startGame">
    <label for="boardSize">Board size:</label>
    <input type="number" id="boardSize" v-model="boardSize" min="5" max="20" required />
    <button type="submit">Start Game</button>
  </form>

  <h2 v-if="!winner && board.length">
    Current player: <span>{{ currentPlayer }}</span>
  </h2>
  <h2 v-else-if="winner">{{ winner }} wins!</h2>

  <div v-if="board.length">
    <button
      class="cell"
      v-for="(player, index) in board"
      :key="index"
      :class="{
        red: player === PLAYER_RED,
        blue: player === PLAYER_BLUE,
      }"
      @click="handleCellClick(index)"
    ></button>
  </div>
</template>

<script lang="ts" setup>
import { useBoardGame } from "../composables/useBoardGame";
import { PLAYER_BLUE, PLAYER_RED } from "../logic/boardLogic";

const { board, boardSize, currentPlayer, winner, startGame, handleCellClick } = useBoardGame();
</script>

<style>
.cell {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 0 2px;
}
.red {
  background-color: red;
}
.blue {
  background-color: blue;
}
@media (max-width: 767px) {
  .cell {
    display: block;
    width: 20px;
    height: 20px;
    margin: 4px auto;
  }
}
</style>
