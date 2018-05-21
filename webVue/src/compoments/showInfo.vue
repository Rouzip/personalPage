<template>
  <div class="boarder">
    <div class="aside-board">
      <div class="photo-frame"> <img :src="pictureURL" alt="教师头像" class="avatar"> </div>
      <div class="item">{{ '姓名：'+teacher.name }}</div>
      <div class="item">{{ '电话：'+teacher.telephone }}</div>
      <div class="item">{{ '职位：'+teacher.position }}</div>
      <div class="item">{{ 'E-mail：'+teacher.email }}</div>
      <div class="item"> {{ '院系：'+teacher.department }} </div>
      <div class="item"> {{ '学位：'+teacher.degree }} </div>
    </div>
    <div class="main-board">
      {{teacher.introduce}}
    </div>
  </div>
</template>
<script>
import qs from "qs";

export default {
  data: function(){
    return {
      pictureURL: '/static/',
      isEdit: false,  // 判断是否处于编辑状态
      teacher: {}
    }
  },
  methods: {
    
  },
  async created () {
    // 获取到现在教师的id
    try {
      let id = this.$router.currentRoute.params.id
      let response = await this.$http.post('/api/teacher', qs.stringify({'id': id}))
      this.teacher = response.data
      this.pictureURL += this.teacher.picture
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style scoped>
.boarder{ 
  display: -webkit-flex;
  display: flex;
  /* justify-content: flex-start; */
  flex-wrap: nowrap;
  height: 479px;
  overflow: hidden;
}
.aside-board {
  /* 这里用来弹性垂直居中 */
  /* http://justcode.ikeepstudying.com/2015/10/css3-flexbox%E8%BD%BB%E6%9D%BE%E5%AE%9E%E7%8E%B0%E5%85%83%E7%B4%A0%E7%9A%84%E6%B0%B4%E5%B9%B3%E5%B1%85%E4%B8%AD%E5%92%8C%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD/ */
  align-items: center;
  flex-direction: column;
  justify-content: center;
  display: flex;
  flex-grow: 1;
  background: #606266;
  overflow: hidden;
  height: 100%;
}
.main-board {
  padding: 5%;
  flex-grow: 1;
  background: #909399;
  height: 100%;
}
.photo-frame {
  margin: 20% 10% 20% 10%;
  width: 30%;
  height: 20%;
  overflow: hidden;
  border-radius: 100px;
}
.avatar {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.item {
  text-align: center;
}
</style>