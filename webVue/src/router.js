import Vue from "vue";
import Router from "vue-router";

import mainBanner from "./compoments/info";
import showBoard from "./compoments/showinfo";
import teacherList from "./compoments/showBoard";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/showBanner",
      component: mainBanner
    },
    {
      path: "/infos/:id",
      component: showBoard
    },
    {
      path: "/board/:type/:group",
      component: teacherList
    }
  ],
  mode: "history"
});
