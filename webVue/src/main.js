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
    teachers: [], // 用于展示的老师信息
    isLog: false, // 记录现在用户是否登陆，改变状态
    departments: [
      "文学与新闻传播学院",
      "外国语学院",
      "建筑与艺术学院",
      "商学院",
      "法学院",
      "马克思学院",
      "公共管理学院",
      "数学与统计学院",
      "物理与电子学院",
      "化学化工学院",
      "机电工程学院",
      "能源科学与工程学院",
      "材料科学与工程学院",
      "粉末冶金研究院",
      "交通运输工程学院",
      "土木工程学院",
      "地球科学与信息物理学院",
      "资源与安全工程学院",
      "资源加工与生物工程学院",
      "信息科学与工程学院(大数据研究院)",
      "软件学院",
      "航空航天学院",
      "体育教研部",
      "基础医学院",
      "湘雅公共卫生学院",
      "湘雅护理学院",
      "口腔医学院",
      "药学院",
      "生命科学学院",
      "爱尔眼科院",
      "湘雅医院",
      "湘雅二医院",
      "湘雅三医院"
    ]
  },
  mutations: {
    reverseState() {
      this.state.isLog = !this.state.isLog;
    }
  }
});

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "dist/error.png",
  loading: "dist/loading.gif",
  attempt: 3
});

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
