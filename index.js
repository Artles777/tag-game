import './src/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'animate.css/animate.min.css'
import createApp from './src/app'
import {createTags, Tags} from './src/modules/tags'
import {$container} from "./src/modules/pattern";

createApp($container).render('#app').use(createTags, Tags)
