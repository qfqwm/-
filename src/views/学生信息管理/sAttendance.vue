<template>

  <div class="locat">

    <!-- 按钮 -->
    <el-row>
      <el-button type="primary" size="large">
        <router-link to="/sAttendance">考勤记录</router-link>
      </el-button>
      <el-button type="primary" size="large">
        <router-link to="/ClockIn">打卡记录</router-link>
      </el-button>
    </el-row>

    <!-- 搜索栏 -->
    <div class="SearchBar">
      <!-- 日期 -->
      <div class="Search">
        <span>日期：</span>
        <el-date-picker v-model="value" type="date" placeholder="选择日期" format="YYYY/MM/DD" value-format="YYYY-MM-DD">
        </el-date-picker>
      </div>
      <!-- 项目名称 -->
      <div class="Search">
        <span>项目名称：</span>
        <el-select v-model="entryname" clearable placeholder="请选择">
          <el-option v-for="item in entrynames" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <!-- 考勤 -->
      <div class="Search">
        <span>考勤情况：</span>
        <el-select v-model="attendancelist" clearable placeholder="请选择">
          <el-option v-for="item in attendancelists" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="Icon">
        <el-button @click="test">查询</el-button>
      </div>
      <div class="Icon">
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
    <!-- 数据展示 -->
    <div class="showdata">
      <el-table :data="tableData">
        <el-table-column prop="attendanceDate" label="日期" />
        <el-table-column prop="stuId" label="学号" />
        <el-table-column prop="stuRealname" label="姓名" />
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="practicalTeachers" label="实训老师" />
        <el-table-column prop="attendanceStatus" label="考勤情况" />
        <el-table-column prop="responsibleTeacher" label="责任老师" />
        <el-table-column prop="signInTime" label="签到时间" />
        <el-table-column prop="signOutTime" label="签退时间" />
        <el-table-column prop="realSignInTIme" label="实际签到" />
        <el-table-column prop="signOutTime" label="实际签退" />
      </el-table>
    </div>
  </div>

</template>

<script lang='ts' >

import { ref, reactive } from "vue";
import { getsAttendance } from "@/api/index";
import { onMounted } from "vue";
import axios from "axios";


export default {
  setup() {
    // 搜索

    //1.项目名称逻辑编写
    const entryname = ref('')
    const entrynames = [
      {
        value: "java实训项目",
        label: "java实训项目",
      },
      {
        value: "php实训项目",
        label: "php实训项目",
      },
      {
        value: "python实训项目",
        label: "python实训项目",
      },

    ];
    //考勤记录逻辑编写
      const  attendancelist=ref('')
      const attendancelists = [
      {
        value: "正常",
        label: "正常",
      },
      {
        value: "迟到",
        label: "迟到",
      },
      {
        value: "早退",
        label: "早退",
      },

    ]; 




    onMounted(() => {
      loadData();

    });
    const loadData = async function () {

      await getData();
    };
    const object = reactive({ projectName: "",attendanceStatus:"" })
    //查询
    const test = () => {
      object.projectName = entryname.value
      object.attendanceStatus=attendancelist.value
      loadData()

    }
    // 重置
    const reset = () => {
        entryname.value = '',
        object.projectName = '',
        attendancelist.value = '',
        object.attendanceStatus = '',
        getData()
    }


    const tableData: any = ref();
    //get显示数据
    const getData = function () {
      axios;
      getsAttendance(object).then(function (res) {
     
        if (res.data.flag == false) {
          return tableData.value = []
        }
        console.log(res)
        // console.log(object);
        
        tableData.value = res.data.data.records.list;
      });
    }
    const value = ref()
    return {
      // searchData,
      loadData,
      // pName,
      // pNames,
      tableData,
      entryname,
      entrynames,
      attendancelist,
      attendancelists,
      test,
      reset,
      value
    }

  }
}


</script>

<style lang="less" scoped>
// 第一层按钮栏
.el-row {
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  padding-top: 40px;

}

.tit {
  width: 200px;
  height: 50px;
  background-color: #6168fe;
  border-radius: 10px;
}

//设置按钮大小
// .el-button {

//   width: 235px;
//   height: 60px;
//   margin-left: 40px;
// }

//第二层 搜索栏
.SearchBar {
  position: absolute;
  top: 128px;
}

.SearchBar:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
}

.Search {
  height: 38px;
  margin-left: 80px;
  padding-left: 10px;
  float: left;
  border-radius: 20px;
  background: #fff;
}

.el-select {
  /deep/.el-input {
    --el-input-border-color: none;
  }

  height: 38px;

  /deep/ .el-input__inner {
    height: 38px;
    line-height: 38px;
    border-radius: 0 20px 20px 0;
  }
}

.Search:nth-child(1) {
  margin-left: 36px;
  width: 340px;

  /deep/.el-input {
    width: 297px;
    height: 38px;

    .el-input__inner {
      height: 38px;
      line-height: 38px;
      border-radius: 0 20px 20px 0;
      --el-input-border-color: none;
    }

    .el-input__suffix {
      width: 28px;
      background: url("../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/日期.png") no-repeat;
      background-size: 28px 28px;
      background-position: 0 5px;
    }
  }
}

.Search:nth-child(2) {
  width: 430px;
  margin-left: 100px;

  /deep/.el-input {
    width: 350px;
  }
}

.Search:nth-child(3) {
  width: 240px;
  margin-left: 120px;
  margin-right: 50px;

  /deep/.el-input {
    width: 160px;
  }
}

// 删除elenmt下拉框自带的小箭头 换自定义图片
/deep/i.el-select__caret {
  /*很关键：将默认的select选择框样式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /*为下拉小箭头留出一点位置，避免被文字覆盖*/
  padding-right: 14px;
  /*自定义图片*/
  background: url("../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/下拉2.png") no-repeat scroll right center transparent;
  /*自定义图片的大小*/
  background-size: 28px 28px;
}

/deep/i svg path {
  display: none;
}


/deep/.el-select .el-input .el-select__caret.el-icon {
  z-index: 0;
}

.Icon {
  float: left;
  width: 60px;
  height: 38px;
  margin-left: 20px;
}

// 列表栏
.showdata {
  position: absolute;
  top: 235px;

  .el-table {
    margin-left: 36px;
    width: 1473px;

    /deep/.el-table__header {
      width: 1473px !important;
    }
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
}



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

/deep/.el-date-editor {
  --el-input-hover-border-color: none;
  --el-input-focus-border-color: none;
}

.el-select {
  --el-select-border-color-hover: none;
  --el-select-input-focus-border-color: none;

  /deep/.el-input {
    --el-input-border-color: none;
  }
}

/deep/.el-select .el-input .el-select__caret.el-icon {
  z-index: 0;
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
</style>