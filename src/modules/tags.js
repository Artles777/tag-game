import {changeFieldTags, rotationTags, startRound, triggerCounter} from './listeners'
import {$field, $start, createTag, $countTags, $wrapperCountArrow, $container} from "./pattern";
import {preStartMutationOptions} from "./mutationsOptions";
import {mutationPreStart} from "./mutationsCallbacks";

export function createTags() {
	const tags = new Array($countTags.value ** 2).fill('').map(createTag)
	$field.insertAdjacentHTML('beforeend', tags.join(' '))
	$field.style.gridTemplate = `repeat(${$countTags.value}, 1fr) / repeat(${$countTags.value}, 1fr)`

	mutationPreStart.observe($container, preStartMutationOptions)
}

export function eventsTags() {
	$start.addEventListener('click', startRound)
	$field.addEventListener('click', rotationTags)

	$countTags.addEventListener('change', changeFieldTags)
	$wrapperCountArrow.addEventListener('click', triggerCounter)
}
