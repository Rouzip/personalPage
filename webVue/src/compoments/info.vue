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
      <div class="pictures" v-for="teacher in this.$store.state.teachers" 
                            :key="teacher.id">
        <a> </a>
        <span> {{teacher.name}} </span>
        <span> {{ teacher.pisition }} </span>
        <button @click="picGet(teacher.picture)"></button>
        <!-- 这里并不是最后能够编译的 -->
        <img :src="'static/'+teacher.picture" alt="教师图片" class="avatar">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mainBanner",
  data: function() {
    return {
      pictures: [0, 1, 2]
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
    picGet: async function(name) {
      let res = await this.$http.get('/api/photos/'+name)
      let photo = res.data.image
      console.log(photo)
    }
  }
};
</script>
<style scoped>
.banner {
  background-repeat: no-repeat;
}
.pictures{
  position: fixed;
  display: inline-flex;
  width: 30%;
  height: 30%;
}
.middle-box {
  display: flex;
  z-index: 10000;
  position: fixed;
  top: 35%;
  height: 200px;
  width: 100%;
  background: #333333;
}
.avatar {
  overflow: hidden;
  width: 40%;
  height: 40%;
  float: left;
}
</style>
