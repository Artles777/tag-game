import {amountTags, restartGame} from "../../store/state";
import {changeAmountTags} from "../../store/controllers";
import {$countTags, $field} from "../pattern";
import {createTags} from "../tags";
import {newSizeTags} from "../helpers";

export function changeFieldTags(event) {
    if (restartGame.getState()) {
        changeAmountTags(event.target.value)
        amountTags.watch(state => $countTags.value = state)
        $field.innerHTML = ''
        createTags()
        newSizeTags($field)
    }
}
