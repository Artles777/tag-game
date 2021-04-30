import {$countTags} from "./pattern";

export function shuffleRandomizeIdTags(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i].textContent, array[j].textContent] = [array[j].textContent, array[i].textContent];
		[array[i].key, array[j].key] = [array[j].key, array[i].key];
	}
}

export function createElement(tag, classes = [], options = {}) {
	const el = document.createElement(tag)
	const key = Object.keys(options)
	if (classes) {
		el.classList.add(...classes)
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

export function newSizeTags(tags) {
	Array.from(tags.children).forEach(tag => {
		tag.style.width = Math.floor((tag.offsetWidth - $countTags.value**1.25)) + 'px'
		tag.style.height = Math.floor((tag.offsetHeight - $countTags.value**1.25)) + 'px'
	})
}

export function createAnimation(animationName, prevent, target, duration) {
	prevent.classList.add(animationName)
	prevent.style.setProperty('--animate-duration', duration || '250ms');
	prevent.addEventListener('animationend', () => {
		prevent.classList.remove(animationName)
	});
}

export function disconnectOnMutation(mutations = []) {
	if (mutations.length) {
		mutations.forEach(mutation => mutation.disconnect())
	}
}
