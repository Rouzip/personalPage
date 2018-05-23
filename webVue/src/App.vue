<template>
  <div id="app">
    <el-container>
      <el-header style="height: 101px; padding: 0;">
        <nav-header class="nav-header"> </nav-header>
      </el-header>
      <el-main style="padding:0;">
        <router-view class="main-show"></router-view>
      </el-main>
      <el-footer class="foot"> 浏览人数 {{ watchNum }} &nbsp;&nbsp;&nbsp;Right:Rouzip </el-footer>
    </el-container>
  </div>
</template>

<script>
import nav from "./compoments/navMenu";
import mainBanner from "./compoments/info";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      watchNum: ""
    };
  },
  components: {
    "nav-header": nav
  },
  // 此处只是为了模拟转换
  created: async function() {
    await this.getViewNum();
    this.$router.push("/showbanner");
  },
  methods: {
    // 计算浏览人数
    async getViewNum() {
      let res = await this.$http.get("/api/peoples");
      let num = parseInt(res.data.people);
      let len = 6;
      // 为浏览人数补0
      function addZero(num, len) {
        return (Array(len).join("0") + num).slice(num.toString().length - 1);
      }
      this.watchNum = addZero(num, len);
    },
    async login() {}
  }
};
</script>
  
<style scoped>
.main-show {
  width: 100%;
  padding: 0;
}
.foot {
  background: #b8b5b5;
  text-align: center;
}
</style>
