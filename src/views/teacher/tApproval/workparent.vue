<script></script>
<template>

  <div class="locat">
  <div class="works">
  <el-button><router-link to="/dowork/doworks">作业任务</router-link></el-button>
  <el-button><router-link to="/dowork/works">学生答题</router-link></el-button>
  <el-button><router-link to="/dowork/correct">教师批改</router-link></el-button>
  <el-button class="backs"><router-link to="/dotask/back">返回列表</router-link></el-button>

  <router-view />
 </div>
  </div>

 
</template>
<style scoped lang="less">

.locat{
 
  margin-left: 20%;
 
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
a{
   text-decoration:none;
}
.el-button{ 
    margin-top:120px;
 
    width:150px;
    height:40px;
      margin-left:70px;
}
.backs{ 
    margin-left:600px;
  
  
}

// .works{ 
//     margin-top:100px;
// }
</style>
