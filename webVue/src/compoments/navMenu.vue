<template>
  <div class="m-top">
    <header class="f-cb">
      <h1 class="note" :style="note">
        <a href="/" hidefocus="true"> a </a>
      </h1>
      <el-menu mode="horizontal" 
                background-color="#1e679e" 
                active-text-color="" 
                class="nav-menu">
        <el-menu-item index="1" @click="openDepList">院系单位
        </el-menu-item>
          <el-dialog  title="学院列表"
                      :visible.sync="dialogDep"
                      :modal-append-to-body="false"
                      :before-close="closeDepList"
                      :close-on-click-modal=false
                      width="90%"
                      top="5vh">
            <div id="dep-frame">
              <el-button v-for="dep in this.$store.state.departments" 
                  :key="dep"
                  class="dep-item"
                  @click="jumpBoard(dep)">
                {{dep}}
              </el-button>
            </div>
          </el-dialog>
        <el-submenu index="2">
          <template slot="title"> 员工职位 </template>
          <el-menu-item v-for="position in positions" 
                        :key="position" 
                        :index="position"
                        @click="jumpBoard2(position)">
            <span> {{ position }} </span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <el-button 
        round type="primary" 
        v-if="!log" 
        class="user-button" 
        @click="openDialog"> 登录 </el-button>
      <el-button 
        round type="primary" 
        v-else 
        class="user-button" 
        @click="logout"> 登出 </el-button>
      <el-dialog 
        :visible.sync="dialogOpen"
        :modal-append-to-body=false
        :close-on-click-modal=false
        :modal="false"
        width="30%">
        <el-tabs v-model="activeName">
          <!-- FIXME: 以后将登陆action中加入router的push，直接推送到编辑页 -->
          <el-tab-pane label="登陆" name="first">
            <el-input
              placeholder="请输入电话"
              suffix-icon="el-icon-tickets"
              v-model="tel"
              clearable
              style="margin-top:10%; margin-bottom:10%;">
            </el-input>
            <div class="captcha">
              <el-input
                placeholder="请输入验证码"
                suffix-icon="el-icon-edit"
                v-model="pwd"
                type="password"
                clearable>
              </el-input>
              <el-button
              type=primary
              style="margin-right: 1vh; margin-left: 1vh;"
              @click="captcha"
              :disabled="disableCaptcha">
                <span v-show="!disableCaptcha">验证码</span>
                <span v-show="disableCaptcha">{{ time+'s' }}</span>
              </el-button>
            </div>
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
              v-model="user"
              clearable
              style="margin-top:10%; margin-bottom:10%;">
            </el-input>
            <el-input
              placeholder="请输入电话"
              suffix-icon="el-icon-edit"
              v-model="telSign"
              clearable>
            </el-input>
            <!-- 按钮的居中使用了div进行包装text-align进行居中 -->
            <div class="submit-button">
              <el-button
              type="primary"
              @click="signUp">
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
import { setTimeout } from "timers";

export default {
  data() {
    return {
      tel: "",
      pwd: "",
      user: "",
      telSign: "",
      activeName: "first",
      time: 60, // 倒计时计算
      disableCaptcha: false, // 验证码按钮是否允许被按下
      dialogOpen: false, // 此处用于登录
      dialogDep: false, // 此处用于学院列表
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
      return this.$store.state.isLog;
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
      this.dialogOpen = true;
    },
    openDepList() {
      this.dialogDep = true;
    },
    closeDepList() {
      this.dialogDep = false;
    },
    jumpBoard(type) {
      this.$router.push("/board/" + "department" + "/" + type);
      this.dialogDep = false;
    },
    jumpBoard2(position) {
      this.$router.push("/board/" + "position" + "/" + position);
    },
    async login() {
      // 判断电话号码的合法性
      if (this.tel.length < 11) {
        this.$message({
          showClose: true,
          message: "请输入正确的电话号码",
          type: "error"
        });
        return;
      }
      let res = await this.$http.post(
        "/user/login",
        qs.stringify({
          tel: this.tel,
          pwd: this.pwd
        })
      );
      if (res.data.exist === true) {
        this.$store.commit("reverseState");
        this.dialogOpen = false;
        this.$message({
          showClose: true,
          message: "登陆成功",
          type: "success"
        });
        this.tel = "";
        this.pwd = "";
        this.$router.push("/infos/" + res.data.id);
      } else {
        this.$message({
          showClose: true,
          message: "密码错误或用户不存在",
          type: "error"
        });
        this.pwd = "";
      }
    },
    async captcha() {
      if (this.tel.length < 11) {
        this.$message({
          showClose: true,
          message: "请输入正确的电话号码",
          type: "error"
        });
        return;
      }
      let resp = await this.$http.post(
        "/api/captcha",
        qs.stringify({ tel: this.tel })
      );
      if (resp.data.exist === true) {
        this.disableCaptcha = true;
        this.timer();
      } else {
        this.$message({
          showClose: true,
          message: "电话号码不正确",
          type: "error"
        });
      }
    },
    timer() {
      if (this.time > 1) {
        this.time--;
        setTimeout(this.timer, 1000);
      } else {
        this.time = 60;
        this.disableCaptcha = false;
      }
    },
    async logout() {
      let res = await this.$http.get("/user/logout");
      if (res.data.exit === true) {
        this.$message({
          showClose: true,
          message: "登出成功",
          type: "success"
        });
        this.$store.commit("reverseState");
      } else {
        this.$router.push("/index");
      }
    },
    async signUp() {
      if (this.telSign.length !== 11) {
        this.$message({
          showClose: true,
          message: "手机号无效",
          type: "error"
        });
        return;
      }
      let resp = await this.$http.post(
        "/user/signup",
        qs.stringify({
          usrName: this.user,
          tel: this.telSign
        })
      );
      let success = resp.data.success;
      if (success === true) {
        this.$message({
          showClose: true,
          message: "注册成功",
          type: "success"
        });
        this.dialogOpen = false;
        this.user = "";
        this.telSign = "";
      } else {
        this.$message({
          showClose: true,
          message: "此手机已用于注册或手机号无效",
          type: "error"
        });
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
  content: ".";
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
#dep-frame {
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
}
.dep-item {
  /* flex: 20%; */
  width: 25%;
  margin: 1vh 1vh 1vh 0;
}
.captcha {
  display: flex;
}
h1 {
  margin: 0;
}
</style>
