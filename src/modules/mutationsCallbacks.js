import {play} from "./listeners";

export const mutationPreStart = new MutationObserver(() => {
    if (!play) document.location.reload()
})

export const mutationTagsValue = new MutationObserver(() => {
    document.location.reload()
})
