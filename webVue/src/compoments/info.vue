<template>
  <div class="banner">
    <el-carousel height="479px" @change="addIndex">
      <el-carousel-item v-for="index in 3" 
                        :key="index" 
                        :style="styleItem(index)" 
                        autoplay
                        interval='2000'>
      </el-carousel-item>
    </el-carousel>
    <div class="middle-box">
      <div class="pictures"
            v-if="teachers.length !== 0"
            v-for="index in teachers.length"
            :key="index"
            v-show="showJudge(index-1)">
        <!-- TODO: 使用一个boolean的数组来判断是否展示这个item，用pictureIndex来记录展示的3个索引 -->
        <img :src="'static/'+teacherInfo(index-1, 'picture')" alt="教师图片" class="avatar">
        <div class="info">
          <div class="texts">
            教师姓名：{{teacherInfo(index-1, 'name')}}
          </div>
          <div class="texts">
            单位：{{teacherInfo(index-1, 'department')}}
          </div>
          <div class="texts">
            学位：{{teacherInfo(index-1, 'degree')}}
          </div>
          <div class="texts">
            职称：{{teacherInfo(index-1, 'position')}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mainBanner",
  data: function() {
    return {
      // 这里使用索引来进行picture的展示
      // 在父组件进行循环的时候，动态的改变三个索引值来改变图像？
      picturesIndex: [0, 1, 2]
    };
  },
  methods: {
    styleItem: function(index) {
      // 此函数用来生成背景的url
      return {
        "background-image":
          "url(" + require("../assets/" + index + ".jpg") + ")",
        "background-size": "100% 100%",
        "background-repeat": "no-repeat"
      };
    },
    teacherInfo: function (index, key) {
      // 获取teacher的信息
      try {
        if (this.$store.state.teachers.length === 0) return
      return this.teachers[index][key]
      } catch (error) {
        console.log(error)
      }
    },
    addIndex:function(path){
      // 跟随carsouel的change触发的函数
      if (this.$store.state.teachers.length === 0) return
      for (let i=0;i<3;i++) {
        this.picturesIndex[i] += 3
        this.picturesIndex[i] %= this.$store.state.teachers.length
      }
    },
    showJudge(index) {
      // 判断是否可以展示
      if (index in this.picturesIndex) return true
      else return false
    }
  },
  computed: {
    teachers: function() {
      if (this.$store.state.teachers.length === 0) return []
      else return this.$store.state.teachers
    },
    showArray: function(picturesIndex) {
      if (this.$store.state.teachers.length === 0) {
        return []
      }
      else {
        let res = []
        for (let i=0;i<this.teachers.length;i++) {
          if (i in this.picturesIndex) res.push(true)
          else res.push(false)
        }
        return res
      }
    }
  }
};
</script>
<style scoped>
.banner {
  background-repeat: no-repeat;
}
.pictures{
  display: flex;
  width: 20%;
  height: 100%;
}
.middle-box {
  display: flex;
  z-index: 10000;
  position: fixed;
  top: 35%;
  height: 200px;
  width: 100%;
  justify-content: space-around;
}
.avatar {
  overflow: hidden;
  width: 100%;
  height: 100%;
  float: left;
}
.info {
  position: absolute;
  bottom: 0%;
  height: 50%;
  width: 20%;
  opacity: 0.9;
  flex-direction: column;
  background: #3d3e3f;
  justify-content: space-between;
}
.texts {
  color: aliceblue;
}
</style>
