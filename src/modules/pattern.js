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

export const createTag = (_, i) => `<div class="tag animate__animated">${i < (amountTags.getState() ** 2) - 1 ? i + 1 : ''}</div>`

export const rollingBackTags = (array) => array.forEach((tag, idx) => {
		tag.key = idx
		tag.textContent = idx < (array.length) - 1 ? (idx +1).toString() : ''
		tag.style.background = idx < (array.length) - 1 ? '#6ea8fe' : '#F8F9FA'
	})
