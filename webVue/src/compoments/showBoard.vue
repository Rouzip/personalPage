<template>
  <div class="board">
    <div class="items">
      <div class="item" v-for="teacher in items" :key="teacher.id" @click="jumpTeacher(teacher.id)">
        <img :src="getImageURL(teacher.picture)" class="avatar">
        <div class="infos">
          <div class="info">{{ '姓名：'+teacher.name }}</div>
          <div class="info">{{ '学位：'+teacher.degree }}</div>
          <div class="info">{{ '院系：'+teacher.department }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      items: []
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    // 异步获取数据，每次路径改变就调用这个函数
    async getData() {
      try {
        let type = this.$router.currentRoute.params.type;
        let group = this.$router.currentRoute.params.group;
        let res = await this.$http.post(
          "/api/teachergroup",
          qs.stringify({
            type: type,
            group: group
          })
        );
        this.items = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    getImageURL(url) {
      return "/" + url;
    },
    jumpTeacher(id) {
      this.$router.push({ path: `/infos/${id}` });
    }
  },
  watch: {
    // 监视路径改变
    $route: "getData"
  }
};
</script>
<style scoped>
.board {
  height: 100%;
  display: flex;
  justify-content: center;
  background: #1d8099;
  text-align: center;
  overflow: auto;
}
.items {
  width: 50%;
  background: #333333;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  /* FIXME:这里使用了内部scrolling，不知道如何扩展到外部，考虑到内部的循环产生item，决定items大小，再决定board大小，board后决定scrolling */
  overflow-y: auto;
}
.item {
  height: 30%;
  width: 100%;
  display: flex;
  margin: 1vh;
}
.avatar:hover {
  border-radius: 100px 100px 100px 100px;
}
.avatar {
  overflow: hidden;
  height: 100%;
  width: 20%;
  border-radius: 100px 800px 100px 100px;
  transition: 1s;
  margin-right: 1vh;
}
.infos {
  padding: 5% 0 10% 0;
  background: #c78118;
  align-items: center;
  justify-content: center;
  border-radius: 100px 800px 100px 100px;
  transition: 1s;
  width: 100%;
}
.info {
  text-align: center;
}
.infos:hover {
  border-radius: 100px 100px 100px 100px;
}
</style>

