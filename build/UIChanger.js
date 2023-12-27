export class UIChanger {
    setNewLetter(turn, position, letter) {
        Array.from(document.getElementById(`row_${turn}`).children)[position].textContent = letter;
    }
    deleteLetter(turn, position) {
        Array.from(document.getElementById(`row_${turn}`).children)[position].textContent = "";
    }
    changeBackgroundPosition(turn, position, state) {
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
        Array.from(document.getElementById(`row_${turn}`).children)[position].classList.add(positionClass);
    }
    changeBackgroundKey(code) {
        const keys = document.getElementsByClassName("key");
        for (let key of keys) {
            if (key.value == code && code !== "Enter" && code !== "Backspace") {
                key.classList.add("keyPressed");
            }
        }
    }
}
