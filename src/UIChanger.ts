export class UIChanger {
    setNewLetter(turn: number,position: number, letter: string) {
        Array.from(document.getElementById(`row_${turn}`)!.children)[position].textContent = letter;
    }
    deleteLetter(turn: number, position: number) {
        Array.from(document.getElementById(`row_${turn}`)!.children)[position].textContent = "";
    }

    changeBackgroundPosition(turn: number, position: number, state: string){
        let positionClass = "";
        switch (state) {
            case "rightLetter":
            positionClass = "cell-green";
            break;
            case "misplacedLetter":
            positionClass = "cell-orange";
            break;
            default:
            positionClass = "cell-grey";
        }
        Array.from(document.getElementById(`row_${turn}`)!.children)[position].classList.add(positionClass);
        }
        changeBackgroundKey(code: string){
            const keys: any = document.getElementsByClassName("key");
            for (let key of keys) {
                 if (key.value == code && code !== "Enter" && code !=="Backspace"){
                     key.classList.add("keyPressed");
                 }
            }
         }
}