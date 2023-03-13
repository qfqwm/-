<template>
  <div class="all">
    <div class="top">
      <img src="../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/系统图标.png"/>
      <p>学生实训考勤管理系统</p>
    </div>
    <div class="side-1">
      <img src="../../public/icon/left-icon/jsxxgl.png"/>
      <router-link to="/aTeacherInfo" class="side-1-1">
        <p>教师信息管理</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/icon/left-icon/xsxxgl.png"/>
      <router-link to="/aClStuInfo" class="side-1-1">
        <p>学生信息管理</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/icon/left-icon/xmzgl.png"/>
      <router-link to="/aGroups" class="side-1-1">
        <p>项目组管理</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/icon/left-icon/kcgl.png"/>
      <router-link to="/aCourse" class="side-1-1">
        <p>课程管理</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/icon/left-icon/kqgl.png"/>
      <router-link to="/aAttendance" class="side-1-1">
        <p>考勤管理</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/icon/left-icon/qjjl.png"/>
      <router-link to="/aLeave" class="side-1-1">
        <p>请假记录</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/icon/left-icon/zhdfjl.png"/>
      <router-link to="/aGrade" class="side-1-1">
        <p>综合打分记录</p>
      </router-link>
    </div>
    <div class="side-1">
      <img src="../../public/icon/left-icon/xgmm.png"/>
      <router-link to="/aRevise" class="side-1-1">
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
export default{

}
</script>

<style lang="less" scoped>
*{
  white-space: nowrap;
}
.all{
  width: 20%;
  height: 1080px;
  background-image: url(../../public/icon/2.a/3.png);
  background-repeat: no-repeat;
  background-size: 100%;

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

    img{
      display: flex;
      width: 40px;
      height: 40px;
      float: left;
      margin-left: 70px;
      margin-top: 5px;
      background-color: rgb(48, 50, 99);
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