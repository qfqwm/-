<template>
  <div class="locat">
    <div class="header">
      <div class="table">
        <table>
          <tr>
            <td>姓名:</td>
            <td>{{ data1.stuRealname }}</td>
            <td>学号:</td>
            <td>{{ data1.stuId }}</td>
          </tr>
          <tr>
            <td>院系:</td>
            <td>{{ data1.collegeName }}</td>
            <td>专业:</td>
            <td>{{ data1.proName }}</td>
          </tr>
          <tr>
            <td>年级:</td>
            <td>{{ data1.stuGrade }}</td>
            <td>班级:</td>
            <td>{{ data1.stuClass }}</td>
          </tr>
          <tr>
            <td>辅导员:</td>
            <td>{{ data1.teacherName }}</td>
          </tr>
        </table>
        <el-upload
          class="upload-demo"
          action="http://47.115.216.81:8888/leave/uploadFile"
          :on-change="uploadFile"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          :auto-upload="false"
        >
          <el-button class="down" size="small" type="primary"
            >上传附件</el-button
          >
        </el-upload>
      </div>
      <div class="img">
        <img
          src="../../../public/3.个人信息管理界面/5.个人信息管理系统-请假管理/2.个人信息管理系统-请假管理-详情图标/竖线(1).png"
        />
      </div>
      <div class="context">
        <div>
          <input type="text" placeholder="主题:" v-model="type" />
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

        <input type="text" placeholder="审批人:" class="foot" />
      </div>
    </div>
    <div class="footer">
      <div class="footer-1">
        <el-form>
          <el-form-item>
            <el-button type="primary">
              <img
                src="../../../public/img/changepass/sure.png"
                class="buttonimg"
              />
              <router-link to="/sLeave" @click="test">确定</router-link>
            </el-button>
            <el-button id="reset">
              <img
                src="../../../public/img/changepass/cancle.png"
                class="buttonimg"
              />
              <router-link to="/sLeave">取消</router-link>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { onMounted, reactive, onBeforeMount } from "@vue/runtime-core";
import { add, getsleave } from "@/api/index";
import axios from 'axios';
export default {
  setup() {
    const data1 = reactive({
      stuRealname: "",
      stuId: "",
      collegeName: "",
      proName: "",
      stuGrade: "",
      stuClass: "",
      teacherName: "",
    });
    const route = useRoute();
    const type = ref(); //主题
    const radio3 = ref(""); //请假原因
    const textarea = ref(""); //原因说明
    const value1 = ref(""); //开始时间
    const value2 = ref(""); //结束时间
    const dataTime = ref(""); //申请提交时间
    //定义 timer 初始值及类型
    let timer: NodeJS.Timer | null = null;

    // 当前时间
    const getNowTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month =
        now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
      const date = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`;
      const hour = now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`;
      const minutes =
        now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`;
      const seconds =
        now.getSeconds() >= 10 ? now.getSeconds() : `0${now.getSeconds()}`;
      dataTime.value = `${year}年${month}月${date}日 ${hour}:${minutes}:${seconds}`;
    };

    onMounted(() => {
      loadData1();
    });

    onBeforeMount(() => {
      // 清理定时器要处理 timer 的类型
      clearInterval(Number(timer));
    });

    const object = ref();
    const tableData = ref();
    const getData = function () {
      getsleave(object, localStorage.getItem("student")).then(function (res) {
        data1.stuRealname = res.data.data.leaveList[0].studentInfo.stuRealname;
        data1.stuId = res.data.data.leaveList[0].studentInfo.stuId;
        data1.collegeName = res.data.data.leaveList[0].studentInfo.collegeName;
        data1.proName = res.data.data.leaveList[0].studentInfo.proName;
        data1.stuGrade = res.data.data.leaveList[0].studentInfo.stuGrade;
        data1.stuClass = res.data.data.leaveList[0].studentInfo.stuClass;
        data1.teacherName =
          res.data.data.leaveList[0].studentInfo.projectGroup.projectTeam.project.teacher.teacherName;
      });
    };

    const loadData1 = async function () {
      await getData();
      // console.log(tableData);
      getNowTime();
      timer = setInterval(() => {
        getNowTime();
      }, 1000);
    };
    const test = () => {
      var d1 = new Date(value1.value);
      var time1 =
        d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
      var d2 = new Date(value2.value);
      var time2 =
        d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + d2.getDate();
      var d3 = new Date();
      var time3 =
        d2.getFullYear() + "-" + (d3.getMonth() + 1) + "-" + d3.getDate();
      add(
        data1.stuId,
        time3,
        time1,
        time2,
        radio3.value,
        type.value,
        textarea.value,
        relaventFile.value
      ).then(function (res) {
        console.log(res);
      });
    };

    const relaventFile = ref(""); //上传附件
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
          relaventFile.value = res.data.filePath
        })       
    }

    return {
      value1,
      value2,
      uploadFile,
      type,
      textarea,
      radio3,
      tableData,
      data1,
      route,
      test,
      dataTime,
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
      height: 100px;

      td {
        width: 150px;
        text-align: center;
        font-size: 25px;
        color: #6069fe;

        input {
          width: 200px;
          margin-left: -10px;
          margin-top: 5px;
          border: 1px solid blue;
        }
      }

      td:nth-of-type(2n) {
        color: black;
        font-size: 20px;
      }
    }

    input {
      width: 100px;
      height: 30px;
      margin-left: 50px;
      margin-top: 35px;
      border-radius: 5px;
      // background-color: #888fff;
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
        height: 36px;
        .el-input__inner {
          padding-left: 10px !important;
          height: 36px;
          line-height: 36px;
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
              top: 4px;
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

    .foot {
      margin-top: 20px;
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
      width: 600px;
      height: 400px;
      margin-top: 600px;
      margin-left: 450px;

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
</style>