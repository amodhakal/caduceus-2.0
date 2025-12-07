import { Player } from "./Player";

const player = new Player("ws://localhost:3000");
await player.getAvailablePatients();
