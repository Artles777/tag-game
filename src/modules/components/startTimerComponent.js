import {$container, $message, $start, $timerToEnd, rollingBackTags} from "../pattern";
import {overGame} from "../../store/controllers";
import {mutationPreStart, mutationTagsValue} from "../mutationsCallbacks";
import {clicksCounter} from "../../store/state";
import {mutationOptions} from "../mutationsOptions";
import {countdownTimer} from "./countdownTimerComponent";

export function startTimer(arrayTags, gameOver) {
    countdownTimer((time) => {
        $timerToEnd.textContent = time
        if (time === gameOver) {
            overGame()
            mutationPreStart.disconnect()
            mutationTagsValue.disconnect()
            $message.style.display = 'block'
            alert(`Вы проиграли! Сделано ходов: ${clicksCounter.getState()}`)
            $start.removeAttribute('disabled')
            rollingBackTags(arrayTags)
            $timerToEnd.textContent = countdownTimer().getTime()
            mutationPreStart.observe($container, mutationOptions)
        }
    }).start()
}
