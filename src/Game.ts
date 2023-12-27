import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import {UIChanger} from "./UIChanger.js";


export class Game {
    #pickedWord: string
    #actualWord: string = "";
    #turn: number = 1;
    #actualPosition: number = 0;
    #validLetterCodes: string[]
    #userInterface: UIChanger
    constructor(pickedWord: string){
        this.#pickedWord = pickedWord;
        this.#actualWord = "";
        this.#turn = 1;
        this.#actualPosition = 0;
        this.#validLetterCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
        this.#userInterface = new UIChanger();
    }

    get pickedWord(){
        return this.#pickedWord;
    }
    set pickedWord(word){
        this.#pickedWord = word;
    }
    get actualWord(){
        return this.#actualWord;
    }
    set actualWord(word){
        this.#actualWord = word;
    }

    get turn(){
        return this.#turn;
    }
    set turn(num){
        this.#turn = num;
    }

    get actualPosition(){
        return this.#actualPosition;
    }
    set actualPosition(num){
        this.#actualPosition = num;
    }

    get validLetterCodes() {
        return this.#validLetterCodes
    }
    set validLetterCodes(letters) {
        this.#validLetterCodes = letters;
    }

    get interface() {
        return this.#userInterface;
    }
    set interface(i) {
        this.#userInterface = i;
    }

    
    isValidLetter(code: string):boolean {

        return  this.#validLetterCodes.includes(code) && this.#actualPosition < MAX_WORD_SIZE;
     }

    isEnterKey(code: string):boolean {
        return code=="Enter";
    }

    isBackspaceKey(code: string):boolean{
        return code=="Backspace";
    }

    transformCodeToLetter(code: string):string{
        let letter: string = "";
        if (code=="Semicolon") letter = "Ñ";
        else letter = code.split("y")[1];
        return letter;
    }

   /* newLetter(code: string):void{
        let letter: string = this.transformCodeToLetter(code);
        this.#userInterface.setNewLetter(this.turn, this.actualPosition, letter);
        this.#actualPosition = this.#actualPosition + 1;
        this.#actualWord += letter;
    }*/
    newLetter(code: string): void {
        if (this.#actualPosition < MAX_WORD_SIZE) {
            let letter: string = this.transformCodeToLetter(code);
            this.#userInterface.setNewLetter(this.#turn, this.#actualPosition, letter);
            this.#actualPosition += 1;
            this.#actualWord += letter;
        }
    }
/*
    checkRightLetters = ():void=>{
        for(let i=0; i<MAX_WORD_SIZE; i++){
            if (this.#pickedWord[i]==this.#actualWord[i]){
                this.#userInterface.changeBackgroundPosition(this.#turn, i, "rightLetter");
            }
        }
    }

*/
    checkRightLetters(): void {
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            if (this.#pickedWord[i] === this.#actualWord[i]) {
                this.#userInterface.changeBackgroundPosition(this.#turn, i, "rightLetter");
            }
        }
    }

    checkWrongLetters(): void {
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            let actualLetter = this.#actualWord[i];
            let pattern = new RegExp(actualLetter, "g");
            let numberOfCoincidencesPickedWord = (this.#pickedWord.match(pattern) || []).length;
            if (numberOfCoincidencesPickedWord === 0) {
                this.#userInterface.changeBackgroundPosition(this.#turn, i, "wrongLetter");
            }
        }
    }
/*
    checkWrongLetters = ():void=>{
        let actualLetter = "";
        let pattern:RegExp;
        let numberOfCoincidencesPickedWord = 0;
        for (let i=0; i<MAX_WORD_SIZE; i++){
            actualLetter = this.#actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidencesPickedWord = (this.#pickedWord.match(pattern)||[]).length;
            if (numberOfCoincidencesPickedWord==0) this.#userInterface.changeBackgroundPosition(this.#turn, i, "wrongLetter");
        }
    }
 
    checkMisplacedLetters = (): void => {
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            const actualLetter = this.#actualWord[i];
            const pattern = new RegExp(actualLetter, "g");
            const numberOfCoincidencesPickedWord = (this.#pickedWord.match(pattern) || []).length;
            if (numberOfCoincidencesPickedWord > 0) {
                if (this.#pickedWord[i] === actualLetter) {
                } else {
                    this.#userInterface.changeBackgroundPosition(this.#turn, i, "misplacedLetter");
                }
            }
        }
    };   */

    checkMisplacedLetters(): void {
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            const actualLetter = this.#actualWord[i];
            const pattern = new RegExp(actualLetter, "g");
            const numberOfCoincidencesPickedWord = (this.#pickedWord.match(pattern) || []).length;
            if (numberOfCoincidencesPickedWord > 0 && this.#pickedWord[i] !== actualLetter) {
                this.#userInterface.changeBackgroundPosition(this.#turn, i, "misplacedLetter");
            }
        }
    }

    updateAfterANewWord = ():void=>{
        this.checkRightLetters();
        this.checkMisplacedLetters();
        this.checkWrongLetters();
        this.#turn += 1;
        this.#actualPosition = 0;
        this.#actualWord = "";
    }

    checkGameIsOver():void{
        if (this.#actualWord === this.#pickedWord) {
                location.assign("/winner");
        }
        if (this.turn === MAX_ATTEMPTS && this.#actualWord != this.#pickedWord) {
                location.assign("/loser");  
        }
    }
    
    
    enterPressed():void{
        if (this.#actualWord.length == MAX_WORD_SIZE){
            this.checkGameIsOver();
            this.updateAfterANewWord();
        }
    }


    backspacePressed():void{
        if (this.#actualPosition > 0) {
            this.#actualPosition -= 1;
            this.#userInterface.deleteLetter(this.#turn, this.#actualPosition);
        }
    }

    newKeyPressed(code: string):void{
        if (this.isEnterKey(code)) this.enterPressed();
        if (this.isBackspaceKey(code)) this.backspacePressed();
        if(this.#actualPosition<MAX_WORD_SIZE){
            if (this.isValidLetter(code)) this.newLetter(code);
            this.#userInterface.changeBackgroundKey(code);
        }
    }
    
}