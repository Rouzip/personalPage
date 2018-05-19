<template>
  <div class="boarder">
    <div class="aside-board">
      
    </div>
    <div class="main-board">

    </div>
  </div>
</template>
<script>
import qs from "qs";

export default {
  data: function(){
    return {
      isEdit: false, // 判断是否处于编辑状态
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
      console.log(this.teacher)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style scoped>
.border{ 
  display: flex;
  justify-content: flex-start;
}
.aside-board {
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  background: #921c1c;
}
.main-board {
  padding: 5%;
  flex-grow: 4;
  background: #4a0baf;
}
</style>