<template>
  <div class="all">
    <div class="top">
      <img src="../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/系统图标.png"/>
      <p>学生实训考勤管理系统</p>
    </div>
    <div class="side-1">
      <img src="../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/1.个人信息管理.png"/>
      <router-link to="/tCourse" class="side-1-1">
        <p>项目课程表</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2.项目课程表.png"/>
      <router-link to="/tIssued" class="side-1-1" @click="secondNav()">
        <p>作业管理</p>
      </router-link>
      <!-- <div class="tIssued">
        <img src="../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2.项目课程表.png"/>
        <router-link to="/tIssued" class="">
          <p>下发作业</p>
        </router-link>
      </div> -->
      <!-- <div class="tIssued">
        <img src="../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2.项目课程表.png"/>
        <router-link to="/tApproval" class="">
          <p>作业审批</p>
        </router-link>
      </div> -->
    </div>
    <div class="side-1">
      <img src="../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/3.作业管理.png"/>
      <router-link to="/tAttendance" class="side-1-1">
        <p>考勤管理</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/icon/left-icon/qjjl.png"/>
      <router-link to="/tLeave" class="side-1-1">
        <p>请假管理</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/icon/left-icon/zhdfjl.png"/>
      <router-link to="/tGrade" class="side-1-1">
        <p>综合打分</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/6.修改密码.png"/>
      <router-link to="/tRevise" class="side-1-1">
        <p>修改密码</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/icon/4.t/2.t-z/t-z(2)/t-z-p(2)/确定.png"/>
      <router-link to="/" class="side-1-1">
        <p>退出登录</p>
      </router-link>
    </div>
  </div>
</template>


<script lang='ts'>
import { reactive, ref } from "@vue/reactivity";

export default{
  setup(){

    return{

    }
  }

}
</script>

<style lang="less" scoped>
*{
  white-space: nowrap;
}
.all{
  width: 20%;
  height: 1080px;
  background-image: url(../../public/icon/4.t/1.png);
  background-repeat: no-repeat;
  background-size: 100%;

  // :nth-child(3){
  //   margin-bottom: 80px;
  // }

  .top{
    width: 100%;
    height: 120px;

    img{
      display: flex;
      width: 50px;
      height: 50px;
      float: left;
      margin-top: 30px;
    }

    p{
      font-size: 25px;
      color: white;
      text-align: center;
      white-space: nowrap;
      letter-spacing: 2px;
      padding-top: 40px;
    }
  }

  .side-1{
    width: 100%;
    height: 50px;
    margin-top: 10px;

    // .tIssued{
    //   width: 100%;
    //   height: 50px;
    //   margin-top: 10px;
    // }

    img{
      display: flex;
      width: 40px;
      height: 40px;
      float: left;
      margin-left: 70px;
      margin-top: 5px;
      background-color: rgb(42, 43, 86);
      border-radius: 5px;
    }

    .side-1-1{
      text-decoration: none;
    }

    p{
      width: 80%;
      font-size: 20px;
      color: white;
      text-align: center;
      letter-spacing: 5px;
      padding-top: 10px;  
    }
  }
}
</style>