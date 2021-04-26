export const preStartMutationOptions  = {
    subtree: true,
    attributeFilter: ['data-id', 'id', 'class'],
    characterData: true
}

export const startMutationOptions = {
    subtree: true,
    attributeFilter: ['data-id', 'id', 'style'],
    characterData: true,
    childList: true
}

export const mutationOptionsDocument = {
    subtree: true,
    childList: true
}
