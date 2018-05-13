import Vue from "vue";
import Router from 'vue-router'

import mainBanner from "./compoments/info";

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/showBanner',
    component: mainBanner
  }],
  mode: 'history'
})