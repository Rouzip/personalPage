<template>
  <div class="m-top">
    <header class="f-cb">
      <h1 class="note" :style="note">
        <a href="/" hidefocus="true"> a </a>
      </h1>
      <el-menu mode="horizontal" background-color="#1e679e" active-text-color="" class="nav-menu">
        <el-submenu index="1">
          <template slot="title"> 院系单位 </template>
          <el-menu-item v-for="depart in departs" :key="depart" :index="depart">
            <span> {{ depart }} </span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"> 员工职位 </template>
          <el-menu-item v-for="position in positions" :key="position" :index="position">
            <span> {{ position }} </span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <el-button round type="primary" v-if="!log" class="user-button"> 登录 </el-button>
      <el-button round type="primary" v-else> 登出 </el-button>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      log: false,
      note: {
        backgroundImage: "url(" + require("../assets/logo.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        float: "left",
        height: "101px",
        width: "454px"
      }
    };
  },
  computed: {
    departs: function() {
      let departmentSet = new Set();
      this.$store.state.teachers.forEach(teacher => {
        departmentSet.add(teacher.department);
      });
      let results = [];
      departmentSet.forEach(department => {
        results.push(department);
      });
      return results;
    },
    positions: function() {
      let positionSet = new Set();
      this.$store.state.teachers.forEach(teacher => {
        positionSet.add(teacher.position);
      });
      let results = [];
      positionSet.forEach(position => {
        results.push(position);
      });
      return results;
    }
  },
  methods: {},
  mounted: async function() {
    let response = await this.$http.get("/api/teachers");
    let teachers = response.data;
    this.$store.state.teachers = teachers;
  }
};
</script>

<style scoped>
.m-top {
  background: #1e679e;
  position: relative;
  z-index: 1000;
  height: 101px;
  display: flex;
}
.f-cb {
  margin: 0;
  display: block;
  width: 100%;
  padding: 0;
  display: flex;
}
.f-cb:after {
  clear: both;
  content: '.';
  display: block;
  height: 0;
  visibility: hidden;
}
.note {
  width: 100%;
  flex-grow: 5;
}
.note a {
  float: left;
  text-indent: -9999px;
  width: 454px;
  height: 101px;
}
.nav-menu {
  flex-grow: 4;
  margin: 20px;
  border-bottom: 0px;
}
.user-button {
  flex-grow: 1;
  margin: 30px;
}
h1 {
  margin: 0;
}
</style>
