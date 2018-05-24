<template>
  <div class="boarder">
    <div class="aside-board" v-if="!isEdit">
      <div class="photo-frame"> <img :src="pictureURL" alt="教师头像" class="avatar"> </div>
      <div class="item">{{ '姓名：'+teacher.name }}</div>
      <div class="item">{{ '电话：'+teacher.telephone }}</div>
      <div class="item">{{ '职位：'+teacher.position }}</div>
      <div class="item">{{ 'E-mail：'+teacher.email }}</div>
      <div class="item"> {{ '院系：'+teacher.department }} </div>
      <div class="item"> {{ '学位：'+teacher.degree }} </div>
    </div>
    <div class="aside-edit" v-else>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/api/upload"
        :with-credentials="true"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="test"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-input clearable class="edit-item" v-model="tel" placeholder="电话"></el-input>
      <el-input clearable class="edit-item" v-model="position" placeholder="职位"></el-input>
      <el-input clearable class="edit-item" v-model="email" placeholder="email"></el-input>
      <el-input clearable class="edit-item" v-model="department" placeholder="院系"></el-input>
      <el-input clearable class="edit-item" v-model="degree" placeholder="学位"></el-input>
    </div>
    <div class="main-board" v-if="!isEdit">
      {{teacher.introduce}}
    </div>
    <div class="main-edit" v-else>
      <el-input 
        type="textarea"
        placeholder="请输入自我介绍"
        :rows="13"
        v-model="introduce">
      </el-input>
      <el-button class="save-button" type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
import qs from "qs";

export default {
  data: function() {
    return {
      pictureURL: "/static/",
      teacher: {},
      imageUrl: "", // 用来上传到的图片的url
      tel: "",
      introduce: "",
      degree: "", // 学位
      email: "",
      position: "", // 职位
      department: "" // 院系
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("url is:", this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    test(error, file, filelist) {
      console.log(error);
    }
  },
  computed: {
    isEdit: function() {
      // 判断是否处于编辑状态下
      return this.$store.state.isLog;
    }
  },
  async created() {
    // 获取到现在教师的id
    try {
      let id = this.$router.currentRoute.params.id;
      let response = await this.$http.post(
        "/api/teacher",
        qs.stringify({ id: id })
      );
      this.teacher = response.data;
      this.pictureURL += this.teacher.picture;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
<style scoped>
.boarder {
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
  /* flex-wrap: wrap; */
  justify-content: center;
  display: flex;
  flex: 1;
  background: #606266;
  overflow: hidden;
  height: 100%;
}
.main-board {
  padding: 5%;
  flex: 2;
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
.aside-edit {
  align-items: center;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: center;
  display: flex;
  flex: 1;
  background: #606266;
  overflow: hidden;
  height: 100%;
}
.main-edit {
  padding: 5%;
  flex: 2;
  background: #909399;
  height: 100%;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #c78118;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.edit-item {
  width: 80%;
  margin: 1vh;
}
.save-button {
  margin-top: 5vh;
  margin-left: 45%;
}
</style>