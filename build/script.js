import { Word } from "./word.js";
import { Game } from "./game.js";
const wordsCollection = new Word(["JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"]);
const pickedWord = wordsCollection.getRandomWord();
console.log(pickedWord);
const game = new Game(pickedWord);
Array.from(document.getElementsByClassName("key")).forEach(element => element.addEventListener("click", (e) => {
    game.newKeyPressed(e.target.value);
}));
document.addEventListener("keydown", (e) => {
    game.newKeyPressed(e.code);
});
