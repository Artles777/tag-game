import {
	$container,
	$countTags,
	$field,
	$message,
	$clicksTags,
	$timerToEnd, rollingBackTags, $start,
} from './pattern'
import {countdownTimer, createAnimation, newSizeTags, shuffleRandomizeIdTags} from "./helpers";
import {createTags} from "./tags";
import {startMutationOptions} from "./mutationsOptions";
import {mutationTagsValue} from "./mutationsCallbacks";
import {onAnimationTags, onEditCheck} from "./checks";

export let play = false
let restart = true
let finish = 0
let clicks = 0

export function startRound() {
	if (restart) {
		play = true
		const gameOver = '00:00'
		const arrayTags = Array.from($field.children)

		shuffleRandomizeIdTags(arrayTags)
		$start.setAttribute('disabled', 'disabled')

		if (arrayTags.length === $countTags.value**2) restart = false
		$message.style.display = 'none'

		mutationTagsValue.observe($field, startMutationOptions)

		countdownTimer((el) => {
			$timerToEnd.textContent = el
			if (el === gameOver) {
				play = false
				restart = true
				$message.style.display = 'block'
				alert(`Вы проиграли! Сделано ходов: ${clicks}`)
				$start.removeAttribute('disabled')
				clicks = 0
				$timerToEnd.textContent = '10:00'
				rollingBackTags(arrayTags)
			}
		})
	}
}

export function rotationTags(event) {
	if (play) {
		restart = false
		const $target = event.target
		const size = $target.offsetWidth || $target.offsetHeight
		const $null = $field.querySelector('[data-id="null"]')

		if (onEditCheck($target, $null, size)) {
			onAnimationTags($target, $null, size)

			$null.dataset.id = $target.dataset.id
			$target.dataset.id = 'null'
			$null.textContent = $target.textContent
			$target.textContent = ''

			mutationTagsValue.disconnect()
			$null.addEventListener('animationend', () => mutationTagsValue.observe($field, startMutationOptions))

			$clicksTags.innerHTML = `Количество ходов: <b class="clicks_counter">${clicks += 1}</b>`

			const arrayTags = Array.from($field.children)
			arrayTags.forEach(tag => {
				if (tag.id <= 15) {
					tag.id === tag.dataset.id && tag.id === tag.textContent ? finish += 1 : finish = 0
				} else {
					tag.id === tag.dataset.id ? finish += 1 : finish = 0
				}
			})

			if (finish === arrayTags.length) {
				setTimeout(() => {
					play = false
					restart = true
					$message.style.display = 'block'
					alert(`Вы победили за ${clicks} ходов!`)
					$start.removeAttribute('disabled')
					clicks = 0
					$clicksTags.innerHTML = 'Количество ходов: <b class="clicks_counter">0</b>'
					$countTags.removeAttribute('disabled')
				}, 1000)
			}
		}
	} else {
		$container.prepend($message)
	}
}

export function changeFieldTags(event) {
	if (restart) {
		let { value } = event.target

		if ((+value ^ 0) !== +value) {
			$countTags.value = Math.round(+$countTags.value)
		}

		if (value < 3) {
			$countTags.value = 3
		}

		if (value > 12) {
			$countTags.value = 12
		}

		$field.innerHTML = ''
		createTags()
		newSizeTags($field)
	}
}

export function triggerCounter(event) {
	if (restart) {
		const e = new Event('change');
		if (event.target.id === 'increment') {
			$countTags.value = +$countTags.value + 1
			$countTags.dispatchEvent(e)
		} else {
			$countTags.value = +$countTags.value - 1
			$countTags.dispatchEvent(e)
		}
	}
}
