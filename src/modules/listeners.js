import {
	$container,
	$countTags,
	$field,
	$message,
	$clicksTags,
	$start,
} from './pattern'
import {
	disconnectOnMutation,
	newSizeTags,
	observeOnMutation,
	shuffleRandomizeIdTags
} from "./helpers";
import {createTags} from "./tags";
import {mutationOptionsDocument, preStartMutationOptions, startMutationOptions} from "./mutationsOptions";
import {mutationTagsValue, mutationDocument, mutationPreStart} from "./mutationsCallbacks";
import {finishedTagsGame, onAnimationTags, onEditCheck} from "./checks";
import {amountTags, clicksCounter, playGame, restartGame, tagsArray} from "../store/state";
import {
	changeAmountTags,
	decrementAmountTags,
	incrementAmountTags,
	incrementClicks,
	startGame
} from "../store/controllers";
import {startTimer} from "./components/startTimerComponent";
import {changeTag} from "./components/changeTagComponent";
import {backgroundChange} from "./components/backgroundChangeComponent";

const MOSelectors = new Map([
	[$field, startMutationOptions],
	[document, mutationOptionsDocument]
])

export function startRound() {
	if (restartGame.getState()) {
		startGame()
		const gameOver = '00:00'
		const arrayTags = Array.from($field.children)

		shuffleRandomizeIdTags(arrayTags)
		backgroundChange(arrayTags)
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
		const $null = Array.from($field.children).find(tag => tag.key === Array.from($field.children).length - 1)

		if (onEditCheck($target, $null, size)) {
			onAnimationTags($target, $null, size)

			changeTag($target, $null)
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
		changeAmountTags(event.target.value)
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
		event.target.id === 'increment' ? incrementAmountTags() : decrementAmountTags()
		$countTags.dispatchEvent(e)
	}
}
