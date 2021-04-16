import {changeFieldTags, play, rotationTags, startRound, triggerCounter} from './listeners'
import {$field, $start, createTag, $countTags, $wrapperCountArrow, $container} from "./pattern";

export function createTags() {
	const tags = new Array($countTags.value ** 2).fill('').map(createTag)
	$field.insertAdjacentHTML('beforeend', tags.join(' '))
	$field.style.gridTemplate = `repeat(${$countTags.value}, 1fr) / repeat(${$countTags.value}, 1fr)`
	const mutationPreStart = new MutationObserver(cb => {
		if (!play) document.location.reload()
	})

	mutationPreStart.observe($container, {
		subtree: true,
		attributes: true,
		characterData: true
	})
}

export function eventsTags() {
	$start.addEventListener('click', startRound)
	$field.addEventListener('click', rotationTags)

	$countTags.addEventListener('change', changeFieldTags)
	$wrapperCountArrow.addEventListener('click', triggerCounter)
}
