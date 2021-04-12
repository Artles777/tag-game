import './src/index.css'
import createApp from './src/app'
import { Tags } from './src/modules/tags'
import {$container} from "./src/modules/pattern";

createApp($container).render('#app').use(Tags)
