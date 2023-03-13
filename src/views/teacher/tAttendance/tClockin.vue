<template>
  <div class="locat">

      <!-- 按钮 -->
    <el-row>
      <el-button type="primary" size="large">
      <router-link to="/tAttendance">考勤记录</router-link>
      </el-button>
      <el-button type="primary" size="large">
      <router-link to="/tClockin">门禁考勤记录</router-link>
      </el-button>
    </el-row> 
     
      <div class="header">
      <div class="block">
        <span>日期：</span>
        <el-date-picker v-model="value1" type="date" :default-value="new Date(2010, 9, 1)" />
      </div>
      <div class="block">
        <span>学号：</span>
        <el-input v-model="stuid" />

      </div>
      <div class="block">
        <span>学员姓名：</span>
        <el-input v-model="name1" />
      </div>
   <div class="Icon">
        <el-button @click="test">查询</el-button>
      </div>
      <div class="Icon">
        <el-button @click="reset">重置</el-button>
      </div>

    <div class="showdata">
      <el-table
        :data="tableData"
        :header-cell-style="{ color: '#FFF', background: '#6168fe' }"
      >
        <el-table-column prop="pdate" label="日期" />
        <el-table-column prop="stuId" label="学号" />
        <el-table-column prop="stuName" label="姓名" />
        <el-table-column prop="signInTime" label="签到时间" />
        <el-table-column prop="signOutTime" label="签退时间" />
        <el-table-column prop="signPlace" label="打卡设备" />
      </el-table>
    </div>
  </div>
  </div>
</template>
 
<script lang='ts'>
import {gettClockin} from "@/api/index";
import { onMounted} from "vue";
import axios from "axios";
import { ref,reactive } from "vue";
export default {
  setup() {
  
 const stuid = ref("");
    const name1 = ref("");

    const entryname = [
      {
        value: "consistency",
        label: "已批复",
      },
      {
        value: "feedback",
        label: "未批复",
      },
      {
        value: "qad",
        label: "待批复",
      },
    ];
    const attendancetype  = [
      {
        value: "normol",
        label: "正常",
      },
      {
        value: "feedback",
        label: "请假",
      },
      {
        value: "feedback",
        label: "请假",
      },
       {
        value: "leave",
        label: "早退",
      },
    ];
    
 
   
      onMounted(() => {
        loadData();
  
    });
    const object = reactive({ 
          stuId: "",
          stuName:""

       
       })
    //查询
    const test = () => {
  
          object.stuId = stuid.value;
          object.stuName = name1.value;

   
        loadData()

    }
    // 重置
    const reset = () => {
 
        stuid.value = "",
        object.stuId = "",
        object.stuName = "",
        name1.value="",
        getData()
    }
    const loadData= async function () {
        await getData();
      };
    const tableData : any  = ref();

    const getData = function () {
      axios;
          gettClockin().then(function (res) {
               if (res.data.flag == false) {
          return tableData.value = []
        }
              
          tableData.value = res.data.data.records.list;
          
            });
    }
    return {
      attendancetype,
      entryname,
      tableData,
      stuid,
      name1,
      test,
      reset
  
    };
  },
};
</script>

<style lang="less" scoped>
.locat {
  overflow: hidden;
  margin-left: 20%;
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;



  //  按钮
  .el-button {
    width: 230px;
    height: 54px;
    border-radius: 10px;
    margin-right: 50px;

    span {
      a {
        color: #edeeff;
        text-decoration: none;
        font-size: 30px;
      }
    }
  }

  .down {
    width: 100px;
    height: 30px;
    margin-left: 45px;
  }


  .el-button--primary:nth-child(1) {
    --el-button-bg-color: #6168fe;
    --el-button-hover-bg-color: #6168fe;
  }

  .el-button--primary:nth-child(2) {
    --el-button-bg-color: #acb0fa;
    --el-button-hover-bg-color: #acb0fa;
  }

  .Icon .el-button {
    width: 58px;
    height: 30px;
    padding: 8px 15px;
    border-radius: 0px;
    margin-top: 5px;


  }


  .el-row {
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    justify-content: center;
    padding-top: 40px;
  }

  .header {
    margin-top: 40px;
    width: 100%;
    display: flex;
  }

  .header>div {
    padding-left: 0px;
  }

  .header-1 {
    margin-top: 10px;
    margin-left: -10px;
    width: 100%;
    display: flex;
  }

  .header-1>div {
    padding-left: 0px;
  }

  .demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
  }

  .demo-date-picker .block:last-child {
    border-right: none;
  }

  .el-date-editor .el-input,
  .el-date-editor.el-input__inner {
    width: var(--el-date-editor-width);
  }

  .demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }

  .block {
    margin-left: 45px;
    width: 120px;
    padding-right: 40px;
    background: #fff;
  }

  .blockTask {
    margin-left: 40px;
    width: 250px;
    height: 38px;
    background: #fff;
    border-radius: 20px;
    padding-left: 10px !important;
  }

  .blockwork {
    margin-left: 50px;
    width: 240px;
    height: 38px;
    background: #fff;
    border-radius: 20px;
    padding-left: 10px !important;
  }

  .blockteacher {
    margin-left: 45px;
    width: 250px;
    height: 38px;
    background: #fff;
    border-radius: 20px;
    padding-left: 10px !important;
  }

  .selctbtn {
    margin-left: 30px;
  }

  .startbtn {
    margin-left: 20px;
  }

  .addbtn {
    margin-left: 20px;

    a {
      text-decoration: none;
      color: gray;
    }
  }

  .showdata {
    width: 1473px;
    // height: 50%;
    margin-left: 36px;
    margin-top: 65px;

    a {
      text-decoration: none;
      color: blue;
    }
  }

  // 列表栏
  .showdata {
    position: absolute;
    margin-left: 45px;
    margin-top: 50px;

    .el-table {
      width: 1435px;
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
  }

  /deep/.el-table__row:last-child {
    td:nth-child(1) {
      border-bottom-left-radius: 20px;
    }

    td:last-child {
      border-bottom-right-radius: 20px;
    }
  }


  .block {
    height: 38px;
    padding-left: 10px;
    border-radius: 20px;
    margin-left: 36px;
    width: 230px !important;
    padding-right: 80px !important;
    padding-left: 5px !important;

    /deep/.el-date-editor {
      --el-input-hover-border-color: none;
      --el-input-focus-border-color: none;
    }

    /deep/.el-input {
      width: 230px;
      height: 38px;

      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
        width: 230px !important;
        --el-input-border-color: none;
      }

      .el-input__suffix {
        width: 28px;
        background: url("../../../../public/3.个人信息管理界面/5.个人信息管理系统-请假管理/1.个人信息管理系统-请假管理图标/日期.png") no-repeat;
        background-size: 28px 28px;
        background-position: 0 5px;

        .el-input__suffix-inner {
          i {
            top: 4px;
            left: -28px;
            position: absolute;
            width: 28px;
            height: 28px;
            background: none;
          }

          .el-icon svg {
            height: 1.5em;
            width: 1.5em;
          }
        }
      }

      .el-input__prefix {
        display: none;
      }
    }
  }

  .blockTask {
    /deep/.el-input {
      --el-input-hover-border-color: none;
      --el-color-primary: none;
    }

    /deep/.el-input__inner {
      height: 38px;
      width: 120px;
      line-height: 38px;
      border-radius: 0 20px 20px 0;
      --el-input-border-color: none;
    }

    /deep/i svg path {
      display: none;
    }
  }

  .blockwork {
    /deep/.el-input {
      --el-input-hover-border-color: none;
      --el-color-primary: none;
    }

    /deep/.el-input__inner {
      height: 38px;
      width: 140px;
      line-height: 38px;
      border-radius: 0 20px 20px 0;
      --el-input-border-color: none;
    }

    /deep/i svg path {
      display: none;
    }
  }

  .blockteacher {
    /deep/.el-input {
      display: inline-block;
      --el-input-hover-border-color: none;
      --el-input-focus-border-color: none;
      width: 40px;

      .el-input__inner {
        height: 38px;
        // width: 230px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
        --el-input-border-color: none;
      }
    }
  }

  // 删除elenmt下拉框自带的小箭头 换自定义图片
  /deep/.el-input__suffix-inner i.el-icon {
    /*很关键：将默认的select选择框样式清除*/
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 14px;
    /*自定义图片*/
    background: url("../../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/下拉2.png") no-repeat scroll right center transparent;
    /*自定义图片的大小*/
    background-size: 28px 28px;
    left: 50px;
  }

  // /deep/i svg path {
  //   display: none;
  // }
  /deep/.el-select .el-input .el-select__caret.el-icon {
    z-index: 2;
  }

  .el-table {
    border-radius: 20px;
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

  /deep/.el-table__row .el-table_2_column_8 {
    background: #f2f2fc;
  }

  /deep/.el-table__row .el-table_2_column_14 {
    background: #f2f2fc;
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
}
</style>