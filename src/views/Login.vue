<template>
  <div class="login">
    <div class="banner">
      <div class="ban-left">
        <img class="img-1" src="../../public/img/login/tag.png" />
        <div class="img-par">
          <img class="img-2" src="../../public/icon/1.login/1.png" />
        </div>
        <img class="img-3" src="../../public/icon/1.login/1.gif" />
        <div class="left-bottom">
          <div class="botton-one"><h2>尽责　·　守信　·　求精　·　创新</h2></div>
        </div>
        <div class="botton-two">
          <h3>Dligence.Trustworthiness.Refinement.Innovation</h3>
        </div>
      </div>

      <div class="ban-right">
        <div class="right-1">
          <img class="admin" src="../../public/img/login/admin.png" />
          <span class="right-txt">学生实训考察管理系统</span>
        </div>
        <div class="messages">
          <div class="mess-1">
            <h1>登录</h1>
            <span>Sign in</span>
          </div>
          <div class="mes-form">
            <el-card class="box-card" id="box-card">
              <el-form
                ref="form"
                
                class="demo-form-inline"
              >
                <p class="account">账户：</p>

                <el-form-item prop="user" id="passed">
                  <!-- <img src="../../public/img/login/person.png" class="imgrole" /> -->
                  <el-input v-model="account1" class="phone" />
                  <div class="alerts">
                    <img src="../../public/img/login/alert.png" />
                    <a>账户提示</a>
                  </div>
                </el-form-item>
                <p class="account">密码：</p>
                <el-form-item prop="user" id="pass">
                  <!-- <p>密码：</p> -->
                  <!-- <img src="../../public/img/login/pass.png" class="imgrole" /> -->
                  <el-input v-model="password1" class="phone1" type="password"/>
                  <div class="alerts">
                    <img src="../../public/img/login/pass.png" />
                    <a>忘记密码</a>
                  </div>
                </el-form-item>
                <div class="span">
                  <span class="span-1">温馨提示:</span>
                  <span class="span-2"
                    >初始登陆密码为123456，请及时修改密码</span
                  >
                </div>

                <div class="xuan">
                  <!-- <div> -->
                  <!-- <img src="../../public/img/login/student.png" /> -->
                  <input type="radio" v-model="root1" name="a" value="2" />教师
                  <!-- <span>教师</span> -->
                  <!-- </div>
                  <div> -->
                  <!-- <img src="../../public/img/login/student.png" /> -->
                  <!-- <span>管理员</span> -->
                  <input
                    type="radio"
                    v-model="root1"
                    name="a"
                    value="0"
                  />管理员
                  <!-- </div>
                  <div> -->
                  <!-- <img src="../../public/img/login/student.png" /> -->
                  <!-- <span>学生</span> -->
                  <input type="radio" v-model="root1" name="a" value="1" />学生
                  <!-- </div> -->
                </div>

                <el-form-item>
                  <el-button type="primary" @click="onSubmit" id="login"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
              <p class="lasttxt">
                <span>首次</span>登录/<span>非首次</span>登录
              </p>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, judge } from "@/api/index";

const router = useRouter();
const account1 = ref("");
const root1 = ref("");
const password1 = ref("");

const onSubmit = () => {
  console.log(account1);
  console.log(root1);

  login(account1.value, root1.value).then(function (res) {
    // console.log(1231231245);
    if (res.data.flag == false) {
      alert("账户与权限不匹配，请重新选择！");
    } else {
      judge(account1.value, password1.value, root1.value).then(function (res) {
        if (res.data.flag == true) {
          if (root1.value == "1") {
            localStorage['student']=account1.value
            router.push("/sInfo"); //根据不同角色进入不同页面(要做判定)
          } else if (root1.value == "2") {
            localStorage['teacher']=account1.value
            router.push("/tCourse");
          } else if (root1.value == "0") {
            localStorage['admin']=account1.value
            router.push("/aTeacherInfo");
          } 
        }
        else{
          alert("账户与密码不正确！");
        }

      });
    }
  });
};
</script>
<style scoped lang="less">
@import "../../public/less/login.less";
</style>
