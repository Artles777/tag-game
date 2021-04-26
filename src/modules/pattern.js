import {countdownTimer, createElement} from "./helpers";
import {amountTags, clicksCounter} from "../store/state";

export const $container = createElement('div', ['container'])

export const $message = createElement('p', ['message'], {
	innerHTML: `Нажмите кнопку <b>Старт игры</b> для начала игры!`
})

export const $start = createElement('button', ['start'], {
	textContent: 'Старт игры'
})

export const $footer = createElement('div', ['footer'])

export const $label = createElement('label', ['label'], {
	textContent: 'Размер поля:'
})

export const $countTags = createElement('input', ['count'], {
	type: 'number',
	value: amountTags.getState(),
	min: 3,
	max: 12
})

export const $wrapperCountArrow = createElement('div', ['count_wrapper'])
export const $arrowCountTop = createElement('i', ['count_arrow', 'bi', 'bi-caret-up-fill'], {
	id: 'increment'
})
export const $arrowCountBottom = createElement('i', ['count_arrow', 'bi', 'bi-caret-down-fill'], {
	id: 'decrement'
})

export const $clicksTags = createElement('p', ['clicks'], {
	innerHTML: `Количество ходов: <b class="clicks_counter">${clicksCounter.getState()}</b>`
})

export const $wrapperTimer = createElement('div', ['timer_wrapper'])

export const $timerLabel = createElement('span', ['timer_label'], {
	textContent: 'Время до завершения: '
})

export const $timerToEnd = createElement('span', ['timer'], {
	textContent: countdownTimer().getTime()
})

export const $field = createElement('div', ['field'], { ['data-id']: 'field' })

$container.append($footer, $start, $field, $clicksTags, $wrapperTimer)
$footer.append($label, $countTags, $wrapperCountArrow)
$wrapperCountArrow.append($arrowCountTop, $arrowCountBottom)
$wrapperTimer.append($timerLabel, $timerToEnd)

export const createTag = (_, i) => i < ($countTags.value ** 2) - 1
	? `<div class="tag animate__animated" id="${i + 1}" data-id="${i + 1}">${i + 1}</div>`
	: `<div class="tag animate__animated" id="null" data-id="null"></div>`

export const rollingBackTags = (array) => array.forEach((tag, idx) => {
		tag.dataset.id = idx < (array.length) - 1 ? (idx +1).toString() : 'null'
		tag.textContent = idx < (array.length) - 1 ? (idx +1).toString() : ''
	})
