import {changeFieldTags, rotationTags, startRound, triggerCounter} from './listeners'
import {$field, $start, createTag, $countTags, $wrapperCountArrow} from "./pattern";
import {newSizeTags} from "./helpers";

export function createTags() {
	const tags = new Array($countTags.value ** 2).fill('').map(createTag)
	$field.insertAdjacentHTML('beforeend', tags.join(' '))
	console.log($field.shadowRoot.innerHTML)
	$field.style.gridTemplate = `repeat(${$countTags.value}, 1fr) / repeat(${$countTags.value}, 1fr)`
}

export function eventsTags() {
	$start.addEventListener('click', startRound)
	$field.addEventListener('click', rotationTags)

	$countTags.addEventListener('change', changeFieldTags)
	$wrapperCountArrow.addEventListener('click', triggerCounter)
}
