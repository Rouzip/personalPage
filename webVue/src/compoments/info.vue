<template>
  <div class="banner">
    <el-carousel height="479px">
      <el-carousel-item v-for="index in 3" 
                        :key="index" 
                        :style="styleItem(index)" 
                        autoplay
                        interval='1000'>
      </el-carousel-item>
    </el-carousel>
    <div class="middle-box">
      <div class="pictures"
            v-for="index in 3"
            :key="index">
        <img :src="'static/'+getPic(index-1)" alt="教师图片" class="avatar">
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
  display: -webkit-inline-flex;
  width: 30%;
  height: 100%;
}
.middle-box {
  display: flex;
  z-index: 10000;
  position: fixed;
  top: 35%;
  height: 200px;
  width: 100%;
  background: #333333;
  justify-content: space-between;
}
.avatar {
  overflow: hidden;
  width: 100%;
  height: 100%;
  float: left;
}
</style>
