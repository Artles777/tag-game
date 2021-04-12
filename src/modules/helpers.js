import {$countTags} from "./pattern";

export function shuffleTagElements(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function createElement(tag, classes = [], options = {}) {
	const el = document.createElement(tag)
	const key = Object.keys(options)
	if (classes) {
		el.classList.add(classes.join(' '))
	}
	if (options && !options.textContent && !options.innerHTML) {
		key.forEach(k => el.setAttribute(k, options[k]))
	}
	if (options.textContent) {
		el.textContent = options[key]
	}
	if (options.innerHTML) {
		el.innerHTML = options[key]
	}
	return el
}

export function newSizeTags(tag) {
	tag.style.width = Math.floor((tag.offsetWidth - $countTags.value**1.5)) + 'px'
	tag.style.height = Math.floor((tag.offsetHeight - $countTags.value**1.5)) + 'px'
}
