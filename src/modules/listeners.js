import {
	$button,
	$container,
	$countTags,
	$field,
	$message,
	$clicksTags,
	$timerToEnd,
} from './pattern'
import {countdownTimer, newSizeTags, shuffleTagElements} from "./helpers";
import {createTags} from "./tags";

let play = false
let restart = true
let finish = 0
let clicks = 0

export function startRound() {
	if (restart) {
		const gameOver = '00:00'
		const arrayTags = Array.from($field.children)
		shuffleTagElements(arrayTags)
		$field.innerHTML = ''
		arrayTags.forEach((tag, idx) => {
			idx < ($countTags.value**2)- 1 ? tag.id = (idx + 1).toString() : tag.id = 'null'
			$field.insertAdjacentElement('beforeend', tag)
			newSizeTags(tag)
		})

		play = true
		$countTags.setAttribute('disabled', 'true')
		if (arrayTags.length === $countTags.value**2) restart = false
		$message.style.display = 'none'
		countdownTimer((el) => {
			$timerToEnd.textContent = el
			if (el === gameOver) {
				play = false
				restart = true
				$message.style.display = 'block'
				alert(`Вы проиграли! Вы сходили: ${clicks} раз`)
				$countTags.removeAttribute('disabled')
				clicks = 0
				$timerToEnd.textContent = '10:00'
				$field.innerHTML = ''
				createTags()
			}
		})
	}
}

export function rotationTags(event) {
	if (play) {
		restart = false
		const $target = event.target
		const { id } = $target.dataset
		const size = $target.offsetWidth
		const $null = $field.querySelector('[data-id="null"]')
		const { offsetTop, offsetLeft } = $null

		if (id === 'field') return;
		if ($target === $null) return;
		if (offsetTop - $target.offsetTop > size) return;
		if (offsetLeft - $target.offsetLeft > size) return;
		if ($target.offsetTop - offsetTop > size) return;
		if ($target.offsetLeft - offsetLeft > size) return;

		if (offsetTop - $target.offsetTop >= size && offsetLeft - $target.offsetLeft >= size) return;
		if ($target.offsetTop - offsetTop >= size && offsetLeft - $target.offsetLeft >= size) return;
		if (offsetTop - $target.offsetTop >= size && $target.offsetLeft - offsetLeft >= size) return;
		if ($target.offsetTop - offsetTop >= size && $target.offsetLeft - offsetLeft >= size) return;

		// $null.classList.add('animate__animated', 'animate__fadeInUp')
		$null.dataset.id = id
		$target.dataset.id = 'null'
		$null.textContent = $target.textContent
		$target.textContent = ''

		$clicksTags.innerHTML = `Количество ходов: <b class="clicks_counter">${clicks += 1}</b>`

		const arrayTags = Array.from($field.children)
		arrayTags.forEach(tag => tag.id === tag.dataset.id ? finish += 1 : finish = 0)

		if (finish === $countTags.value**2) {
			setTimeout(() => {
				play = false
				restart = true
				$message.style.display = 'block'
				alert(`Вы победили за ${clicks} ходов!`)
				clicks = 0
				$clicksTags.innerHTML = `Количество ходов: <b class="clicks_counter">${clicks}</b>`
				$countTags.removeAttribute('disabled')
			}, 1000)
		}
	} else {
		$container.prepend($message)
	}
}

export function changeFieldTags() {
	if (restart) {

		if ((+$countTags.value ^ 0) !== +$countTags.value) {
			$countTags.value = Math.round(+$countTags.value)
		}

		if ($countTags.value < 3) {
			$countTags.value = 3
		}

		if ($countTags.value > 12) {
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
