<template>
  <div class="locat">
    <div class="content">
      <h1>修改密码</h1>
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="mess">
          <span class="pass">当前密码：</span>
          <el-form-item prop="age">
            <el-input
              v-model.number="numberValidateForm.pass"
              @blur="pass()"
              type="password"
            ></el-input>

            <div class="cont-img">
              <img src="../../../public/img/changepass/eye.png" class="imgs" />
            </div>
            <span class="alert">{{ alert.alertpass }}</span>
          </el-form-item>
        </div>

        <div class="mess">
          <span class="pass" id="newword">新密码：</span>
          <el-form-item prop="age">
            <el-input
              v-model.number="numberValidateForm.newpass"
              @blur="newpass()"
              type="password"
            ></el-input>
            <div class="cont-img">
              <img src="../../../public/img/changepass/eye.png" class="imgs" />
            </div>
            <span class="alert">{{ alert.alertnewpass }}</span>
          </el-form-item>
        </div>

        <div class="mess">
          <span class="pass" id="reword">再次输入新密码：</span>
          <el-form-item prop="age">
            <el-input
              v-model.number="numberValidateForm.repass"
              @blur="repass()"
              type="password"
            ></el-input>
            <div class="cont-img">
              <img src="../../../public/img/changepass/eye.png" class="imgs" />
            </div>
            <span class="alert">{{ alert.alertrepass }}</span>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submit()">
            <img
              src="../../../public/img/changepass/sure.png"
              class="buttonimg"
            />
            提交
          </el-button>
          <el-button @click="resets()" id="reset">
            <img
              src="../../../public/img/changepass/cancle.png"
              class="buttonimg"
            />
            取消</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ChangePassword } from "@/api/index";
export default {
  data() {
    return {
      root: 0,
      numberValidateForm: {
        pass: "",
        newpass: "",
        repass: "",
      },
      alert: {
        alertpass: "",
        alertnewpass: "",
        alertrepass: "",
      },
    };
  },
  methods: {
    pass() {
      if (this.numberValidateForm.pass == "") {
        this.alert.alertpass = "密码不能为空！";
      } else {
        this.alert.alertpass = "";
      }
    },
    newpass() {
      if (this.numberValidateForm.newpass == "") {
        this.alert.alertnewpass = "新密码不能为空！";
      } else {
        this.alert.alertnewpass = "";
      }
    },
    repass() {
      if (this.numberValidateForm.newpass != this.numberValidateForm.repass) {
        this.alert.alertrepass = "两次密码不一致！";
      } else {
        this.alert.alertrepass = "";
      }
    },
    submit() {
      if (
        this.numberValidateForm.newpass == this.numberValidateForm.repass &&
        this.numberValidateForm.newpass != ""
      ) {
        ChangePassword(
          localStorage.getItem("admin"),
          this.root,
          this.numberValidateForm.pass,
          this.numberValidateForm.newpass
        ).then(function (res) {
          if (res.data.flag) alert("更新密码成功!");
          else {
            alert("原密码错误!");
          }
        });
      }
    },
    resets() {
      this.numberValidateForm.pass = "";
      this.numberValidateForm.newpass = "";
      this.numberValidateForm.repass = "";
      this.alert.alertpass = "";
      this.alert.alertnewpass = "";
      this.alert.alertrepass = "";
    },
  },
};
</script>

<style lang="less" scoped>
@color1: #706ff9; //3个按钮前面字的颜色
@size: 30px; //3个按钮前面字的大小
@lineh: 60px; //行高
@lih: 80px; //高度（框）
.locat {
  // overflow: hidden;
  margin-left: 20%;
  // background-color: red;
  // padding-top: 10px;
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;
  .content {
    // text-align: center;
    width: 1000px;
    height: 600px;
    // border: 1px solid red;
    position: absolute;
    left: 65%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
h1 {
  padding-bottom: 60px;
  // top:-50px;
  font-size: 40px;
  margin-left: 300px;
  color: @color1;
  font-weight: 700;
}
.mess {
  margin-top: 30px;
  height: @lih;
  // border:1px solid red;
  .pass {
    // 字体
    font-weight: 900;
    position: absolute;
    margin-left: 20px;
    color: @color1;
    font-size: @size;
    line-height: @lineh;
  }

  .cont-img {
    // backgroundcolor: red;
    width: 40px;
    padding-top: 10px;
    // border: 1px solid red;
    .imgs {
      top: 10px;
      width: 40px;
      margin-left: 10px;
    }
  }
}

.el-form-item__label {
  width: 300px;
  margin-left: 300px;
}
.el-input {
  margin-left: 60px;
  width: 500px;
  height: 50px;
  // border:1px solid red;
}
.el-input/deep/.el-input__inner {
  height: 50px;
  border-radius: 20px;
}

.el-form-item__error {
  color: blue;
}
.el-form /deep/ .el-form-item__error {
  margin-top: 10px;
  left: 400px;
  color: blue;
  color: red;
  font-size: 20px;
}
.el-button {
  margin-top: 100px;
  width: 150px;
  height: 50px;
  border-radius: 15px;
  margin-left: 100px;
  font-size: 20px;
}
.buttonimg {
  width: 40px;
}
#reset {
  color: white;
  background: #acb0fa;
}
.alert {
  position: absolute;
  // font-size:17px;
  font-size: 20px;
  bottom: -30px;
  left: 25%;
  color: red;
}
#reword {
  // color:red;
  left: -90px;
}
#newword {
  left: 24px;
}
</style>
