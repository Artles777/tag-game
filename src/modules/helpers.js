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

export function newSizeTags(tag) {
	tag.style.width = Math.floor((tag.offsetWidth - $countTags.value**1.5)) + 'px'
	tag.style.height = Math.floor((tag.offsetHeight - $countTags.value**1.5)) + 'px'
}

export function countdownTimer(time, selector) {
	const parseTime = time.split(':')
	const second = parseTime[1].split('')
	let minutes = parseTime[0]
	let newSecond;
	if (+second[0] === 0) {
		newSecond = parseTime[1].slice(1)
	}
	const intervalID = setInterval(() => {
		if (+newSecond === 0) minutes = '0' + (minutes - 1).toString()
		if (+newSecond === 0) newSecond = 60
		newSecond = +newSecond - 1
		if (+newSecond < 10) newSecond = '0' + newSecond.toString();
		if (minutes.toString() === '00' && newSecond.toString() === '00') clearInterval(intervalID)
		const sel = document.querySelector(selector)
		sel.textContent = `${minutes.toString()}:${newSecond.toString()}`
	}, 1000)
}
