import {$countTags, $field, $start, $wrapperCountArrow} from "./pattern";
import {startRound} from "./listeners/startRound";
import {rotationTags} from "./listeners/rotationTags";
import {changeFieldTags} from "./listeners/changeFieldTags";
import {triggerCounter} from "./listeners/triggerCounter";

export function eventsTags() {
    $start.addEventListener('click', startRound)
    $field.addEventListener('click', rotationTags)

    $countTags.addEventListener('change', changeFieldTags)
    $wrapperCountArrow.addEventListener('click', triggerCounter)
}
