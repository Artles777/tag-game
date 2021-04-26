import {
	$container,
	$countTags,
	$field,
	$message,
	$clicksTags,
	$timerToEnd, rollingBackTags, $start,
} from './pattern'
import {
	countdownTimer,
	disconnectOnMutation,
	newSizeTags,
	observeOnMutation,
	shuffleRandomizeIdTags
} from "./helpers";
import {createTags} from "./tags";
import {mutationOptionsDocument, preStartMutationOptions, startMutationOptions} from "./mutationsOptions";
import {mutationPreStart, mutationTagsValue, mutationDocument} from "./mutationsCallbacks";
import {finishedTagsGame, onAnimationTags, onEditCheck} from "./checks";
import {amountTags, clicksCounter, playGame, restartGame} from "../store/state";
import {
	changeAmountTags,
	decrementAmountTags,
	incrementAmountTags,
	incrementClicks,
	overGame,
	startGame
} from "../store/controllers";

const MOSelectors = new Map([
	[$field, startMutationOptions],
	[document, mutationOptionsDocument]
])

function startTimer(arrayTags, gameOver) {
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
export function startRound() {
	if (restartGame.getState()) {
		startGame()
		const gameOver = '00:00'
		const arrayTags = Array.from($field.children)

		shuffleRandomizeIdTags(arrayTags)
		$start.setAttribute('disabled', 'disabled')

		$message.style.display = 'none'
		observeOnMutation([mutationTagsValue, mutationDocument], MOSelectors)

		startTimer(arrayTags, gameOver)
	}
}

export function rotationTags(event) {
	if (playGame.getState()) {
		const $target = event.target
		const size = $target.offsetWidth || $target.offsetHeight
		const $null = $field.querySelector('[data-id="null"]')

		if (onEditCheck($target, $null, size)) {
			onAnimationTags($target, $null, size)

			$null.dataset.id = $target.dataset.id
			$target.dataset.id = 'null'
			$null.textContent = $target.textContent
			$target.textContent = ''

			disconnectOnMutation([mutationTagsValue, mutationDocument])

			$null.addEventListener('animationend', () => {
				observeOnMutation([mutationTagsValue, mutationDocument], MOSelectors)
			})


			incrementClicks()
			clicksCounter.watch(click => $clicksTags.innerHTML = `Количество ходов: <b class="clicks_counter">${click}</b>`)

			finishedTagsGame()
		}
	} else {
		$container.prepend($message)
	}
}

export function changeFieldTags(event) {
	if (restartGame.getState()) {
		let { value } = event.target

		if ((+value ^ 0) !== +value) {
			$countTags.value = Math.round(+$countTags.value)
		}
		changeAmountTags(value)
		amountTags.watch(state => $countTags.value = state)

		$field.innerHTML = ''
		createTags()
		newSizeTags($field)
	}
}

export function triggerCounter(event) {
	if (restartGame.getState()) {
		amountTags.watch(state => $countTags.value = state)
		const e = new Event('change');
		if (event.target.id === 'increment') {
			incrementAmountTags()
			$countTags.dispatchEvent(e)
		} else {
			decrementAmountTags()
			$countTags.dispatchEvent(e)
		}
	}
}
