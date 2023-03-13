<template>
  <div class="locat">
    <!-- 头部导航 -->
    <el-row class="titleStyle">
      <el-button type="primary" class="tit"
        ><router-link to="/sWork">待提交</router-link></el-button
      >
      <el-button type="primary" class="tit"
        ><router-link to="/geOfAPProval">待批复</router-link></el-button
      >
      <el-button type="primary" class="tit"
        ><router-link to="/hasBeenApproved">已批复</router-link></el-button
      >
    </el-row>
    <!-- 按需查询 -->
    <div class="SearchBar">
      <div class="search">
        <span>发布日期：</span>
        <el-date-picker
          v-model="releaseDate"
          type="date"
          placeholder="发布时间："
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          class="searchStyle"
        >
        </el-date-picker>
      </div>
      <div class="Search">
        <span>项目名称：</span>
        <el-select
          v-model="Pro"
          class="m-2"
          placeholder="项目名称："
          size="large"
        >
          <el-option
            v-for="item in pro"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>作业主题：</span>
        <el-select
          v-model="taskTheme"
          class="m-2"
          placeholder="作业主题："
          size="large"
        >
          <el-option
            v-for="item in taskThemes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <br />
      <div class="Search">
        <span>作业类型：</span>
        <el-select
          v-model="taskType"
          class="m-2"
          placeholder="作业类型："
          size="large"
        >
          <el-option
            v-for="item in taskTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>老师：</span>
        <el-select
          v-model="Tea"
          class="m-2"
          placeholder="老师："
          size="large"
        >
          <el-option
            v-for="item in tea"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>计划完成时间：</span>
        <el-date-picker
          v-model="ttt"
          type="date"
          placeholder="计划完成时间："
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          class="searchStyle"
        >
        </el-date-picker>
      </div>
      <el-button @click="query" >查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <!-- 显示查询结果 -->
    <div class="result">
      <el-table :data="tableData">
        <el-table-column prop="homStartTime" label="发布时间" width="170"/>
        <el-table-column prop="projectName" label="项目名称" width="170" />
        <el-table-column prop="homTitle" label="作业主题" width="170" />
        <el-table-column prop="homType" label="作业类型" width="120" />
        <el-table-column prop="teacherName" label="实训老师" width="120" />
        <el-table-column prop="homEndTime" label="计划完成时间" width="170" />
        <el-table-column prop="planComStatus" label="计划完成状态" width="150"/>
        <el-table-column prop="actualComTime" label="实际完成时间" width="170"/>
        <el-table-column prop="score" label="得分" width="100"/>
        <el-table-column label="操作" width="100">
        <template #default>
            <el-button type="text" size="small">
              <router-link to="/dowork">操作</router-link>
            </el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, reactive } from "vue";
import { getHasBeenApproval} from "@/api/index";
import { ref} from "vue";
const ttt = ref("");

const Pro = ref("");
const releaseDate = ref('');
const Tea = ref("");
const taskTheme = ref()
const taskType = ref()

const tableData = ref();
const pro = ref("");
const tea = ref("");
const object = reactive({stuid:'',homeStartTime:'',projectName:'',homeTitle:'',teacherName:'',homeEndTime:'',homeType:''})
const taskThemes = [
  {
    value:"实验1",
    label:"实验1"
  },
  {
    value:"实验2",
    label:"实验2"
  },
  {
    value:"实验3",
    label:"实验3"
  },
]
const taskTypes = [
  {
    value:"1",
    label:"1"
  },
  {
    value:"填空题",
    label:"填空题"
  },
  {
    value:"选择题",
    label:"选择题"
  },
]
onMounted(() => {
  loadData();
});
const query=()=>{
  object.homeTitle = taskTheme.value
  object.homeType = taskType.value
  loadData();
}
const loadData = async function () {
  await getData();
};
const getData =() => {
  getHasBeenApproval(object).then((res) => {
    console.log(res.data.data);
    tableData.value=res.data.data.pageHomeworks.list;
    pro.value = res.data.data.ProList;
    tea.value = res.data.data.TeaList;
  });
}

//重置
const reset=()=>{
  taskTheme.value='',
  taskType.value='',
  Pro.value='',
  Tea.value='',
  releaseDate.value='',
  ttt.value='',
  getData()
}

</script>

<style lang="less" scoped>
.locat {
  margin-left: 20%;
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
.titleStyle {
  padding-top: 60px;
  left: 25%;
  a {
    text-decoration: none;
    color: #fff;
    font-size: 30px;
  }
  flex-wrap: nowrap;
  :nth-child(1){
    background-color: #acb0fa;

  }
  :nth-child(2){
    background-color: #acb0fa;
  }
  :nth-child(3){
    span{
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
.selctbtn {
  margin-left: 30px;
}
.startbtn {
  margin-left: 20px;
}
.result {
  position: absolute;
  top: 235px;
  .el-table {
    margin-left: 36px;
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
.el-table{
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
    width: 340px !important;
    line-height: 38px;
    padding-left: 10px;
    border-radius: 20px;
    background: #fff;
    margin-left: 36px;
    width: 246px;
    /deep/.el-input {
      width: 290px;
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
        background: url("../../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/日期.png")
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
    margin-left: 115px;
    width: 430px;
    /deep/.el-input {
      width: 350px;
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
    margin-left: 120px;
    width: 380px;
    height: 38px;
    /deep/.el-input {
      width: 310px;
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
  .Search:nth-of-type(4) {
    width: 310px !important;
    height: 38px !important;
    margin-left: 38px !important;
    margin-top: 17px;
    /deep/.el-input {
      width: 230px;
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
  .Search:nth-of-type(5) {
    width: 300px;
    height: 38px;
    margin-left: 144px;
    /deep/.el-input {
      width: 250px;
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
    width: 360px;
    height: 38px;
    margin-left: 110px;
    margin-right: 20px;
    /deep/.el-input {
      width: 250px;
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
        background: url("../../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/日期.png")
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
  background: url("../../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/上拉.png")
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