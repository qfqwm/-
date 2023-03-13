<template>
  <div class="locat">
    <div class="header">
      <div class="block">
        <span>提交日期：</span>
        <el-date-picker
          v-model="value1"
          type="date"
          :default-value="new Date(2010, 9, 1)"
        />
      </div>
      <div class="blockwork">
        <span>院系：</span>
        <!-- <el-cascader :options="entryname1" placeholder="请选择"/> -->
        <el-select v-model="facultie" placeholder="请选择">
          <el-option
            v-for="item in faculties"
            :key="item.value"
            :label="item.lable"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="blockwork">
        <span>专业：</span>
        <!-- <el-cascader :options="entryname1" /> -->
        <el-select v-model="speciailizad" placeholder="请选择">
          <el-option
            v-for="item in speciailizads"
            :key="item.value"
            :label="item.lable"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="blockwork">
        <span>年级：</span>
        <!-- <el-cascader :options="entryname1" /> -->
        <el-select v-model="grade" placeholder="请选择">
          <el-option
            v-for="item in grades"
            :key="item.value"
            :label="item.lable"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="blockwork">
        <span>班级：</span>
        <!-- <el-cascader :options="entryname1" /> -->
        <el-select v-model="class1" placeholder="请选择">
          <el-option
            v-for="item in class1s"
            :key="item.value"
            :label="item.lable"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="header-1">
      <div class="blockteacher">
        <span>学号：</span>
        <el-input v-model="stuid" />
      </div>
      <div class="blockteacher">
        <span>学员姓名：</span>
        <el-input v-model="name1" />
      </div>
      <div class="blockteacher">
        <span>主题：</span>
        <el-input v-model="input" />
      </div>
      <div class="blockTask">
        <span>请假原因：</span>
        <!-- <el-cascader :options="Jobtype" /> -->
        <el-select v-model="Jobtype" placeholder="请选择">
          <el-option
            v-for="item in Jobtypes"
            :key="item.value"
            :label="item.lable"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="blockTask">
        <span>审批状态：</span>
        <!-- <el-cascader :options="entryname" /> -->
        <el-select v-model="entryname" placeholder="请选择">
          <el-option
            v-for="item in entrynames"
            :key="item.value"
            :label="item.lable"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="selctbtn">
        <el-button @click="test">查询</el-button>
      </div>
      <div class="startbtn">
        <el-button @click="reset">重置</el-button>
      </div>
    </div>

    <div class="showdata">
      <el-table
        :data="currenttableData"
        :header-cell-style="{ color: '#FFF', background: '#6168fe' }"
      >
        <el-table-column prop="submitTime" label="申请提交日期" />
        <el-table-column prop="studentInfo.collegeName" label="院系" />
        <el-table-column prop="studentInfo.proName" label="专业" />
        <el-table-column prop="studentInfo.stuGrade" label="年级" />
        <el-table-column prop="studentInfo.stuClass" label="班级" />
        <el-table-column prop="stuId" label="学号" />
        <el-table-column prop="studentInfo.stuRealname" label="姓名" />
        <el-table-column prop="leaveReason" label="主题" />
        <el-table-column prop="leaveType" label="请假原因" />
        <el-table-column prop="leaveDetails" label="原因说明" />
        <el-table-column prop="startTime" label="请假开始时间" />
        <el-table-column prop="endTime" label="请假结束时间" />
        <el-table-column prop="leaveStatus" label="审批状态" />
        <el-table-column label="操作">
          <template #default="aaaa">
            <el-button
              type="text"
              size="small"
              :style="{ display: aaaa.row.visiblePublish }"
              ><router-link :to="{name:'tnotpass',params:{'stuId':JSON.stringify(aaaa.row)}}">详情</router-link></el-button
            >
            <el-button
              type="text"
              size="small"
              :style="{ display: aaaa.row.visiblePublish1 }"
              ><router-link :to="{name:'tedit',params:{'stuId':JSON.stringify(aaaa.row)}}">处理</router-link></el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页栏 -->
    <div class="example-pagination-block">
      <el-pagination
        layout="prev, pager, next"
        :total="page"
        :page-size="6"
        @current-change="sizeList()"
        v-model:current-page="currentpage"
      />
      <div class="example-demonstration">共{{ page }}条记录</div>
    </div>
  </div>
</template>
 
<script lang='ts'>
import { reactive, ref } from "@vue/reactivity";
import { gettleave } from "@/api/index";
import { onMounted } from "vue";
export default {
  setup() {
    //查询
    const test = () => {
      if (entryname.value == "未审批") {
        object.leaveStatus = "0";
      }
      if (entryname.value == "通过") {
        object.leaveStatus = "1";
      }
      if (entryname.value == "不通过") {
        object.leaveStatus = "2";
      }
      object.leaveType = Jobtype.value;
      object.collegeName = facultie.value;
      object.proName = speciailizad.value;
      object.stuGrade = grade.value;
      object.stuClass = class1.value;
      object.stuId = stuid.value;
      object.stuRealname = name1.value;
      object.leaveReason = input.value;
      loadData1();
    };
    const object = reactive({
      leaveStatus: "",
      leaveType: "",
      collegeName: "",
      proName: "",
      stuGrade: "",
      stuClass: "",
      stuId: "",
      stuRealname: "",
      leaveReason: "",
      // isDelete:'1'
    });

    //重置
    const reset = () => {
      (entryname.value = ""),
        (Jobtype.value = ""),
        (facultie.value = ""),
        (speciailizad.value = ""),
        (grade.value = ""),
        (class1.value = ""),
        (stuid.value = ""),
        (name1.value = ""),
        (input.value = ""),
        (object.leaveStatus = ""),
        (object.leaveType = ""),
        (object.collegeName = ""),
        (object.proName = ""),
        (object.stuGrade = ""),
        (object.stuClass = ""),
        (object.stuId = ""),
        (object.stuRealname = ""),
        (object.leaveReason = "");
      getData();
    };

    const pagesize = ref(6);
    const page = ref(1);
    const currentpage = ref(1);
        const sizeList = () => {
      currenttableData.value = tableData.value.slice(
        (currentpage.value - 1) * pagesize.value,
        currentpage.value * pagesize.value
      );
      console.log(currenttableData.value);
    };
    let currenttableData: any = ref();

    onMounted(() => {
      loadData1();
    });
    const tableData = ref();

    const getData = function () {
      gettleave(object).then(function (res) {
        console.log(res);

        if (res.data.flag == false) {
          return (tableData.value = []);
        }
        tableData.value = res.data.data.leaveList;
        for (let i = 0; i < tableData.value.length; i++) {
          if (tableData.value[i].leaveStatus == "0") {
            tableData.value[i].leaveStatus = "未审批";
            tableData.value[i]["visiblePublish"] = "none";
            tableData.value[i]["visiblePublish1"] = "";
          }
          if (tableData.value[i].leaveStatus == "1") {
            tableData.value[i].leaveStatus = "通过";
            tableData.value[i]["visiblePublish"] = "";
            tableData.value[i]["visiblePublish1"] = "none";
          }
          if (tableData.value[i].leaveStatus == "2") {
            tableData.value[i].leaveStatus = "未通过";
            tableData.value[i]["visiblePublish"] = ""; //审批状态为未通过，显示未通过原因
            tableData.value[i]["visiblePublish1"] = "none";
          }
        }
        currenttableData.value = tableData.value.slice(0, pagesize.value);
        page.value = tableData.value.length;
        console.log(res.data.data);
      });
      // });
    };

    const loadData1 = async function () {
      await getData();
    };

    const input = ref("");
    const stuid = ref("");
    const name1 = ref("");
    const value1 = ref("");

    const entryname = ref();
    const entrynames = [
      {
        value: "未审批",
        label: "未审批",
      },
      {
        value: "通过",
        label: "通过",
      },
      {
        value: "不通过",
        label: "不通过",
      },
    ];
    const Jobtype = ref();
    const Jobtypes = [
      {
        value: "病假",
        label: "病假",
      },
      {
        value: "事假",
        label: "事假",
      },
    ];
    const facultie = ref();
    const faculties = [
      {
        value: "软件学院",
        label: "软件学院",
      },
      {
        value: "土木工程学院",
        label: "土木工程学院",
      },
      {
        value: "计算机学院",
        label: "计算机学院",
      },
    ];
    const speciailizad = ref();
    const speciailizads = [
      {
        value: "数媒",
        label: "数媒",
      },
      {
        value: "软件工程",
        label: "软件工程",
      },
    ];
    const grade = ref();
    const grades = [
      {
        value: "2019",
        label: "2019",
      },
      {
        value: "2020",
        label: "2020",
      },
    ];
    const class1 = ref();
    const class1s = [
      {
        value: "软工1班",
        label: "软工1班",
      },
      {
        value: "软工2班",
        label: "软工2班",
      },
      {
        value: "软工3班",
        label: "软工3班",
      },
    ];

    return {
      Jobtype,
      entryname,
      Jobtypes,
      entrynames,
      facultie,
      faculties,
      speciailizad,
      speciailizads,
      grade,
      grades,
      class1,
      class1s,
      stuid,
      name1,
      value1,
      input,
      tableData,
      test,
      reset,
      page,
      currentpage,
      pagesize,
      currenttableData,
      sizeList,
    };
  },
};
</script>

<style lang="less" scoped>
.locat {
  position: relative;
  overflow: hidden;
  margin-left: 20%;
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;

  .header {
    margin-top: 120px;
    width: 100%;
    display: flex;
  }
  .header > div {
    padding-left: 0px;
  }

  .header-1 {
    margin-top: 10px;
    margin-left: -10px;
    width: 100%;
    display: flex;
  }
  .header-1 > div {
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
    width: 160px;
    padding-right: 20px;
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
    width: 180px;
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
    // margin-left: 36px;
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
    margin-top: 10px;

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
  .header {
    margin-top: 128px !important;
  }

  .block {
    height: 38px;
    padding-left: 10px;
    border-radius: 20px;
    margin-left: 36px;
    width: 230px !important;
    padding-right: 0 !important;
    padding-left: 5px !important;
    /deep/.el-date-editor {
      --el-input-hover-border-color: none;
      --el-input-focus-border-color: none;
    }
    /deep/.el-input {
      width: 180px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
        width: 180px !important;
        --el-input-border-color: none;
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
    background: url("../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/下拉2.png")
      no-repeat scroll right center transparent;
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
// 分页
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
.example-pagination-block {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}
</style>