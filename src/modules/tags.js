import {changeFieldTags, rotationTags, startRound} from './listeners'
import {$field, $button, createTag, $countTags} from "./pattern";
import {cell} from "./variebles";

let $tags

export function Tags() {
	$tags = new Array(cell).fill('').map(createTag)
	$field.insertAdjacentHTML('beforeend', $tags.join(' '))

	$button.addEventListener('click', startRound($tags))
	$field.addEventListener('click', rotationTags)

	$countTags.addEventListener('change', changeFieldTags($tags))
}
