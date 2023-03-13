<template>
  <div class="locat">
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary" size="large"
        ><router-link to="/sAttendance">考勤记录</router-link></el-button
      >
      <el-button type="primary" size="large"
        ><router-link to="/Clockin">打卡记录</router-link></el-button
      >
    </el-row>
    <!-- 搜索栏 -->
    <div class="SearchBar">
      <!-- 日期 -->
      <div class="Search">
        <span>日期：</span>
        <el-date-picker
          v-model="value"
          type="date"
          placeholder="Pick a day"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
      </div>
      <!-- 项目名称 -->

      <div class="Icon">
        <el-button>查询</el-button>
      </div>
      <div class="Icon">
        <el-button>重置</el-button>
      </div>
    </div>
    <!-- 数据展示 -->
    <div class="showdata">
      <el-table :data="tableData">
        <el-table-column prop="pdate" label="日期"  />
        <el-table-column prop="stuId" label="学号" />
        <el-table-column prop="signInTime" label="签到时间" />
        <el-table-column prop="signOutTime" label="签退时间" />
        <el-table-column prop="signPlace" label="打卡地点" />
      </el-table>
    </div>
  </div>
</template>

<script lang='ts' >

 import {getsClockin} from "@/api/index";
 import { onMounted} from "vue";
 import axios from "axios";
 import { ref } from "vue";
 export default {
  name: "sAttendance",
  setup() {
    // 搜索
    const value=ref('')

    const options = [
      {
        value: "Option1",
        label: "Option1",
      },
      {
        value: "Option2",
        label: "Option2",
      },
      {
        value: "Option3",
        label: "Option3",
      },
    ];

      onMounted(() => {
        loadData();
  
    });
    const loadData= async function () {
        await getData();
      };
    const tableData : any  = ref();

    const getData = function () {
      axios;
      getsClockin().then(function (res) {
          tableData.value = res.data.data.records.list;
          
            });
    }
    return{
      
      value,
      options,
      tableData

    }
  },
};
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
  width: 350px;
  margin-right: 40px;

  /deep/.el-input {
    width: 300px;
    height: 38px;

    .el-input__inner {
      height: 38px;
      line-height: 38px;
      border-radius: 0 20px 20px 0;
      --el-input-border-color: none;
    }

    .el-input__suffix {
      width: 28px;
      background: url("../../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/日期.png")
        no-repeat;
      background-size: 28px 28px;
      background-position: 0 5px;
    }
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
  background: url("../../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/下拉2.png")
    no-repeat scroll right center transparent;
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
  background-image: url(../../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
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
  --el-button-bg-color: #acb0fa;
  --el-button-hover-bg-color: #acb0fa;
}
.el-button--primary:nth-child(2) {
  --el-button-bg-color: #6168fe;
  --el-button-hover-bg-color: #6168fe;
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