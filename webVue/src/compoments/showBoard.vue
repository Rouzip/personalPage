<template>
  <div class="board">
    <div class="items">
      <div class="item" v-for="teacher in items" :key="teacher.id">
        {{teacher.id}}
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
        console.log();
        this.items = res.data;
      } catch (error) {
        console.log(error);
      }
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
  height: 479px;
  display: flex;
  justify-content: center;
  background: #1d8099;
  text-align: center;
}
.items {
  width: 60%;
  background: #333333;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item {
  height: 30%;
  width: 100%;
}
</style>

