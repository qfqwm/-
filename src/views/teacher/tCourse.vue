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
        ><el-select v-model="choiceItemName" clearable placeholder="Select">
          <el-option
            v-for="item in itemName"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 实训老师 -->
      <div class="Search">
        <span>实训老师：</span
        ><el-select
          v-model="choiceTrainingteacher"
          clearable
          placeholder="Select"
        >
          <el-option
            v-for="item in Trainingteacher"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 责任老师 -->
      <div class="Search">
        <span>责任老师：</span
        ><el-select
          v-model="choiceResponsibility"
          clearable
          placeholder="Select"
        >
          <el-option
            v-for="item in Responsibility"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="Icon">
        <el-button type="primary" @click="query">查询</el-button>
      </div>
      <div class="Icon">
        <el-button type="primary" @click="Reset">重置</el-button>
      </div>
    </div>
    <div class="showdata">
      <el-table :data="currenttableData">
        <el-table-column prop="courseDate" label="日期" />
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="projectTeacherName" label="实训老师" />
        <el-table-column prop="responseTeacherName" label="责任老师" />
        <el-table-column prop="inTime" label="签到时间" />
        <el-table-column prop="outTime" label="签退时间" />
        <el-table-column prop="classRoom" label="教室" />
        <el-table-column prop="courseRemark" label="备注" />
        <el-table-column label="操作">
          <template #default="course">
            <!-- 后期传id -->
            <span @click="showStudy(course.row.projectId)">查看学生</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看学生 -->
    <!-- 制作蒙板 -->
    <div v-show="isshow" class="Mask">
      <div class="showStudents">
        <h1>查　看　学　生</h1>
        <!-- 搜索区域 -->
        <div class="showStudentsSearch">
          <div class="StudySearch">
            <span>小组名称：</span
            ><el-select v-model="showGroupname" clearable placeholder="Select">
              <el-option
                v-for="item in showGroupnames"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="StudySearch">
            <span>专业：</span
            ><el-select v-model="showmajor" clearable placeholder="Select">
              <el-option
                v-for="item in showmajors"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="StudySearch">
            <span>年级：</span
            ><el-select v-model="showgrade" clearable placeholder="Select">
              <el-option
                v-for="item in showgrades"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <br />
          <div class="StudySearch">
            <span>班级：</span
            ><el-select v-model="showclass" clearable placeholder="Select">
              <el-option
                v-for="item in showclasss"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div class="StudySearch">
            <span>学员名称：</span><input type="text" v-model="showname" />
          </div>
          <div class="StudySearch">
            <span>学号：</span><input type="text" v-model="showid" />
          </div>
          <div class="Icon">
            <el-button type="primary" @click="studyquery(projectId)"
              >查询</el-button
            >
          </div>
          <div class="Icon">
            <el-button type="primary" @click="studyReset(projectId)"
              >重置</el-button
            >
          </div>
        </div>
        <div class="Studyshowdata">
          <el-table :data="studycurrenttableData">
            <el-table-column prop="groupName" label="小组名称" width="115px" />
            <el-table-column prop="collegeName" label="院系" />
            <el-table-column prop="proName" label="专业" width="85x" />
            <el-table-column prop="stuGrade" label="年级" />
            <el-table-column prop="stuClass" label="班级" width="90px" />
            <el-table-column prop="teacherName" label="班主任" />
            <el-table-column prop="stuRealName" label="学员姓名" />
            <el-table-column prop="stuId" label="学号" width="90px" />
            <el-table-column
              prop="stuIdCard"
              label="身份证号码"
              width="155px"
            />
            <el-table-column prop="stuSex" label="性别" />
            <el-table-column prop="stuEmail" label="邮件" width="165px" />
            <el-table-column prop="stuPhone" label="手机号" width="105px" />
            <el-table-column prop="groupMember" label="项目角色" />
          </el-table>
          <div class="example-pagination-block">
            <el-pagination
              layout="prev, pager, next"
              :total="studypage"
              :page-size="6"
              @current-change="studysizeList"
              v-model:current-page="studycurrentpage"
            />
            <div class="example-demonstration">共{{ studypage }}条记录</div>
          </div>
          <div class="Studybtn">
            <input
              type="submit"
              name=""
              id=""
              value="确定"
              class="yes"
              @click="back()"
              @mousedown="yesdown()"
              @mouseup="yesup()"
              :style="{ color: yesiscolor }"
            />
            <input
              type="submit"
              name=""
              id=""
              value="取消"
              class="no"
              @mousedown="nodown()"
              @mouseup="noup()"
              @click="back()"
              :style="{ color: noiscolor }"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 分页栏 -->
    <div class="example-pagination-block">
      <el-pagination
        layout="prev, pager, next"
        :total="page"
        :page-size="6"
        @current-change="sizeList"
        v-model:current-page="currentpage"
      />
      <div class="example-demonstration">共{{ page }}条记录</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref, reactive } from "@vue/reactivity";
import { getTCourse } from "@/api/index";
import { getTCoursestudent } from "@/api/index";
import { onMounted } from "@vue/runtime-core";
import { el } from 'element-plus/lib/locale';
export default {
  setup() {
    const yesiscolor = ref("#fafafe");
    const noiscolor = ref("#fafafe");
    const isshow = ref(false);
    const back = () => {
      isshow.value = false;
    };
    const projectId = ref();
    const showStudy = (item: any, studyobject: object) => {
      projectId.value = item;
      isshow.value = true;
      studyloadData(item, studyobject);
    };
    const yesdown = () => {
      yesiscolor.value = "red";
    };
    const yesup = () => {
      yesiscolor.value = "#fafafe";
    };
    const nodown = () => {
      noiscolor.value = "red";
    };
    const noup = () => {
      noiscolor.value = "#fafafe";
    };
    // 外层查询
    const time = ref();
    const choiceItemName = ref();
    const itemName = ref([
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
    ]);
    const Trainingteacher = ref([
      {
        value: "赵小糖",
        label: "赵小糖",
      },
      {
        value: "项目2",
        label: "项目2",
      },
      {
        value: "项目3",
        label: "项目3",
      },
    ]);
    const Responsibility = ref([
      {
        value: "王明",
        label: "王明",
      },
      {
        value: "项目2",
        label: "项目2",
      },
      {
        value: "项目3",
        label: "项目3",
      },
    ]);
    const choiceTrainingteacher = ref();
    const choiceResponsibility = ref();
    const Reset = () => {
      choiceResponsibility.value = "";
      choiceTrainingteacher.value = "";
      time.value = "";
      choiceItemName.value = "";
      (object.projectName = ""),
        (object.teacher = ""),
        (object.pTeacher = ""),
        getData(object);
    };
    const studyReset = (projectId: any) => {
      (showGroupname.value = ""),
        (showmajor.value = ""),
        (showgrade.value = ""),
        (showclass.value = ""),
        (showname.value = ""),
        (showid.value = "");
      (studyobject.groupName = showGroupname.value),
        (studyobject.proName = showmajor.value),
        (studyobject.stuGrade = showgrade.value),
        (studyobject.stuClass = showclass.value),
        (studyobject.stuRealName = showname.value),
        (studyobject.stuId = showid.value),
        studentgetData(projectId, studyobject);
    };
    // 内层查询
    onMounted(() => {
      loadData();
    });
    let tableData: any = ref();
    let studytableData: any = ref();
    const getData = function (object: object) {
      getTCourse(object, localStorage.getItem("teacher")).then(function (res) {
        tableData.value = res.data.data;
        for (var i = 0; i < tableData.value.length; i++) {
          tableData.value[i].projectTeacherName =
            tableData.value[i].projectTeacherName.toString();
          tableData.value[i].courseDate = dates(
            tableData.value[i].courseDate
          )[0];
          tableData.value[i].inTime = dates(tableData.value[i].inTime)[1];
          tableData.value[i].outTime = dates(tableData.value[i].outTime)[1];
        }
        currenttableData.value = tableData.value.slice(0, pagesize.value);
        page.value = tableData.value.length;
      });
    };
    const studentgetData = function (id: any, studyobject: object) {
      getTCoursestudent(id, studyobject).then(function (res) {
        studytableData.value = res.data.data;
        for (var i = 0; i < studytableData.value.length; i++) {
          if (studytableData.value[i].groupMember === "0")
            studytableData.value[i].groupMember = "后端";
          if (studytableData.value[i].groupMember === "1")
            studytableData.value[i].groupMember = "前端";
          if (studytableData.value[i].groupMember === "2")
            studytableData.value[i].groupMember = "UI";
          if (studytableData.value[i].groupMember === "3")
            studytableData.value[i].groupMember = "测试";
        }
        studycurrenttableData.value = studytableData.value.slice(
          0,
          studypagesize.value
        );
        studypage.value = studytableData.value.length;
      });
    };
    // 数据请求
    const loadData = async function () {
      await getData(object);
    };
    const studyloadData = async function (id: any, studyobject: object) {
      await studentgetData(id, studyobject);
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
    const page = ref(1);
    const currentpage = ref(1);
    let currenttableData: any = ref();
    const pagesize = ref(6);
    const studypage = ref(1);
    const studycurrentpage = ref(1);
    let studycurrenttableData: any = ref();
    const studypagesize = ref(6);
    const sizeList = () => {
      currenttableData.value = tableData.value.slice(
        (currentpage.value - 1) * pagesize.value,
        currentpage.value * pagesize.value
      );
    };
    const studysizeList = () => {
      studycurrenttableData.value = studytableData.value.slice(
        (studycurrentpage.value - 1) * studypagesize.value,
        studycurrentpage.value * studypagesize.value
      );
    };
    const showGroupname = ref();
    const showGroupnames = ref([
      {
        value: "java实训项目组1",
        label: "java实训项目组1",
      },
      {
        value: "项目2",
        label: "项目2",
      },
      {
        value: "项目3",
        label: "项目3",
      },
    ]);
    const showmajor = ref();
    const showmajors = ref([
      {
        value: "数媒新技术",
        label: "数媒新技术",
      },
      {
        value: "项目2",
        label: "项目2",
      },
      {
        value: "项目3",
        label: "项目3",
      },
    ]);
    const showgrade = ref();
    const showgrades = ref([
      {
        value: "2019级",
        label: "2019级",
      },
      {
        value: "项目2",
        label: "项目2",
      },
      {
        value: "项目3",
        label: "项目3",
      },
    ]);
    const showclass = ref();
    const showclasss = ref([
      {
        value: "19软工1班",
        label: "19软工1班",
      },
      {
        value: "项目2",
        label: "项目2",
      },
      {
        value: "项目3",
        label: "项目3",
      },
    ]);
    const studyobject = reactive({
      groupName: "",
      proName: "",
      stuGrade: "",
      stuClass: "",
      stuRealName: "",
      stuId: "",
    });
    const studyResetobject = reactive({
      groupName: "",
      proName: "",
      stuGrade: "",
      stuClass: "",
      stuRealName: "",
      stuId: "",
    });
    const showname = ref();
    const showid = ref();
    const object = reactive({ projectName: "", teacher: "", pTeacher: "" });
    const objecttime = reactive({ courseDate:'',projectName: "", teacher: "", pTeacher: "" });
    const query = () => {
      if(time.value==null)
      {object.projectName = choiceItemName.value;
      object.teacher = choiceResponsibility.value;
      object.pTeacher = choiceTrainingteacher.value;
      getData(object);}
      else
      {
      objecttime.projectName = choiceItemName.value;
      objecttime.teacher = choiceResponsibility.value;
      objecttime.pTeacher = choiceTrainingteacher.value;
      objecttime.courseDate=time.value + ' 00:00:00';
      console.log(objecttime);
      
        getData(objecttime);
      }
    };
    const studyquery = (projectId: any) => {
      (studyobject.groupName = showGroupname.value),
        (studyobject.proName = showmajor.value),
        (studyobject.stuGrade = showgrade.value),
        (studyobject.stuClass = showclass.value),
        (studyobject.stuRealName = showname.value),
        (studyobject.stuId = showid.value),
        studentgetData(projectId, studyobject);
    };

    return {
      // 方法
      isshow,
      choiceItemName,
      choiceTrainingteacher,
      choiceResponsibility,
      tableData,
      studytableData,
      yesiscolor,
      noiscolor,
      sizeList,
      studysizeList,
      query,
      studyReset,
      // 数据
      time,
      objecttime,
      back,
      yesdown,
      yesup,
      nodown,
      noup,
      showStudy,
      studentgetData,
      dates,
      studyloadData,
      Reset,
      page,
      currentpage,
      currenttableData,
      pagesize,
      showGroupname,
      showGroupnames,
      showmajor,
      showmajors,
      showgrade,
      showgrades,
      showclass,
      showclasss,
      showname,
      showid,
      studypage,
      studycurrentpage,
      studycurrenttableData,
      studypagesize,
      itemName,
      Trainingteacher,
      Responsibility,
      object,
      studyobject,
      studyResetobject,
      studyquery,
      projectId,
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
  width: 226px;
  /deep/.el-input {
    width: 176px;
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
  width: 276px;
  margin-left: 83px;
  /deep/.el-input {
    width: 196px;
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
.Icon {
  float: left;
  width: 60px;
  height: 38px;
  margin-left: 20px;
}

// 列表栏
.showdata {
  position: absolute;
  top: 215px;
  .el-table {
    margin-left: 36px;
    width: 1473px;
  }
  span {
    color: #51b8f8;
    padding: 0 3px;
  }
  span:hover {
    color: #8dd1fc;
  }
  span:active {
    color: #0199f7;
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
// 蒙版
.Mask {
  position: absolute;
  width: 100%;
  height: 1080px;
  z-index: 999;
  opacity: 1;
}
// 查看学生
.showStudents {
  position: relative;
  top: 16%;
  left: 5%;
  height: 700px;
  width: 1350px;
  background: #f7f7f7;
  border-radius: 20px;
  border: 3px solid #ebeafc;
  z-index: 999;
  h1 {
    text-align: center;
    color: #5660fe;
    height: 50px;
    line-height: 50px;
  }
  .showStudentsSearch {
    /deep/.el-icon svg {
      display: none;
    }
    height: 90px;
    margin-top: 10px;
    .StudySearch {
      display: inline-block;
      height: 38px;
      line-height: 38px;
      padding-left: 10px;
      border-radius: 20px;
      background: #fff;
      input {
        height: 38px;
        border: none;
        outline: none;
        border-radius: 20px;
      }
    }
    .StudySearch:nth-of-type(1) {
      margin-left: 36px;
      /deep/.el-input {
        width: 300px;
      }
    }
    .StudySearch:nth-of-type(2) {
      margin-left: 140px;
      /deep/.el-input {
        width: 250px;
      }
    }
    .StudySearch:nth-of-type(3) {
      margin-left: 140px;
      /deep/.el-input {
        width: 220px;
      }
    }
    .StudySearch:nth-of-type(4) {
      margin-top: 15px;
      margin-left: 36px;
      /deep/.el-input {
        width: 240px;
      }
    }
    .StudySearch:nth-of-type(5) {
      margin-left: 100px;
      width: 260px;
    }
    .StudySearch:nth-of-type(6) {
      margin-left: 100px;
      width: 260px;
      margin-right: 40px;
    }
    .Icon {
      margin-top: 15px;
      float: none;
      display: inline-block;
    }
  }
  .Studyshowdata {
    width: 96%;
    margin: 20px auto;
    /deep/.el-table__header-wrapper {
      height: 50px !important;
      .el-table__header {
        height: 50px !important;
        colgroup {
          height: 50px !important;
          col {
            height: 50px !important;
          }
        }
        thead {
          height: 50px !important;
          tr {
            height: 50px !important;
            th {
              height: 50px !important;
            }
          }
        }
      }
    }
    /deep/.el-table__row {
      height: 60px !important;
      td {
        height: 60px !important;
      }
    }
    /deep/.cell {
      font-size: 10px;
    }
  }
}
.Studybtn {
  position: absolute;
  width: 210px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12%;
  input {
    width: 90px;
    height: 30px;
    border-radius: 20px;
    color: #eaebfd;
    background: #6168fe;
    border: none;
  }

  .yes {
    margin-right: 30px;
  }
  .no {
    background: #acb0fa;
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
  .el-pagination {
    justify-content: center;
  }
}
.showStudents {
  .example-pagination-block {
    bottom: 0;
  }
}
</style>