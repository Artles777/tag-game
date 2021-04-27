import {$field} from "../pattern";

export function changeTag($target, $null) {
    // $null.dataset.id = $target.dataset.id
    // $target.dataset.id = 'null'
    $null.textContent = $target.textContent
    $target.textContent = ''

    $null.key = $target.key
    $target.key = Array.from($field.children).length - 1
    $null.style.background = $target.style.background
    $target.style.background = '#F8F9FA'
}
