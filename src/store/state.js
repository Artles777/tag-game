import {createStore} from 'effector'
import {
    changeAmountTags,
    decrementAmountTags,
    incrementAmountTags,
    incrementClicks,
    incrementFinish,
    overGame,
    resetClicks,
    resetFinish,
    startGame
} from "./controllers";

export const clicksCounter = createStore(0)
    .on(incrementClicks, state => state + 1)
    .reset(resetClicks)

export const playGame = createStore(false)
    .on(startGame, () => true)
    .on(overGame, () => false)

export const restartGame = createStore(true)
    .on(startGame, () => false)
    .on(overGame, () => true)

export const finishGame = createStore(0)
    .on(incrementFinish, state => state + 1)
    .reset(resetFinish)

export const amountTags = createStore(4, {
    updateFilter: update => {
        if (update >= 3 && update <= 12 && (+update ^ 0) === +update) return true
    }
})
    .on(incrementAmountTags, state => +state + 1)
    .on(decrementAmountTags, state => +state - 1)
    .on(changeAmountTags, (state, payload) => state = +payload)
