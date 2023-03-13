<template>
  <div class="locat">
    <!-- 搜索栏 -->
    <div class="SearchBar">
      <!-- 日期 -->
      <div class="Search">
        <span>日期：</span>
        <el-date-picker
          v-model="time"
          type="date"
          placeholder="Pick a day"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
      </div>
      <!-- 项目名称 -->
      <div class="Search">
        <span>项目名称：</span
        ><el-select v-model="entryname" clearable placeholder="Select">
          <el-option
            v-for="item in entrynames"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 实训老师 -->
      <div class="Search">
        <span>实训老师：</span
        ><el-select v-model="trainingTeacher" clearable placeholder="Select">
          <el-option
            v-for="item in trainingTeachers"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 责任老师 -->
      <div class="Search">
        <span>责任老师：</span
        ><el-select v-model="responsibleTeacher" clearable placeholder="Select">
          <el-option
            v-for="item in responsibleTeachers"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="Icon">
        <el-button @click="query">查询</el-button>
      </div>
      <div class="Icon">
        <el-button @click="Reset">重置</el-button>
      </div>
    </div>
    <!-- 展示数据栏 -->
    <div class="showdata">
      <el-table :data="currenttableData">
        <el-table-column prop="courseDate" label="日期" width="180" />
        <el-table-column prop="projectName" label="项目名称" width="180" />
        <el-table-column
          prop="projectTeacherName"
          label="实训老师"
          width="180"
        />
        <el-table-column
          prop="responseTeacherName"
          label="责任老师"
          width="180"
        />
        <el-table-column prop="inTime" label="签到时间" width="180" />
        <el-table-column prop="outTime" label="签退时间" width="180" />
        <el-table-column prop="classRoom" label="教室" />
        <el-table-column prop="courseRemark" label="备注" />
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
import { getstuCourse } from "@/api/index";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const time = ref();
    const entryname = ref();
    let currenttableData: any = ref();
    const pagesize = ref(6);
    const query = () => {
      object.projectName = entryname.value;
      object.teacher = responsibleTeacher.value;
      object.pTeacher = trainingTeacher.value;
      objecttime.projectName = entryname.value;
      objecttime.teacher = responsibleTeacher.value;
      objecttime.pTeacher = trainingTeacher.value;
      console.log(object);
      if (!time.value) {
        loadData(object);
      } else {
        objecttime.courseDate = time.value + ' 00:00:00';   
        loadData(objecttime);
      }
    };
    const object = reactive({ projectName: "", teacher: "", pTeacher: "" });
    const objecttime = reactive({
      projectName: "",
      teacher: "",
      pTeacher: "",
      courseDate: "",
    });
    const entrynames = [
      {
        value: "java实训项目",
        label: "java实训项目",
      },
      {
        value: "项目2",
        label: "项目2",
      },
      {
        value: "项目3",
        label: "项目3",
      },
    ];
    const trainingTeacher = ref();
    const trainingTeachers = [
      {
        value: "赵小糖",
        label: "赵小糖",
      },
      {
        value: "feedback",
        label: "实训老是",
      },
    ];
    const responsibleTeacher = ref();
    const responsibleTeachers = [
      {
        value: "王明",
        label: "王明",
      },
      {
        value: "feedback",
        label: "责任老是",
      },
    ];
    onMounted(() => {
      loadData(object);
    });
    let tableData: any = ref();
    const page = ref(1);
    const currentpage = ref(1);
    const sizeList = () => {
      currenttableData.value = tableData.value.slice(
        (currentpage.value - 1) * pagesize.value,
        currentpage.value * pagesize.value
      );
      console.log(currenttableData.value);
    };
    const getData = function (item: object) {
      getstuCourse(item, localStorage.getItem("student")).then(function (res) {
        tableData.value = res.data.data;
        currenttableData.value = tableData.value.slice(0, pagesize.value);
        page.value = tableData.value.length;
        for (var i = 0; i < tableData.value.length; i++) {
          tableData.value[i].projectTeacherName =
            tableData.value[i].projectTeacherName.toString();
          tableData.value[i].courseDate = dates(
            tableData.value[i].courseDate
          )[0];
          tableData.value[i].inTime = dates(tableData.value[i].inTime)[1];
          tableData.value[i].outTime = dates(tableData.value[i].outTime)[1];
        }
      });
    };

    const loadData = async function (item: object) {
      await getData(item);
    };

    const Reset = () => {
      entryname.value = "";
      responsibleTeacher.value = "";
      time.value = "";
      trainingTeacher.value = "";
      (object.projectName = ""),
        (object.teacher = ""),
        (object.pTeacher = ""),
        (objecttime.courseDate = ""),
        (objecttime.projectName = ""),
        (objecttime.teacher = ""),
        (objecttime.pTeacher = ""),
        loadData(object);
    };
    const dates = function (times: any) {
      let modifytime = new Date(times);
      let date =
        modifytime.getFullYear() +
        "-" +
        (modifytime.getMonth() + 1) +
        "-" +
        modifytime.getDate();
      let hover =
        modifytime.getHours() < 10
          ? "0" + modifytime.getHours()
          : modifytime.getHours();
      let Minutes =
        modifytime.getMinutes() < 10
          ? "0" + modifytime.getMinutes()
          : modifytime.getMinutes();
      let Seconds =
        modifytime.getSeconds() < 10
          ? "0" + modifytime.getSeconds()
          : modifytime.getSeconds();
      let time = hover + ":" + Minutes + ":" + Seconds;
      return [date, time];
    };

    return {
      trainingTeachers,
      trainingTeacher,
      entryname,
      entrynames,
      object,
      objecttime,
      responsibleTeacher,
      responsibleTeachers,
      time,
      tableData,
      Reset,
      getData,
      loadData,
      dates,
      query,
      page,
      pagesize,
      sizeList,
      currentpage,
      currenttableData,
    };
  },
};
</script>





<style lang="less" scoped>
.locat {
  position: relative;
  margin-left: 20%;
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;
}
// 搜索栏
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

  height: 38px;
  /deep/ .el-input__inner {
    height: 38px;
    line-height: 38px;
    border-radius: 0 20px 20px 0;
  }
}
.Search:nth-child(1) {
  margin-left: 36px;
  width: 246px;
  /deep/.el-input {
    width: 197px;
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
  width: 326px;
  margin-left: 83px;
  /deep/.el-input {
    width: 246px;
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
  width: 231px;
  /deep/.el-input {
    width: 150px;
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
.Search:nth-child(4) {
  width: 231px;
  /deep/.el-input {
    width: 150px;
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

// /deep/i svg path {
//   display: none;
// }
/deep/.el-select .el-input .el-select__caret.el-icon {
  z-index: 0;
}
// 搜索栏 两张图片
// .Icon {
//   float: left;
//   width: 38px;
//   height: 38px;
//   margin-left: 25px;
//   .buttonstyle {
//     width: 38px;
//     height: 38px;
//     background: #f7f7f7;
//     border: none;
//     img {
//       width: 38px;
//       height: 38px;
//     }
//   }
// }
.Icon {
  float: left;
  width: 60px;
  height: 38px;
  margin-left: 20px;
}

// 列表栏
.showdata {
  position: absolute;
  top: 225px;
  .el-table {
    margin-left: 36px;
    width: 1473px;
  }
}
.el-table {
  background-color: transparent;
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
// 分页
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
.example-pagination-block {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
}
</style>