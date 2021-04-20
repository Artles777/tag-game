import {createAnimation} from "./helpers";

export function onEditCheck($target, $null, size) {
    if ($target.dataset.id === 'field') return;
    if ($target === $null) return false;
    if ($null.offsetTop - $target.offsetTop > size) return false;
    if ($null.offsetLeft - $target.offsetLeft > size) return false;
    if ($target.offsetTop - $null.offsetTop > size) return false;
    if ($target.offsetLeft - $null.offsetLeft > size) return false;

    if ($null.offsetTop - $target.offsetTop >= size && $null.offsetLeft - $target.offsetLeft >= size) return false;
    if ($target.offsetTop - $null.offsetTop >= size && $null.offsetLeft - $target.offsetLeft >= size) return false;
    if ($null.offsetTop - $target.offsetTop >= size && $target.offsetLeft - $null.offsetLeft >= size) return false;
    if ($target.offsetTop - $null.offsetTop >= size && $target.offsetLeft - $null.offsetLeft >= size) return false;
    return true;
}

export function onAnimationTags($target, $null, size) {
    if ($target.offsetTop - $null.offsetTop === size) {
        createAnimation('animate__slideInUp', $null, $target)
    }

    if ($null.offsetTop - $target.offsetTop === size) {
        createAnimation('animate__slideInDown', $null, $target)
    }

    if ($target.offsetLeft - $null.offsetLeft === size) {
        createAnimation('animate__slideInRight', $null, $target)
    }

    if ($null.offsetLeft - $target.offsetLeft === size) {
        createAnimation('animate__slideInLeft', $null, $target)
    }
}
