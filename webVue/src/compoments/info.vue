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
    <div class="pictures" v-for="teacher in this.$store.state.teachers" :key="teacher.id">
      <img src="" alt="教师图片" class="avatar">
    </div>
  </div>
</template>
<script>
export default {
  name: "mainBanner",
  data: function() {
    return {
      pictures: []
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
.avatar{

}
</style>
