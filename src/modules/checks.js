import {countdownTimer, createAnimation} from "./helpers";
import {$field, $message, $start, $timerToEnd} from "./pattern";
import {incrementFinish, overGame, resetClicks, resetFinish} from "../store/controllers";
import {amountTags, clicksCounter, finishGame} from "../store/state";
import {mutationTagsValue} from "./mutationsCallbacks";

export function onEditCheck($target, $null, size) {
    if ($target.dataset.id === 'field') return;
    if ($target === $null) return false;
    if ($null.offsetTop - $target.offsetTop > size) return false;
    if ($null.offsetLeft - $target.offsetLeft > size) return false;
    if ($target.offsetTop - $null.offsetTop > size) return false;
    if ($target.offsetLeft - $null.offsetLeft > size) return false;

    if ($null.offsetTop - $target.offsetTop >= size && $null.offsetLeft - $target.offsetLeft >= size) return false;
    if ($target.offsetTop - $null.offsetTop >= size && $null.offsetLeft - $target.offsetLeft >= size) return false;
    if ($null.offsetTop - $target.offsetTop >= size && $target.offsetLeft - $null.offsetLeft >= size) return false;
    if ($target.offsetTop - $null.offsetTop >= size && $target.offsetLeft - $null.offsetLeft >= size) return false;
    return true;
}

export function onAnimationTags($target, $null, size) {
    if ($target.offsetTop - $null.offsetTop === size) {
        createAnimation('animate__slideInUp', $null, $target)
    }

    if ($null.offsetTop - $target.offsetTop === size) {
        createAnimation('animate__slideInDown', $null, $target)
    }

    if ($target.offsetLeft - $null.offsetLeft === size) {
        createAnimation('animate__slideInRight', $null, $target)
    }

    if ($null.offsetLeft - $target.offsetLeft === size) {
        createAnimation('animate__slideInLeft', $null, $target)
    }
}

export function finishedTagsGame() {
    const arrayTags = Array.from($field.children)
    arrayTags.forEach(tag => arrayTags.indexOf(tag) === tag.key ? incrementFinish() : resetFinish())

    if (finishGame.getState() === amountTags.getState() ** 2) {
        setTimeout(() => {
            overGame()
            $message.style.display = 'block'
            mutationTagsValue.disconnect()
            alert(`Вы победили за ${clicksCounter.getState()} ходов!`)
            $timerToEnd.textContent = countdownTimer().getTime()
            resetClicks()
            resetFinish()
            $start.removeAttribute('disabled')
        }, 1000)
    }
}
