import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '../src/router/index.js'
import store from '../src/store/index.js'
import axios from '../src/api/http.js'
import '../src/filters/index'

Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
