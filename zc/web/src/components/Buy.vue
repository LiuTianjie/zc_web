<template>
  <div class="buy" v-loading.fullscreen.lock="loading">
    <el-card header="购买车票（模拟）" class="check-card">
      <el-form :model="formData" ref="formData" label-width="100px" @submit.native.prevent="check">
        <el-form-item
          label="身份证号"
          prop="user"
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
            type="user"
            v-model="formData.user"
            autocomplete="off"
            placeholder="请输入身份证号码"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="date"
          label="选择日期"
          :rules="[{ required: true, message: '日期不能为空',trigger: 'blur'}]"
        >
          <el-date-picker
            :editable="false"
            v-model="formData.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item
          label="选择车次"
          prop="train"
          readonly="true"
          :rules="[{ required: true, message: '车次不能为空',trigger: 'blur'}]"
        >
          <el-select v-model="formData.train" placeholder="请选择" type="trian">
            <el-option
              v-for="item in formData.options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="选择座位"
          prop="set"
          readonly="true"
          :rules="[{ required: true, message: '座位不能为空',trigger: 'blur'}]"
        >
          <el-select v-model="formData.set" placeholder="请选择" type="set">
            <el-option
              v-for="item in formData.sets"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
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
export default {
  data() {
    return {
      loading: false,
      formData: {
        user: "",
        date: "",
        train: "",
        set: "",
        options: [
          {
            value: "选项1",
            label: "北京-南京"
          },
          {
            value: "选项2",
            label: "太原-成都"
          },
          {
            value: "选项3",
            label: "太原-海口"
          }
        ],
        sets: [
          {
            value: 1,
            label: "1"
          },
          {
            value: 2,
            label: "2"
          }
        ]
      }
    };
  },
  methods: {
    check() {
      let that = this;
      this.$refs["formData"].validate(async valid => {
        if (valid) {
          this.$refs.answer.innerHTML = "购票中，请稍后";
          this.loading = true;
          try {
            const res = await this.$http.post("/orders", this.formData);
            setTimeout(() => {
              this.loading = false;
              this.$message({
                message: "购票成功！",
                type: "success"
              });
            }, 500);
            this.resetForm("formData");
            this.$refs.answer.innerHTML = `购票成功！</p><p>
          日期：${res.data.date}</p><p>
          车次：${res.data.train}</p><p>
          座位：${res.data.set}`;
          } catch (err) {
            setTimeout(() => {
              this.loading = false;
              this.$refs.answer.innerHTML = "购票失败！";
            }, 500);
          }
        } else {
          this.$message.error("输入有误，请重试！");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.answer.innerHTML = "购票失败！";
    },
    open() {
      this.$message({
        message: "欢迎使用购票系统！",
        type: "success"
      });
    }
  },
  mounted() {
    this.open();
  }
};
</script>

<style>
.buy {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.info {
  /* border: 1px solid red; */
  height: 15vh;
}
p {
  color: white;
}

.check-card {
  padding: 0;
  width: 80vw;
}
</style>