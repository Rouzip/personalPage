import Vue from "vue";
import Vuex from "vuex";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import VueLazyload from "vue-lazyload";

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

// 进行全局状态的存储
let store = new Vuex.Store({
  state: {
    // TODO: 将这个老师信息改编为随机向服务器请求数据，请求数量待定
    teachers: [],  // 用于展示的老师信息
    isLog: false  // 记录现在用户是否登陆，改变状态
  },
  mutations: {
    reverseState() {
      this.state.isLog = !this.state.isLog
    }
  }
});

Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 3
})

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
});