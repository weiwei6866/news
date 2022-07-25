import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import *as api from '@/api'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import router from '@/router'
import 'amfe-flexible'

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$api = api
    Vue.prototype.$bus = this
  },
  router
}).$mount('#app')
