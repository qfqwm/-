<template>
  <div class="locat">
    <div class="back"></div>
    <div class="img">
      <el-upload class="upload-demo" 
        accept=".jpg,.png"
        :on-change="uploadFile"
        :auto-upload="false">
        <el-button class="down" size="small" type="primary">上传头像</el-button>
      </el-upload>
    </div>
    <div class="mag">
      <el-span prop="stuRealname"><span>姓名:</span>{{info.stuRealname}}</el-span>
      <el-span prop="stuId"><span>学号:</span>{{info.classesId}}</el-span>
      <el-span prop="stuIdcard"><span>身份证号：</span>{{info.stuIdcard}}</el-span>
    </div>
    <div class="mag1">
      <el-span prop="stuSex"><span>性别：</span>{{info.stuSex}}</el-span>
      <el-span prop="stuEmail"
        ><span>邮箱地址：</span>{{Email}}<img
          src="../../../public/3.个人信息管理界面/1.个人信息管理系统-个人信息管理/3.个人信息管理系统-个人信息管理-修改手机号码图标/修改名字.png"
          @click="changeemail()"
      /></el-span>
      <el-span prop="stuPhone"
        ><span>手机号码：</span>{{phone}}<img
          src="../../../public/3.个人信息管理界面/1.个人信息管理系统-个人信息管理/3.个人信息管理系统-个人信息管理-修改手机号码图标/修改名字.png"
          @click="changephone()"
      /></el-span>
    </div>
    <div class="mag2">
      <el-span prop="collegeName"><span>院系：</span>{{info.collegeName}}</el-span>
      <el-span prop="proName"><span>专业：</span>{{info.proName}}</el-span>
      <el-span prop="stuGrade"><span>年级：</span>{{info.stuGrade}}</el-span>
    </div>
    <div class="mag3">
      <el-span prop="stuClass"><span>班级：</span>{{info.stuClass}}</el-span>
      <el-span prop="teacherName"><span>辅导员：</span>{{info.teacherName}}</el-span>
      <el-span prop="teacherPhone"><span>辅导员电话</span>{{info.teacherPhone}}</el-span>
    </div>
    <div v-show="optType === 1">
      <div class="link">
        <!-- 书签 -->
        <img
          class="bookmark1"
          src="../../../public/3.个人信息管理界面/1.个人信息管理系统-个人信息管理/1.个人信息管理系统-个人信息管理图标/书签1.png"
        />

        <img
          class="bookmark2"
          src="../../../public/3.个人信息管理界面/1.个人信息管理系统-个人信息管理/1.个人信息管理系统-个人信息管理图标/书签2.png"
        />
        <!-- 按钮 -->
        <div class="data">
          <el-table :data="tableData">
            <el-table-column prop="projectName" label="项目名称" />
            <el-table-column prop="groupName" label="小组名称" />
            <el-table-column prop="stuRealname" label="小组成员" />
            <el-table-column prop="groupMember" label="项目角色" />
            <el-table-column prop="isLeader" label="组长" />
            <el-table-column prop="standardHours" label="标准学时  " />
            <el-table-column prop="classHours" label="大学课时" />
            <el-table-column prop="selfStudyHours" label="自习学时" />
          </el-table>
        </div>
        <div class="btn">
          <el-row>
            <el-button
              type="primary"
              size="large"
              plain
              @click="switchOptType1()"
              >实训小组</el-button
            >
            <el-button
              type="primary"
              size="large"
              plain
              @click="switchOptType0()"
              >项目得分</el-button
            >
          </el-row>
        </div>
      </div>
    </div>
    <div v-show="optType === 0">
      <div class="link">
        <!-- 书签 -->
        <img
          class="bookmark1"
          src="../../../public/3.个人信息管理界面/1.个人信息管理系统-个人信息管理/1.个人信息管理系统-个人信息管理图标/书签1.png"
        />
        <img
          class="bookmark2"
          src="../../../public/3.个人信息管理界面/1.个人信息管理系统-个人信息管理/1.个人信息管理系统-个人信息管理图标/书签2.png"
        />
        <!-- 按钮 -->
        <div class="data">
          <el-table :data="tableData1">
            <el-table-column prop="projectName" label="项目名称" />
            <el-table-column prop="groupName" label="小组名称" />
            <el-table-column prop="dailyScore" label="个人得分" />
            <el-table-column prop="groupScore" label="小组得分" />
            <el-table-column prop="rank" label="小组排名" />
            <el-table-column prop="rank" label="小组排行  " />
          </el-table>
        </div>
        <div class="btn">
          <el-row>
            <el-button
              type="primary"
              size="large"
              plain
              @click="switchOptType1()"
              >实训小组</el-button
            >
            <el-button
              type="primary"
              size="large"
              plain
              @click="switchOptType0()"
              >项目得分</el-button
            >
          </el-row>
        </div>
      </div>
    </div>
    <div class="mask" v-show="isshow">
      <!-- 邮箱 -->
      <div class="changeemail" v-show="isemail">
        <h1>修　改　邮　箱</h1>
        <div class="changeemailinput">
          <span>请输入邮箱地址：</span>
          <input type="text" v-model="changeEmail"/>
        </div>
        <el-row class="mb-4">
          <el-button
            type="primary"
            round
            class="el-button"
            @click="changeemailyes()"
          >
            <img
              src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/确定.png"
              style="width: 40px"
            />确认</el-button
          >
          <el-button
            type="primary"
            round
            class="el-button"
            @click="changeemailno()"
          >
            <img
              src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/取消.png"
              style="width: 40px"
            />取消</el-button
          >
        </el-row>
      </div>
      <!-- 手机 -->
      <div class="changeemail" v-show="isphone">
        <h1>修改手机号码</h1>
        <div class="changeemailinput">
          <span>请录入手机号码：</span>
          <input type="text" v-model="changestuphone"/>
        </div>
        <el-row class="mb-4">
          <el-button
            type="primary"
            round
            class="el-button"
            @click="changephoneyes()"
          >
            <img
              src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/确定.png"
              style="width: 40px"
            />确认</el-button
          >
          <el-button
            type="primary"
            round
            class="el-button"
            @click="changephoneno()"
          >
            <img
              src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/取消.png"
              style="width: 40px"
            />取消</el-button
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref } from "vue";
import { onMounted } from "vue";
import { stest, test, xtest,updatephone,updateEmail } from "@/api/index";
import axios from 'axios';
export default {
  setup() {
    onMounted(() => {
      loadData1();
    });
    const tableData = ref();
    const projectId=ref();
    const tableData1 = ref(['']);
    const info=ref({stuPhone:'',teacherPhone:'',stuClass:'',stuGrade:'',collegeName:'',teacherName:'',stuRealname:'',classesId:'',proName:'',stuIdcard:'',stuSex:'',stuEmail:''});
    const Email=ref('');
    const changeEmail=ref('');
    const phone=ref('');
    const changestuphone=ref('');
    const upfile=()=>{
          
    }
    const getData =async function () {
        await test(localStorage.getItem('student')).then(function (res) {
        projectId.value=res.data.data.projectId
        info.value = res.data.data;
        Email.value=info.value.stuEmail;
        phone.value=info.value.stuPhone;
      });
      stest(localStorage.getItem('student'),projectId.value).then(function (res) {
        tableData.value = res.data.data;
        for (var i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].groupMember == "0")
            tableData.value[i].groupMember = "后端";
          if (tableData.value[i].groupMember == "1")
            tableData.value[i].groupMember = "前端";
          if (tableData.value[i].groupMember == "2")
            tableData.value[i].groupMember = "UI";
          if (tableData.value[i].groupMember == "3")
            tableData.value[i].groupMember = "测试";
          if (tableData.value[i].isLeader === "1")
            tableData.value[i].isLeader = "组长"; 
          if (tableData.value[i].isLeader === "0")
            tableData.value[i].isLeader = "成员";
        }
      });
        xtest(localStorage.getItem('student'),projectId.value).then(function (res) {
          tableData1.value[0]=res.data.data
      });
    };
    const uploadFile=(item:any)=>{
        let data = new FormData()
        let file = item.raw
        console.log(file);
        data.append('stuId', '199000101');
        data.append('headImg', file)
        axios({
          url: 'http://47.115.216.81:8888/student/updateImage', //后端提供的接口
          method: 'post',
          data:data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res);
        })
    }
    const loadData1 = async function () {
      await getData();
    };

    //界面切换
    const optType = ref(1);
    // 实训小组
    const switchOptType1 = () => {
      optType.value = 1;
    };
    //项目得分
    const switchOptType0 = () => {
      optType.value = 0;    
    };
    const isshow = ref(false);
    const isemail = ref(false);
    const isphone = ref(false);
    const changeemail = () => {
      isshow.value = true;
      isemail.value = true;
      changeEmail.value=Email.value
    };
    const changephone = () => {
      isshow.value = true;
      isphone.value = true;
      changestuphone.value=phone.value
    };

    const changeemailyes = () => {
      isshow.value = false;
      isemail.value = false;
          updateEmail(localStorage.getItem('student'),changeEmail.value).then(function (res) {
          if(res.data.flag)
          alert("邮箱修改成功！")
          loadData1();    
      });
    };
    const changeemailno = () => {
      isshow.value = false;
      isemail.value = false;
    };
    const changephoneyes = () => {
      isshow.value = false;
      isphone.value = false;
      updatephone(localStorage.getItem('student'),parseInt(changestuphone.value)).then(function (res) {
          if(res.data.flag)
          alert("手机号码修改成功！")
          loadData1();    
      });

    };
    const changephoneno = () => {
      isshow.value = false;
      isphone.value = false;
    };
    return {
      tableData,
      tableData1,
      info,
      optType,
      isshow,
      isemail,
      Email,
      isphone,
      phone,
      projectId,
      changeEmail,
      changestuphone,
      upfile,
      switchOptType1,
      switchOptType0,
      changeemail,
      changeemailyes,
      changeemailno,
      changephone,
      changephoneyes,
      changephoneno,
      uploadFile,
    };
  },
};

function getData() {
  throw new Error("Function not implemented.");
}

function loadData() {
  throw new Error("Function not implemented.");
}
</script>

<style lang="less" scoped>
.locat {
  // overflow: hidden;
  margin-left: 20%;
  // background-color: red;
  // padding-top: 10px;
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/3_02.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}
el-span {
  display: inline-block;
  height: 44px;
  line-height: 44px;
  width: 290px;
  span {
    padding: 0 10px;
    color: #1f10fe;
    font-size: 16px;
    font-weight: 600;
  }
}

.back {
  background-image: url(../../../public/3.个人信息管理界面/1.个人信息管理系统-个人信息管理/1.个人信息管理系统-个人信息管理图标/学生框/学生框有链条（无背景）.png);
  background-size: 100%;
  // margin-left: 20%;
  margin-left: 3%;
  // position:absolute;
  margin-top: -1080px;
  height: 1080px;
  width: 87%;
  background-repeat: no-repeat;
}
.img {
  // margin-left: 20%;
  //  margin-left: 10%;
  //  margin-bottom: 1080px;
  background-size: 100%;
  width: 230px;
  height: 230px;
  background-color: rgb(238, 236, 236);
  border-radius: 50%;
  border: 3px solid #8b81fe;
  position: absolute;
  top: 170px;
  left: 130px;
  // display:flex;
}
.img .el-button {
  position: absolute;
  width: 160px;
  height: 40px;
  bottom: -50px;
  left: 40px;
}
.bookmark1 {
  position: absolute;
  height: 60px;
  top: -20px;
  left: -7px;
}
.bookmark2 {
  position: absolute;
  height: 60px;
  top: -20px;
  left: 20px;
}

.data {
  position: absolute;
  top: 80px;
  left: 45px;
  width: 1050px;
  background-color: rgb(157, 126, 192);
  /deep/.el-table__header {
    width: 1050px !important;
  }
  /deep/.el-scrollbar__view {
    width: 1050px !important;
    .el-table__body {
      width: 1050px !important;
    }
  }
  /deep/.cell {
    text-align: center;
  }
}
.mag {
  // position: relative;float: left;
  // width: 600px;
  // height: 300px;
  // margin-left: 40px;
  // margin-top: 120px;
  position: absolute;
  top: 170px;
  left: 420px;
  width: 880px;
  height: 44px;
  background-color: #eeecf9;
}

.mag1 {
  position: absolute;
  top: 250px;
  left: 420px;
  width: 880px;
  background-color: #eeecf9;
  span{
    margin-right: 0;
    padding-right: 0;
  }
  /deep/img {
    margin-left: 3px;
    vertical-align: middle;
    width: 20px;
  }
}

.mag2 {
  position: absolute;
  top: 330px;
  left: 420px;
  width: 880px;
  height: 44px;
  background-color: #eeecf9;
}
.mag3 {
  position: absolute;
  top: 410px;
  left: 420px;
  width: 880px;
  height: 44px;
  background-color: #eeecf9;
}
.el-button--primary {
  --el-button-bg-color: #c3bdf9;
  --el-button-hover-bg-color: #6168fe;
  border-radius: 10px;
}
.link {
  width: 1160px;
  height: 350px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: 470px;
  left: 130px;
  border: 3px solid #a7a0fd;
  border-radius: 10px;
  background-size: 33px 50px;
  background-repeat: no-repeat;
  background-position-y: -15px;
  // background-position:top left 100px ;
  display: flex;
  .btn {
    width: 480px;
    margin: 22px auto;
  }
  .el-button {
    width: 200px;
    height: 50px;
    margin-left: 0px;
  }
  .el-button:nth-child(1) {
    margin-right: 80px;
  }
}
.mask {
  position: absolute;
  width: 100%;
  height: 1080px;
  z-index: 999;
  top: 0;
  left: 0;
  opacity: 1;
}
.changeemail {
  position: relative;
  top: 18%;
  left: 20%;
  height: 400px;
  width: 800px;
  background: #f7f7f7;
  border-radius: 20px;
  border: 3px solid #ebeafc;
  h1 {
    text-align: center;
    color: #5660fe;
    margin: 30px 0;
  }
  .changeemailinput {
    width: 90%;
    height: 40px;
    background: #fff;
    margin: 0 auto;
    margin-top: 100px;
    border-radius: 30px;
    padding-left: 10px;
    line-height: 40px;
    input {
      height: 40px;
      border: none;
      outline: none;
      border-radius: 30px;
      width: 580px;
      padding-left: 10px;
    }
  }
  .el-row {
    margin: 0 auto;
    margin-top: 50px;
    border-radius: 30px;
    width: 345px;
    .el-button {
      width: 140px;
      height: 60px;
      background-color: #6168fe;
      font-size: 20px;
      span {
        img {
          margin-right: 10px;
        }
      }
    }
    .el-button:nth-of-type(2) {
      margin-left: 60px;
      background-color: #acb0fa;
    }
  }
}
</style>