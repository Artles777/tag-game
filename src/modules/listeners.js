import {$button, $container, $countTags, $field, $message, newCreateTag, $clicksTags} from './pattern'
import {newSizeTags, shuffleTagElements} from "./helpers";

let play = false
let restart = true
let finish = 0
let clicks = 0

export function startRound(array) {
	return function () {
		if (restart) {
			shuffleTagElements(array)
			$field.innerHTML = ''
			$field.insertAdjacentHTML('beforeend', array.join(' '))
			const $nextTags = $field.querySelectorAll('.tag')
			$nextTags.forEach((tag, idx) => {
				idx < ($countTags.value**2 )- 1 ? tag.id = (idx + 1).toString() : tag.id = 'null'
				newSizeTags(tag)
			})
			play = true
			$message.style.display = 'none'
		}
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
		// if (offsetTop - $target.offsetTop > size) return;
		// if (offsetLeft - $target.offsetLeft > size) return;
		// if ($target.offsetTop - offsetTop > size) return;
		// if ($target.offsetLeft - offsetLeft > size) return;
		//
		// if (offsetTop - $target.offsetTop >= size && offsetLeft - $target.offsetLeft >= size) return;
		// if ($target.offsetTop - offsetTop >= size && offsetLeft - $target.offsetLeft >= size) return;
		// if (offsetTop - $target.offsetTop >= size && $target.offsetLeft - offsetLeft >= size) return;
		// if ($target.offsetTop - offsetTop >= size && $target.offsetLeft - offsetLeft >= size) return;

		$null.dataset.id = id
		$target.dataset.id = 'null'
		$null.textContent = $target.textContent
		$target.textContent = ''
		$clicksTags.innerHTML = `Количество ходов: <b class="clicks_counter">${clicks += 1}</b>`

		const $nextTags = $field.querySelectorAll('.tag')
		$nextTags.forEach(tag => tag.id === tag.dataset.id ? finish += 1 : finish = 0)

		if (finish === $countTags.value**2) {
			setTimeout(() => {
				play = false
				restart = true
				$message.style.display = 'block'
				alert(`Вы победили за ${clicks} хода!`)
				clicks = 0
				$clicksTags.innerHTML = `Количество ходов: <b class="clicks_counter">${clicks}</b>`
			}, 1000)
		}
	} else {
		$container.prepend($message)
	}
}

export function changeFieldTags(tags) {
	return function () {
		if (restart) {

			if ($countTags.value < 3) {
				$countTags.value = 3
				tags = new Array($countTags.value ** 2).fill('').map(newCreateTag)
			}

			if ($countTags.value > 12) {
				$countTags.value = 12
				tags = new Array($countTags.value ** 2).fill('').map(newCreateTag)
			}

			$field.innerHTML = ''
			tags = new Array($countTags.value ** 2).fill('').map(newCreateTag)
			$field.insertAdjacentHTML('beforeend', tags.join(' '))
			$field.style.gridTemplate = `repeat(${$countTags.value}, 1fr) / repeat(${$countTags.value}, 1fr)`

			const $nextTags = $field.querySelectorAll('.tag')
			$nextTags.forEach(tag => newSizeTags(tag))

			$button.addEventListener('click', startRound(tags))
		}
	}
}
