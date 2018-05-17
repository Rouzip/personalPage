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
            v-for="index in 3"
            :key="index">
        <img :src="'static/'+getPic(picturesIndex[index-1])" alt="教师图片" class="avatar">
        <div class="info">
          <div class="texts">
            教师姓名：{{teacherInfo(picturesIndex[index-1], 'name')}}
          </div>
          <div class="texts">
            单位：{{teacherInfo(picturesIndex[index-1], 'department')}}
          </div>
          <div class="texts">
            学位：{{teacherInfo(picturesIndex[index-1], 'degree')}}
          </div>
          <div class="texts">
            职称：{{teacherInfo(picturesIndex[index-1], 'position')}}
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
    getPic: function (index) {
      if (this.$store.state.teachers.length === 0){
        return
      }
      let pictures = []
      this.picturesIndex.forEach(index => {
        pictures.push(this.$store.state.teachers[index].picture)
      })
      return pictures[index]
    },
    teacherInfo: function (index, key) {
      if (this.$store.state.teachers.length === 0) {
        return ''
      }
      return this.$store.state.teachers[index][key]
    },
    addIndex:function(path){
      console.log('触发')
      if (this.$store.state.teachers.length === 0) return
      for (let i=0;i<3;i++) {
        this.picturesIndex[i] += 3
        this.picturesIndex[i] %= this.$store.state.teachers.length
      }
    }
  },
  computed: {
    
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
