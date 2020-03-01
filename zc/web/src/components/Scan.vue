<template>
  <div class="scan">
    <el-avatar class="avatar" shape="circle" :size="100" fit="cover" :src="url"></el-avatar>
    <el-card header="验证身份" class="check-card">
      <el-form :model="formData" ref="formData" label-width="100px" @submit.native.prevent="check">
        <el-form-item
          label="身份证号"
          prop="id"
          :rules="[
      { required: true, message: '身份证号码不能为空'},
      { required: true, message: '请填写证件号码', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式有误！',
            trigger: 'blur'
          }
    ]"
        >
          <el-input
            class="check-box"
            type="id"
            v-model="formData.id"
            autocomplete="off"
            placeholder="请输入身份证号码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">提交</el-button>
          <el-button @click="resetForm('formData')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="info">
      <p ref="answer"></p>
    </div>
  </div>
</template>

<script>
let scan = null;
export default {
  name: "Scan",
  data() {
    return {
      formData: {
        id: ""
      },
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  mounted() {
    this.open();
  },
  methods: {
    check() {
      this.$refs["formData"].validate(async valid => {
        if (valid) {
          this.$refs.answer.innerHTML = "正在校验中，请稍后";
          try {
            const res = await this.$http.get(
              `/orders/${this.formData.id}`,
              this.formData
            );
            this.$message({
              message: "校验成功！",
              type: "success"
            });
            this.$refs.answer.innerHTML = `校验成功！</p><p>
          日期：${res.data.date}</p><p>
          车次：${res.data.train}`;
          } catch (err) {
            this.$refs.answer.innerHTML = "校验失败，未查找到您的信息！";
          }
        } else {
          this.$message.error("输入有误，请重试！");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.answer.innerHTML = "";
    },
    open() {
      this.$message({
        message: "欢迎使用校验系统！",
        type: "success"
      });
    }
  }
};
</script>
<style >
.scan {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.avatar {
  box-shadow: 2px 2px 4px rgba(198, 198, 198, 0.8);
}
.check-card {
  width: 85vw;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  background-color: rgba(225, 225, 225, 0.8) !important;
  color: #000000 !important;
}

.info {
  /* border: 1px solid red; */
  height: 25vh;
}
p {
  color: white;
}
</style>
