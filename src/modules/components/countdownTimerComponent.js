import {amountTags, finishGame} from "../../store/state";

export function countdownTimer(cb, options = {}) {
    const time = options.time || '10:00'
    const delay = options.delay || 1000
    const parseTime = time.split(':')
    let minutes = parseTime[0]
    let second = parseTime[1]
    return {
        start() {
            let timerId = setTimeout(function timer() {
                if (+second === 0) minutes = '0' + (minutes - 1).toString()
                if (+second === 0) second = 60
                second = +second - 1
                if (+second < 10) second = '0' + second.toString();
                cb(`${minutes.toString()}:${second.toString()}`)
                timerId = setTimeout(timer, delay)
                if (minutes.toString() === '00' && second.toString() === '00') {
                    clearTimeout(timerId)
                } else if (finishGame.getState() === amountTags.getState() ** 2) {
                    clearTimeout(timerId)
                }
            }, delay)
            return this
        },
        getTime() {
            return time
        }
    }
}
