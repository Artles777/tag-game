import {amountTags} from "../store/state";
import {$container, $field, $footer, $start} from "./pattern";

export const mutationPreStart = new MutationObserver((cb) => {
    cb.forEach(el => {
        if (el.target.attributes !== undefined) {
            const node = el.removedNodes[0]

            if (el.type !== 'childList') {
                if (el.target.className === 'message') return
                if (el.target.className === 'timer') return;
                if (el.target.attributes.style === undefined) el.target.style.cssText = el.oldValue
                if (el.target.className === 'field') {
                    if (el.target.style.gridTemplateRows !== `repeat(${amountTags.getState()}, 1fr)` &&
                        Object.keys(el.target.style.gridTemplateRows).join() !== 'grid-template-rows' ||
                        el.target.style.gridTemplateColumns !== `repeat(${amountTags.getState()}, 1fr)` &&
                        Object.keys(el.target.style.gridTemplateColumns).join() !== 'grid-template-columns'
                    ) el.target.attributes.style.value = el.oldValue
                } else {
                    if (el.target.style.background !== 'rgb(248, 249, 250)' &&
                        el.target.style.background !== 'rgb(110, 168, 254)' &&
                        Object.keys(el.target.style.background).join() !== 'background'
                    ) el.target.attributes.style.value = el.oldValue
                }
            } else if (document.head === null) {
                el.target.prepend(node)
            } else if (document.body === null) {
                el.target.append(node)
            } else if (el.removedNodes[0] !== undefined) {
                if (el.removedNodes.length) {
                    if (el.target === document.body) {
                        if (el.removedNodes[0].id === 'app') {
                            el.target.prepend(el.removedNodes[0])
                        }
                    } else if (el.target.id === 'app') {
                        if (el.removedNodes[0].className === 'container') {
                            el.target.prepend(el.removedNodes[0])
                        }
                    } else if (el.target === $container) {
                        switch (el.removedNodes[0].className) {
                            case 'timer_wrapper' : return el.target.append(el.removedNodes[0])
                            case 'field' : return $start.insertAdjacentElement('afterend', el.removedNodes[0])
                            case 'footer' : return el.target.prepend(el.removedNodes[0])
                            case 'start' : return $footer.insertAdjacentElement('afterend', el.removedNodes[0])
                            case 'clicks' : return $field.insertAdjacentElement('afterend', el.removedNodes[0])
                        }
                    }
                }
            }
        }
    })
})

export const mutationTagsValue = new MutationObserver((cb) => {
    cb.forEach(el => {
        const node = el.removedNodes[0]

        if (el.target.className === 'clicks_counter') return;
        if (el.target.className === 'timer') return;
        if (el.type !== 'childList') {
            if (el.type === 'characterData') el.target.parentElement.textContent = el.oldValue
            if (el.target.classList !== undefined || el.target.style !== undefined) {
                if (el.target.classList[0] !== 'tag' || el.target.classList[1] !== 'animate__animated') {
                    el.target.className = el.oldValue
                }
                if (el.target.attributes.style === undefined) el.target.style.cssText = el.oldValue
                if (el.target.style.background !== 'rgb(248, 249, 250)' &&
                    el.target.style.background !== 'rgb(110, 168, 254)' &&
                    Object.keys(el.target.style.background).join() !== 'background'
                ) el.target.attributes.style.value = el.oldValue
            }
        } else if (document.head === null) {
            el.target.prepend(node)
        } else if (el.removedNodes[0] !== undefined &&
            el.removedNodes[0].nodeName !== '#text' &&
            el.type === 'childList') {
            document.location.reload()
        } else if (el.addedNodes[0] !== undefined &&
            el.addedNodes[0].nodeName !== '#text' &&
            el.type === 'childList') {
            document.location.reload()
        }
    })
})

