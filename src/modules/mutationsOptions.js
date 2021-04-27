export const preStartMutationOptions  = {
    subtree: true,
    attributeFilter: ['class'],
    characterData: true
}

export const startMutationOptions = {
    subtree: true,
    attributeFilter: ['class', 'style'],
    characterData: true,
    childList: true
}

export const mutationOptionsDocument = {
    subtree: true,
    childList: true
}
