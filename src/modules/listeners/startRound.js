import {restartGame} from "../../store/state";
import {startGame} from "../../store/controllers";
import {$field, $message, $start} from "../pattern";
import {shuffleRandomizeIdTags} from "../helpers";
import {backgroundChange} from "../components/backgroundChangeComponent";
import {mutationTagsValue} from "../mutationsCallbacks";
import {mutationOptions} from "../mutationsOptions";
import {startTimer} from "../components/startTimerComponent";

export function startRound() {
    if (restartGame.getState()) {
        startGame()
        const gameOver = '00:00'
        const arrayTags = Array.from($field.children)

        shuffleRandomizeIdTags(arrayTags)
        backgroundChange(arrayTags)
        $start.setAttribute('disabled', 'disabled')

        $message.style.display = 'none'
        mutationTagsValue.observe(document, mutationOptions)

        startTimer(arrayTags, gameOver)
    }
}
