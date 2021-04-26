import {playGame} from "../store/state";

export const mutationPreStart = new MutationObserver(() => {
    if (!playGame.getState()) document.location.reload()
})

export const mutationTagsValue = new MutationObserver(() => {
    document.location.reload()
})

export const mutationDocument = new MutationObserver((cb) => {
    if (document.head === null) document.location.reload()
})

