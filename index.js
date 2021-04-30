import './index.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'animate.css/animate.min.css'
import createApp from './src/app'
import {$container} from "./src/modules/pattern";
import {createTags} from './src/modules/tags'
import {eventsTags} from "./src/modules/eventsTags";

createApp($container).render('#app').use(createTags, eventsTags)
