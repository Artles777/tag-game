import {changeFieldTags, rotationTags, startRound, triggerCounter} from './listeners'
import {$field, $start, createTag, $countTags, $wrapperCountArrow, $container, $timerToEnd} from "./pattern";
import {preStartMutationOptions} from "./mutationsOptions";
import {mutationPreStart} from "./mutationsCallbacks";
import {amountTags} from "../store/state";
import {backgroundChange} from "./components/backgroundChangeComponent";

export function createTags() {
	const tags = new Array(amountTags.getState() ** 2).fill('').map(createTag)
	$field.insertAdjacentHTML('beforeend', tags.join(' '))
	const arrayTags = Array.from($field.children)
	arrayTags.forEach((tag, idx) => tag.key = idx)
	backgroundChange(arrayTags)
	$field.style.gridTemplate = `repeat(${amountTags.getState()}, 1fr) / repeat(${amountTags.getState()}, 1fr)`
	mutationPreStart.observe($container, preStartMutationOptions)
}

export function eventsTags() {
	$start.addEventListener('click', startRound)
	$field.addEventListener('click', rotationTags)

	$countTags.addEventListener('change', changeFieldTags)
	$wrapperCountArrow.addEventListener('click', triggerCounter)
}
