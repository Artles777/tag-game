import {amountTags, restartGame} from "../../store/state";
import {$countTags} from "../pattern";
import {decrementAmountTags, incrementAmountTags} from "../../store/controllers";

export function triggerCounter(event) {
    if (restartGame.getState()) {
        amountTags.watch(state => $countTags.value = state)
        const e = new Event('change');
        event.target.id === 'increment' ? incrementAmountTags() : decrementAmountTags()
        $countTags.dispatchEvent(e)
    }
}
