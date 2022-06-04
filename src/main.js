import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
// Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faThumbsUp, faThumbsDown);



createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).use(VueAxios, axios).mount('#app')

