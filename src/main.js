/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import router from './router'
// import dotenv from 'dotenv'

// dotenv.config()

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCartShopping, faUserSecret, faXmark, faFlag, faCaretRight, faIdCard, faRetweet, faCircleQuestion, faPlus, faListCheck} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter, faTwitch, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faListCheck, faXmark, faFlag, faCaretRight, faRetweet, faCircleQuestion, faTwitter, faTwitch, faYoutube, faTiktok, faFacebook, faInstagram, faCartShopping, faIdCard, faPlus)

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App, router)

registerPlugins(app)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

// new Vue({
//     router,
//     render: function (h) { return h(App) }
//   }).$mount('#app')
