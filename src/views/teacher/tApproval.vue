<template>
  <div class="locat">
    <!-- 头部导航 -->
    <el-row class="titleStyle">
      <el-button type="primary" class="tit"><router-link to="/tIssued">下发作业</router-link></el-button>
      <el-button type="primary" class="tit"><router-link to="/tApproval">作业审批</router-link></el-button>
    </el-row>
    <!-- 头部导航 -->
    <el-row class="headerStyle">
      <el-button type="primary" class="header"><router-link to="/tApproval">待批复</router-link></el-button>
      <el-button type="primary" class="header"><router-link to="/hasApproved">已批复</router-link></el-button>
    </el-row>
    <!-- 按需查询 -->
    <div class="SearchBar">
      <div class="search">
        <span>提交时间：</span>
        <el-date-picker
          v-model="submitTime"
          type="date"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          class="searchStyle"
        >
        </el-date-picker>
      </div>
      <div class="Search">
        <span>作业主题：</span>
        <el-select v-model="taskTheme" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in taskThemes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>项目名称：</span>
        <el-select v-model="pro" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in ProList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="search">
        <span>发布时间：</span>
        <el-date-picker
          v-model="releaseTime"
          type="date"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          class="searchStyle"
        >
        </el-date-picker>
      </div>
      <div class="Search">
        <span>小组：</span>
        <el-select v-model="gro" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in GroupNameList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <br/>
      <div class="Search">
        <span>计划完成时间：</span>
        <el-date-picker
          v-model="planComTime"
          type="date"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          class="searchStyle"
        >
        </el-date-picker>
      </div>
      <div class="Search">
        <span>实训老师：</span>
        <el-select v-model="tea" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in TeaList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>学生姓名：</span>
        <el-select v-model="stuName" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in stuNames"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>作业类型：</span>
        <el-select v-model="taskType" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in taskTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-button>查询</el-button>
      <el-button>重置</el-button>
      <el-button @click="tag=true">新增</el-button>
    </div>
    <!-- 显示查询结果 -->
    <div class="result">
      <el-table :data="tableData">
        <el-table-column prop="commitTime" label="提交时间" width="120" />
        <el-table-column prop="projectName" label="项目名称" width="160" />
        <el-table-column prop="homTitle" label="作业主题" width="160" />
        <el-table-column prop="homType" label="作业类型" width="160" />
        <el-table-column prop="teacherName" label="实训老师" width="80" />
        <el-table-column prop="homStarttime" label="发布时间" width="120" />
        <el-table-column prop="homEndtime" label="计划完成时间" width="120" />
        <el-table-column prop="proName" label="专业" width="90" />
        <el-table-column prop="groupName" label="小组" width="140" />
        <el-table-column prop="stuId" label="学号" width="100" />
        <el-table-column prop="stuRealname" label="姓名" width="80" />
        <el-table-column label="操作" width="100">
          <!-- <el-button><router-link to="/dowork">操作</router-link></el-button> -->
          <template #default>
            <el-button type="text" size="small">
            <router-link to="/dotask">批复</router-link></el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <!-- 新增分组弹窗 -->
  <div class="groupAdd" v-show="tag">
    <h1>项目分组</h1>
    <el-form :model="form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input/>
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group>
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts' setup>
import { onMounted } from "vue";
import { getTApproval} from "@/api/index";
import { ref} from "vue";
const tag=ref(false)
const submitTime = ref()
const taskTheme = ref()
const pro = ref()
const releaseTime = ref()
const gro = ref()
const planComTime = ref()
const tea = ref()
const stuName = ref()
const taskType = ref()
const form = ref()

const taskThemes = ref()
const ProList = ref()
const GroupNameList = ref()
const TeaList = ref()
const stuNames = ref()
const taskTypes = ref()
const tableData = ref();

onMounted(() => {
  getTApproval().then((res) => {
    console.log(res.data.data);
    tableData.value = res.data.data.pageHomeworks.list;
    ProList.value = res.data.data.ProList
    TeaList.value = res.data.data.TeaList
    GroupNameList.value = res.data.data.GroupNameList
  });
});



  // {
  //   submitTime:"2022/03/25",
  //   projectName: "网上购物商城",
  //   jobTheme: "前端设计",
  //   jobType: "项目作业",
  //   trainingTeacher: "张三",
  //   releaseTime: "2022/03/21",
  //   planComTime: "2022/05/05",
  //   major:"软件工程",
  //   group:"第二组",
  //   stuNum:"199000936",
  //   name:"卢伟"
  // },

</script>

<style lang="less" scoped>
.locat {
  margin-left: 20%;
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
.titleStyle {
  padding-top: 60px;
  left: 33%;
  flex-wrap: nowrap;
  a {
    text-decoration: none;
    color: #fff;
    font-size: 30px;
  }
  :nth-child(1){
    background-color: #acb0fa;
  }
  :nth-child(2){
    span{
      // display: inline-block;
      a{
        background-color: #6168fe;
      }
    }
  }
}

.tit {
  width: 200px;
  height: 50px;
  background-color: #6168fe;
  border-radius: 10px;
}
.headerStyle {
  padding-top: 5px;
  left: 39.5%;
  flex-wrap: nowrap;
  a {
    text-decoration: none;
    color: #fff;
    font-size: 20px;
  }
  :nth-child(2){
    background-color: #acb0fa;
  }
}

.header {
  width: 100px;
  height: 30px;
  background-color: #6168fe;
  border-radius: 10px;
}
.selctbtn {
  margin-left: 30px;
}
.startbtn {
  margin-left: 20px;
}
.result {
  position: absolute;
  top: 270px;
  .el-table {
    margin-left: 32px;
    width: 1440px;
    /deep/.el-button a {
      text-decoration: none;
      color: blue;
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
.el-table {
  background-color: transparent;
  border-radius: 20px;
}
.SearchBar {
  padding-top: 20px;
  width: 100%;
  height: 140px;
  a {
    text-decoration: none;
  }

  .Search {
    display: inline-block;
    height: 38px;
    padding-left: 10px;
    border-radius: 20px;
    background: #fff;
  }
  .search:nth-child(1) {
    display: inline-block;
    height: 38px;
    width: 210px !important;
    line-height: 38px;
    padding-left: 10px;
    border-radius: 20px;
    background: #fff;
    margin-left: 36px;
    width: 246px;
    /deep/.el-input {
      width: 160px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
        --el-input-border-color: none;
      }
      .el-input__suffix {
        width: 28px;
        background: url("../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/日期.png")
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
  .Search:nth-child(2) {
    margin-left: 60px;
    width: 250px;
    /deep/.el-input {
      width: 185px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
      }
    }
    /deep/.el-input__suffix-inner {
      i {
        padding-right: 0px;
        margin-top: 5px;
        width: 28px !important;
        height: 28px !important;
      }
      .el-icon:nth-child(1) svg {
        display: none;
      }
      .el-icon svg {
        height: 28px !important;
        width: 28px !important;
      }
    }
  }
  .Search:nth-child(3) {
    margin-left: 60px;
    width: 250px;
    height: 38px;
    /deep/.el-input {
      width: 180px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
      }
    }
    /deep/.el-input__suffix-inner {
      i {
        padding-right: 0px;
        margin-top: 5px;
        width: 28px !important;
        height: 28px !important;
      }
      .el-icon:nth-child(1) svg {
        display: none;
      }
      .el-icon svg {
        height: 28px !important;
        width: 28px !important;
      }
    }
  }
  .search:nth-child(4) {
    display: inline-block;
    height: 38px;
    width: 210px !important;
    line-height: 38px;
    padding-left: 10px;
    border-radius: 20px;
    background: #fff;
    margin-left: 60px;
    width: 246px;
    /deep/.el-input {
      width: 160px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
        --el-input-border-color: none;
      }
      .el-input__suffix {
        width: 28px;
        background: url("../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/日期.png")
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
  .Search:nth-child(5) {
    margin-left: 60px;
    width: 250px;
    height: 38px;
    /deep/.el-input {
      width: 180px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
      }
    }
    /deep/.el-input__suffix-inner {
      i {
        padding-right: 0px;
        margin-top: 5px;
        width: 28px !important;
        height: 28px !important;
      }
      .el-icon:nth-child(1) svg {
        display: none;
      }
      .el-icon svg {
        height: 28px !important;
        width: 28px !important;
      }
    }
  }
  .Search:nth-of-type(6) {
    width: 280px;
    height: 38px;
    margin-left: 35px;
    margin-right: 20px;
    /deep/.el-input {
      width: 140px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
        --el-input-border-color: none;
      }
      .el-input__suffix {
        width: 28px;
        background: url("../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/日期.png")
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
  .Search:nth-of-type(7) {
    width: 260px !important;
    height: 38px !important;
    margin-left: 10px !important;
    margin-top: 17px;
    /deep/.el-input {
      width: 180px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
      }
    }
    /deep/.el-input__suffix-inner {
      i {
        padding-right: 0px;
        margin-top: 5px;
        width: 28px !important;
        height: 28px !important;
      }
      .el-icon:nth-child(1) svg {
        display: none;
      }
      .el-icon svg {
        height: 28px !important;
        width: 28px !important;
      }
    }
  }
  .Search:nth-of-type(8) {
    width: 230px;
    height: 38px;
    margin-right: 20px;
    margin-left: 30px;
    /deep/.el-input {
      width: 175px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
      }
    }
    /deep/.el-input__suffix-inner {
      i {
        padding-right: 0px;
        margin-top: 5px;
        width: 28px !important;
        height: 28px !important;
      }
      .el-icon:nth-child(1) svg {
        display: none;
      }
      .el-icon svg {
        height: 28px !important;
        width: 28px !important;
      }
    }
  }
  .Search:nth-of-type(9) {
    width: 230px;
    height: 38px;
    margin-right: 50px;
    margin-left: 30px;
    /deep/.el-input {
      width: 175px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
      }
    }
    /deep/.el-input__suffix-inner {
      i {
        padding-right: 0px;
        margin-top: 5px;
        width: 28px !important;
        height: 28px !important;
      }
      .el-icon:nth-child(1) svg {
        display: none;
      }
      .el-icon svg {
        height: 28px !important;
        width: 28px !important;
      }
    }
  }

  .el-button {
    margin-left: 20px;
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
  background: url("../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/上拉.png")
    no-repeat scroll right center transparent;
  /*自定义图片的大小*/
  background-size: 28px 28px;
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
</style>