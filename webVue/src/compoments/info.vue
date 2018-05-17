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
            v-show="showArray[index-1]">
        <!-- TODO: 使用一个boolean的数组来判断是否展示这个item，用pictureIndex来记录展示的3个索引 -->
        <!-- FIXME:现在的bug是思路问题，如果把是否在数组中定为函数，无法触发重新判断，但是放在计算属性中，一开始没法初始化 -->
        <!-- 方向1：change事件触发之后，更新pictureIndex，watch更新showArray -->
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
      picturesIndex: [0, 1, 2],
      showArray: [true, true, true, false, false, false]
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
      // 这里只打算展示3张，所以用做三次循环
      for (let i=0;i<3;i++) {
        let newValue = (this.picturesIndex[i] + 3) % this.$store.state.teachers.length
        this.$set(this.picturesIndex, i, newValue)
      }
      // trick 不搞observe，直接用数组
      let tmp = []
      this.picturesIndex.forEach(index=>{
        tmp.push(index)
      })
      // for(const v in tmp)
        console.log(tmp)
      for (let i=0;i<this.teachers.length;i++) {
        if (tmp.indexOf(i) !== -1) {
          console.log(i)
          this.$set(this.showArray, i, true)
          // this.showArray[i] = true
        }
        else {
          this.$set(this.showArray, i, false)
        }
      }
    },
    showJudge(index) {
      // 判断是否可以展示
      if (index in this.picturesIndex) return true
      else return false
    },
    updateShowArray() {
      for (let i=0;i<this.teachers.length;i++) {
        if (i in this.picturesIndex) this.showArray[i] = true
        else this.showArray[i] = false
      }
    }
  },
  computed: {
    teachers: function() {
      if (this.$store.state.teachers.length === 0) return []
      else return this.$store.state.teachers
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
