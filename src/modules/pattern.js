import {createElement} from "./helpers";
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
	placeholder: 'Размер поля',
	value: `${cols}`,
	min: 3,
	max: 12
})

export const $clicksTags = createElement('p', ['clicks'], {
	innerHTML: 'Количество ходов: <b class="clicks_counter">0</b>'
})

export const $field = createElement('div', ['field'], { ['data-id']: 'field' })
$container.append($button, $field, $footer, $clicksTags)
$footer.append($label, $countTags)

export const createTag = (_, i) => i < cell - 1
	? `<div class="tag" id="${i + 1}" data-id="${i + 1}">${i + 1}</div>`
	: `<div class="tag" id="null" data-id="null"></div>`

export const newCreateTag = (_, i) => i < ($countTags.value ** 2) - 1
	? `<div class="tag" id="${i + 1}" data-id="${i + 1}">${i + 1}</div>`
	: `<div class="tag" id="null" data-id="null"></div>`
