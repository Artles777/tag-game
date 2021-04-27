export function backgroundChange(array) {
    array.forEach(tag => tag.style.background = '#6ea8fe')
    const $null = array.find(tag => tag.key === array.length - 1)
    $null.style.background = '#F8F9FA'
}
