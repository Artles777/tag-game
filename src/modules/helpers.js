import {$countTags} from "./pattern";

export function shuffleRandomizeIdTags(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i].dataset.id, array[j].dataset.id] = [array[j].dataset.id, array[i].dataset.id];
		[array[i].textContent, array[j].textContent] = [array[j].textContent, array[i].textContent];
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

export function countdownTimer(cb, options = {}) {
	const time = options.time || '10:00'
	const delay = options.delay || 1000
	const parseTime = time.split(':')
	let minutes = parseTime[0]
	let second = parseTime[1]
	let timerId = setTimeout(function timer() {
		if (+second === 0) minutes = '0' + (minutes - 1).toString()
		if (+second === 0) second = 60
		second = +second - 1
		if (+second < 10) second = '0' + second.toString();
		cb(`${minutes.toString()}:${second.toString()}`)
		if (minutes.toString() === '00' && second.toString() === '00') {
			clearTimeout(timerId)
			return
		}
		timerId = setTimeout(timer, delay)
	}, delay)
}

export function createAnimation(animationName, prevent, target, duration) {
	prevent.classList.add(animationName)
	prevent.style.setProperty('--animate-duration', duration || '250ms');
	prevent.addEventListener('animationend', () => {
		prevent.classList.remove(animationName)
	});
}
