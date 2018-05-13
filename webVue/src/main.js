import Vue from "vue";
import Vuex from "vuex";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";

import App from "./App.vue";
import router from "./router";


Vue.use(Element);
// 状态管理
Vue.use(Vuex);
// 使用axios来进行路由传输数据
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;

let store = new Vuex.Store({
  state: {
    teachers: []
  }
});

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
});