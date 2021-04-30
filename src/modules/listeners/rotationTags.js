import {clicksCounter, playGame} from "../../store/state";
import {$clicksTagsCounter, $container, $field, $message} from "../pattern";
import {finishedTagsGame, onAnimationTags, onEditCheck} from "../checks";
import {changeTag} from "../components/changeTagComponent";
import {incrementClicks} from "../../store/controllers";

export function rotationTags(event) {
    if (playGame.getState()) {
        const $target = event.target
        const size = $target.offsetWidth || $target.offsetHeight
        const $null = Array.from($field.children).find(tag => tag.key === Array.from($field.children).length - 1)

        if (onEditCheck($target, $null, size)) {
            onAnimationTags($target, $null, size)

            changeTag($target, $null)
            incrementClicks()
            clicksCounter.watch(click => $clicksTagsCounter.innerHTML = `${click}`)
            finishedTagsGame()
        }
    } else {
        $container.prepend($message)
    }
}
