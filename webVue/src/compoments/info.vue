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
      <div class="pictures" v-for="teacher in this.$store.state.teachers" :key="teacher.id">
        <a> </a>
        <span> </span>
        <span> </span>
        <button @click="picGet(teacher.picture)"></button>
        <img src="" alt="教师图片" class="avatar">
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
      photo = res.data.image
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
</style>
