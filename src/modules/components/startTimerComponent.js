import {countdownTimer} from "../helpers";
import {$container, $message, $start, $timerToEnd, rollingBackTags} from "../pattern";
import {overGame} from "../../store/controllers";
import {mutationPreStart, mutationTagsValue} from "../mutationsCallbacks";
import {clicksCounter} from "../../store/state";
import {preStartMutationOptions} from "../mutationsOptions";

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
            mutationPreStart.observe($container, preStartMutationOptions)
        }
    }).start()
}
