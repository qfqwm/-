<template>
  <div class="locat">
    <div class="header">
      <div class="table">
        <table>
          <tr>
            <td>姓名:</td>
            <td>{{data1.stuRealname}}</td>
            <td>学号:</td>
            <td>{{data1.stuId}}</td>
          </tr>
          <tr>
            <td>院系:</td>
            <td>{{data1.collegeName}}</td>
            <td>专业:</td>
            <td>{{data1.proName}}</td>
          </tr>
          <tr>
            <td>年级:</td>
            <td>{{data1.stuGrade}}</td>
            <td>班级:</td>
            <td>{{data1.stuClass}}</td>
          </tr>
          <tr>
            <td>辅导员:</td>
            <td>{{data1.teacherName}}</td>
          </tr>
        </table>
        <el-upload class="upload-demo" 
        action="http://47.115.216.81:8888/leave/uploadFile" 
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false">
        <el-button class="down" size="small" type="primary">查看附件</el-button>
      </el-upload>
      <p class="p"><a :href="'http://' + data1.relaventDocuments"  target="_blank" rel="noopener noreferrer">请假证明</a></p>
        <span>流程管理</span>
      </div>
      <div class="img">
        <img
          src="../../../public/3.个人信息管理界面/5.个人信息管理系统-请假管理/2.个人信息管理系统-请假管理-详情图标/竖线(1).png"
        />
      </div>
      <div class="context">
        <div>
          <input type="text" placeholder="主题:" v-model="type"/>
        </div>
        <!-- 选择日期 -->
        <div>
          <div class="demo-date-picker">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择开始日期:"
              />
            </div>
            <div class="block">
              <el-date-picker
                v-model="value2"
                type="date"
                placeholder="选择结束日期:"
              />
            </div>
          </div>
        </div>

        <!-- 请假原因 -->
        <div class="qinjia">
          <div>
            <span>请假原因:</span>
          </div>
          <div>
            <div style="margin-top: 10px">
              <el-radio-group v-model="radio3" size="small">
                <el-radio-button label="病假" />
                <el-radio-button label="事假" style="margin-left: 20px" />
                <el-radio-button label="其他" style="margin-left: 20px" />
              </el-radio-group>
            </div>
          </div>
          <div class="qinjia-1">
            <el-input v-model="textarea" :rows="2" type="textarea" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="showdata">
        <el-table :data="tableData">
          <el-table-column prop="date" label="操作人" />
          <el-table-column prop="name" label="操作事项" />
          <el-table-column prop="address" label="事项状态" />
          <el-table-column prop="address1" label="操作时间" />
          <el-table-column prop="address2" label="说明" />
        </el-table>
      </div>

      <div class="footer-1">
        <el-form>
          <el-form-item>
            <el-button type="primary">
              <img
                src="../../../public/img/changepass/sure.png"
                class="buttonimg"
              />
              <router-link to="/tLeave" @click="yes">审批通过</router-link>
            </el-button>
            <el-button type="primary">
              <img
                src="../../../public/img/changepass/sure.png"
                class="buttonimg"
              />
              <router-link to="/tLeave" @click="no">审批不通过</router-link>
            </el-button>
            <el-button id="reset">
              <img
                src="../../../public/img/changepass/cancle.png"
                class="buttonimg"
              />
              <router-link to="/tLeave">返回</router-link>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref } from "vue";
import { useRoute } from 'vue-router';
import { onMounted, reactive } from "@vue/runtime-core";
import { revise1 } from "@/api/index";
import axios from 'axios';
export default {
  setup() {
    const data1 = reactive({stuRealname:"",stuId:"",collegeName:"",proName:"",stuGrade:"",stuClass:"",teacherName:"",relaventDocuments:""})
    const route = useRoute()
        onMounted(() => {
         console.log(JSON.parse(route.params.stuId.toString()));
        data1.stuRealname = JSON.parse(route.params.stuId.toString()).studentInfo.stuRealname
        data1.stuId = JSON.parse(route.params.stuId.toString()).studentInfo.stuId
        data1.collegeName = JSON.parse(route.params.stuId.toString()).studentInfo.collegeName
        data1.proName = JSON.parse(route.params.stuId.toString()).studentInfo.proName
        data1.stuGrade = JSON.parse(route.params.stuId.toString()).studentInfo.stuGrade
        data1.stuClass = JSON.parse(route.params.stuId.toString()).studentInfo.stuClass
        data1.teacherName = JSON.parse(route.params.stuId.toString()).studentInfo.projectGroup.projectTeam.project.teacher.teacherName
        data1.relaventDocuments = JSON.parse(route.params.stuId.toString()).relaventDocuments
        type.value = JSON.parse(route.params.stuId.toString()).leaveReason
        radio3.value = JSON.parse(route.params.stuId.toString()).leaveType
        value1.value = JSON.parse(route.params.stuId.toString()).startTime
        value2.value = JSON.parse(route.params.stuId.toString()).endTime
        textarea.value = JSON.parse(route.params.stuId.toString()).leaveDetails
        ren.value = JSON.parse(route.params.stuId.toString()).studentInfo.projectGroup.projectTeam.project.teacher.teacherName
        leaveId.value = JSON.parse(route.params.stuId.toString()).leaveId;
        leaveStatus.value = JSON.parse(route.params.stuId.toString()).leaveStatus
    });
    const type = ref("")  //主题
    const radio3 = ref(""); //请假原因
    const textarea = ref("");  //原因说明
    const value1 = ref("");  //开始时间
    const value2 = ref("");  //结束时间
    const ren = ref("");  //审批人
    const leaveId = ref(""); //leaveId
    const leaveStatus = ref("");  //审批状态
    const tableData = [
      {
        date:JSON.parse(route.params.stuId.toString()).studentInfo.projectGroup.projectTeam.project.teacher.teacherName,
        name:JSON.parse(route.params.stuId.toString()).leaveType,
        address:JSON.parse(route.params.stuId.toString()).leaveReason,
        address1:JSON.parse(route.params.stuId.toString()).endTime,
        address2:''
      }
    ];

    const yes=()=>{
      leaveStatus.value='1';
      revise1(leaveId.value,leaveStatus.value).then(function(res){
        console.log(res);
      })
    }

    const no=()=>{
      leaveStatus.value='2';
       revise1(leaveId.value,leaveStatus.value).then(function(res){
        console.log(res);
      })
    }

    const relaventDocuments = ref(""); //上传附件
        const uploadFile=(item:any)=>{
        let data = new FormData()
        let file = item.raw
        console.log(file);
        data.append('file', file)
        axios({
          url: 'http://47.115.216.81:8888/leave/uploadFile', 
          method: 'post',
          data:data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res.data.filePath);
          relaventDocuments.value = res.data.filePath
        })       
    }

    return {
      uploadFile,
      value1,
      value2,
      textarea,
      radio3,
      tableData,
      data1,
      leaveId,
      type,
      leaveStatus,
      yes,
      no
    };
  },
};
</script>

<style lang="less" scoped>
.locat {
  overflow: hidden;
  margin-left: 20%;
  // background-color: red;
  // padding-top: 10px;
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;

  .table {
    float: left;
    width: 600px;
    height: 300px;
    margin-left: 40px;
    margin-top: 120px;

    tr {
      width: 600px;
      height: 50px;

      td {
        width: 150px;
        text-align: center;
        font-size: 25px;
        color: #6069fe;
      }

      td:nth-of-type(2n){
        color: black;
        font-size: 20px;
      }
    }

    input {
      width: 100px;
      height: 30px;
      margin-left: 50px;
      margin-top: 20px;
      border-radius: 5px;
      background-color: #888fff;
      border: none;
    }

    span {
      line-height: 70px;
      margin-left: 50px;
      font-size: 25px;
      color: #6069fe;
    }
  }

  .img {
    float: left;
    margin-top: 120px;
    margin-left: 100px;
    width: 10px;
    height: 300px;

    img {
      height: 300px;
    }
  }

  .context {
    float: left;
    margin-top: 120px;
    margin-left: 100px;

    input {
      margin-left: 20px;
      width: 460px;
      height: 30px;
      border-radius: 10px;
      border: 0.5px solid #6069fe;
    }

    .demo-date-picker {
      display: flex;
      width: 100%;
      padding: 0;
      flex-wrap: wrap;
    }
    .demo-date-picker .block {
      padding: 30px 0;
      text-align: center;
      flex: 1;
      margin-left: 20px;
      /deep/.el-input {
        width: 197px;
        height: 38px;
        .el-input__inner {
          height: 38px;
          line-height: 38px;
          border-radius: 20px;
          --el-input-border-color: none;
        }
        .el-input__prefix {
          display: none;
        }
        .el-input__suffix {
          width: 28px;
          background: url("../../../public/3.个人信息管理界面/5.个人信息管理系统-请假管理/1.个人信息管理系统-请假管理图标/日期.png")
            no-repeat;
          background-size: 28px 28px;
          background-position: 0 5px;
          .el-input__suffix-inner {
            i {
              top: 5px;
              left: -28px;
              position: absolute;
              width: 28px;
              height: 28px;
            }
            .el-icon svg {
              height: 1.5em;
              width: 1.5em;
            }
          }
        }
      }
    }
    .demo-date-picker .block:last-child {
      border-right: none;
    }
    .demo-date-picker .demonstration {
      display: block;
      color: var(--el-text-color-secondary);
      font-size: 14px;
      margin-bottom: 20px;
    }

    .qinjia {
      margin-left: 20px;
      width: 460px;
      height: 300px;

      span {
        font-size: 20px;
        color: #6069fe;
      }

      .el-radio-button /deep/ .el-radio-button__inner {
        width: 80px;
        height: 20px;
        border-radius: 10px;
        text-align: center;
        line-height: 8px;
      }

      .qinjia-1 {
        margin-top: 10px;

        .el-textarea /deep/ .el-textarea__inner {
          height: 100px;
          border: 0.5px solid #6069fe;
          border-radius: 10px;
        }
      }
    }
  }

  .footer {
    // 列表栏
    .showdata {
      position: absolute;
      top: 235px;
      margin-top: 200px;
      .el-table {
        margin-left: 36px;
        width: 1473px;
      }
    }
    /deep/thead tr {
      height: 80px;
      color: #fff;
      th:nth-child(n) {
        background: #6168fe;
        text-align: center;
      }
      th:nth-child(1) {
        border-top-left-radius: 20px;
      }
      th:last-child {
        border-top-right-radius: 20px;
      }
    }
    /deep/.el-table__row td {
      background: #f2f2fc;
      text-align: center;
      height: 70px;
    }
    /deep/.el-table__row:last-child {
      td:nth-child(1) {
        border-bottom-left-radius: 20px;
      }
      td:last-child {
        border-bottom-right-radius: 20px;
      }
    }

    .footer-1 {
      width: 800px;
      height: 600px;
      margin-top: 600px;
      margin-left: 300px;

      .el-button {
        margin-top: 100px;
        width: 150px;
        height: 50px;
        border-radius: 15px;
        margin-left: 100px;
        font-size: 20px;
        background-color: #888fff;
      }

      a {
        text-decoration: none;
        color: #fff;
      }

      .buttonimg {
        width: 40px;
      }
    }
  }
}
.upload-demo{
  margin-left: 40px;
}
.p{
  margin-left: 40px;
}
</style>