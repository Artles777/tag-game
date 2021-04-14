import {createElement, countdownTimer} from "./helpers";
import {cell, cols} from "./variebles";

export const $container = createElement('div', ['container'])

export const $message = createElement('p', ['message'], {
	innerHTML: `Нажмите кнопку <b>Старт игры</b> для начала игры!`
})

export const $button = createElement('button', ['start'], {
	textContent: 'Старт игры'
})

export const $footer = createElement('div', ['footer'])

export const $label = createElement('label', ['label'], {
	textContent: 'Размер поля:'
})

export const $countTags = createElement('input', ['count'], {
	type: 'number',
	value: `${cols}`,
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
	innerHTML: 'Количество ходов: <b class="clicks_counter">0</b>'
})

export const $wrapperTimer = createElement('div', ['timer_wrapper'])

export const $timerLabel = createElement('span', ['timer_label'], {
	textContent: 'Время до завершения: '
})

export const $timerToEnd = createElement('span', ['timer'], {
	textContent: '10:00'
})

export const $field = createElement('div', ['field'], { ['data-id']: 'field' })

$container.append($footer, $button, $field, $clicksTags, $wrapperTimer)
$footer.append($label, $countTags, $wrapperCountArrow)
$wrapperCountArrow.append($arrowCountTop, $arrowCountBottom)
$wrapperTimer.append($timerLabel, $timerToEnd)

export const createTag = (_, i) => i < ($countTags.value ** 2) - 1
	? `<div class="tag" id="${i + 1}" data-id="${i + 1}">${i + 1}</div>`
	: `<div class="tag" id="null" data-id="null"></div>`
