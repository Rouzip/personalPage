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
      <el-button round type="primary" v-if="!log" class="user-button" @click="openDialog"> 登录 </el-button>
      <el-button round type="primary" v-else class="user-button" @click="logout"> 登出 </el-button>
      <el-dialog :visible.sync="dialogOpen"
                  :modal-append-to-body=false
                  :close-on-click-modal=false
                  width="30%">
        <el-tabs v-model="activeName">
          <el-tab-pane label="登陆" name="first">
            <el-input
              placeholder="请输入电话"
              suffix-icon="el-icon-tickets"
              v-model="tel"
              clearable
              style="margin-top:10%;">
            </el-input>
            <el-input
              placeholder="请输入密码"
              suffix-icon="el-icon-edit"
              v-model="pwd"
              type="password"
              clearable>
            </el-input>
            <!-- 按钮的居中使用了div进行包装text-align进行居中 -->
            <div class="submit-button">
              <el-button
              type="primary"
              @click="login">
                登陆
              </el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注册" name="second">
            <el-input
              placeholder="请输入用户名"
              suffix-icon="el-icon-tickets"
              v-model="tel"
              clearable
              style="margin-top:10%;">
            </el-input>
            <el-input
              placeholder="请输入电话"
              suffix-icon="el-icon-edit"
              v-model="tel"
              clearable>
            </el-input>
            <!-- 按钮的居中使用了div进行包装text-align进行居中 -->
            <div class="submit-button">
              <el-button
              type="primary">
                注册
              </el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </header>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      tel: '',
      pwd: '',
      user: '',
      activeName: 'first',
      dialogOpen: false,
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
    log() {
      return this.$store.state.isLog
    },
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
  methods: {
    openDialog() {
      this.dialogOpen = true
    },
    async login() {
      let res = await this.$http.post('/user/login', qs.stringify({
        'tel': this.tel,
        'pwd': this.pwd
      }))
      if (res.data.exist === true) {
        this.$store.commit('reverseState')
        this.dialogOpen = false
        this.$message({
          showClose: true,
          message: '登陆成功',
          type: 'success'
        })
      }
      else {
        this.$message({
          showClose: true,
          message: '密码错误',
          type: 'error'
        })
      }
    },
    async logout() {
      // TODO: 后端发送消息，登出
      let res = await this.$http.get('/user/logout')
      if (res.data.exit === true) {
        // TODO: 退出成功
        this.$message({
          showClose: true,
          message: '登出成功',
          type: 'success'
        })
        this.$store.commit('reverseState')
      } else {
        this.$router.push('/showbanner')
      }
    }
  },
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
  z-index: 3;
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
.submit-button {
  text-align: center;
  margin-top: 10%;
}
h1 {
  margin: 0;
}
</style>
