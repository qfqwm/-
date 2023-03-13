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
            :key="item.project_id"
            :label="item.project_name"
            :value="item.project_name"
          />
        </el-select>
      </div>
      <!-- 实训老师 -->
      <div class="Search">
        <span>实训老师：</span
        ><el-select v-model="Trainingteacher" clearable placeholder="Select">
          <el-option
            v-for="item in Trainingteachers"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 责任老师 -->
      <div class="Search">
        <span>责任老师：</span
        ><el-select v-model="Responsibleteacher" clearable placeholder="Select">
          <el-option
            v-for="item in Responsibleteachers"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="Icon">
        <el-button type="primary">查询</el-button>
      </div>
      <div class="Icon">
        <el-button type="primary">重置</el-button>
      </div>
      <div class="Icon">
        <el-button @click="add()" type="primary">新增 </el-button>
      </div>
    </div>

    <div class="showdata">
      <el-table :data="table">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="项目名称" />
        <el-table-column prop="name" label="实训老师" />
        <el-table-column prop="name" label="责任老师" />
        <el-table-column prop="name" label="签到时间" />
        <el-table-column prop="name" label="签退时间" />
        <el-table-column prop="address" label="教室" />
        <el-table-column prop="address" label="备注" />
        <el-table-column label="操作">
          <template #default="course">
            <!-- 后期传id -->
            <span @click="selectStudy(course.row.id)">选择学生</span>
            <span @click="edit(course.row.id)">编辑</span>
            <span @click="deletecourse(course.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 蒙版 -->
    <div v-show="isshow" class="Mask">
      <!-- 新增弹框 -->
      <div class="add" v-show="isadd">
        <h1>项目名称设置</h1>
        <!-- 搜索区域 -->
        <div class="addSearch">
          <!-- 日期 -->
          <div class="addSearchinput">
            <span>日期：</span>
            <el-date-picker
              v-model="addtime"
              type="date"
              placeholder="Pick a day"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            >
            </el-date-picker>
          </div>
          <div class="addSearchinput">
            <span>项目名称：<input type="text" v-model="addentryname" /></span>
          </div>
          <div class="addSearchinput">
            <span>实训老师：</span
            ><el-select
              v-model="addTrainingteacher"
              clearable
              placeholder="Select"
            >
              <el-option
                v-for="item in addTrainingteachers"
                :key="item.training_teacher_id"
                :label="item.training_teacher_name"
                :value="item.training_teacher_id"
              />
            </el-select>
          </div>
          <br />
          <div class="addSearchinput">
            <span>责任老师：</span
            ><el-select
              :options="addResponsibleteacher"
              clearable
              placeholder="Select"
            >
              <el-option
                v-for="item in addResponsibleteachers"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <!-- <div class="addSearchinput">
            <span>签到日期：</span>
            <el-date-picker
              v-model="addCheckIndate"
              type="date"
              placeholder="Pick a day"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            >
            </el-date-picker>
          </div> -->
          <div class="addSearchinput">
            <span>签到时间：</span>
            <el-time-picker
              v-model="addCheckIndate"
              :disabled-hours="disabledHours"
              :disabled-minutes="disabledMinutes"
              :disabled-seconds="disabledSeconds"
              placeholder="Arbitrary time"
            />
          </div>

          <div class="addSearchinput">
            <span>签退时间：</span>
            <el-time-picker
              v-model="addSignOutdate"
              :disabled-hours="disabledHours"
              :disabled-minutes="disabledMinutes"
              :disabled-seconds="disabledSeconds"
              placeholder="Arbitrary time"
            />
          </div>
          <!-- <div class="addSearchinput">
            <span>签退日期：</span>
            <el-date-picker
              v-model="addSignOutdate"
              type="date"
              placeholder="Pick a day"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            >
            </el-date-picker>
          </div> -->
          <br />
          <div class="addSearchinput">
            <span>教室：</span>
            <input type="text" v-model="classroom" />
          </div>
          <br />
          <div class="addSearchinput">
            <span>备注：</span>
            <input type="text" v-model="remarks" />
          </div>
        </div>
        <el-row class="mb-4">
          <el-button type="primary" round class="el-button" @click="addyes()">
            <img
              src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/确定.png"
              style="width: 40px"
            />确认</el-button
          >
          <el-button type="primary" round class="el-button" @click="addno()">
            <img
              src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/取消.png"
              style="width: 40px"
            />取消</el-button
          >
        </el-row>
      </div>
      <!-- 选择学生弹框 -->
      <div class="SelectStudents" v-show="isselect">
        <h1>选 择 学 生</h1>
        <div class="SelectStudentsinput">
          <span>选择分组：</span>
          <el-select
            v-model="Selectgrouping"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="Choose tags for your article"
          >
            <el-option
              v-for="item in Selectgroupings"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="SelectStudentsinput">
          <span>选择学生：</span>
          <el-select
            v-model="Selectstudent"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="Choose tags for your article"
          >
            <el-option
              v-for="item in Selectstudents"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-row class="mb-4">
            <el-button
              type="primary"
              round
              class="el-button"
              @click="selectyes()"
            >
              <img
                src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/确定.png"
                style="width: 40px"
              />确认</el-button
            >
            <el-button
              type="primary"
              round
              class="el-button"
              @click="selectno()"
            >
              <img
                src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/取消.png"
                style="width: 40px"
              />取消</el-button
            >
          </el-row>
        </div>
      </div>
      <!-- 编辑弹窗 -->
      <div class="add" v-show="isedit">
        <h1>编　辑</h1>
        <!-- 搜索区域 -->
        <div class="addSearch">
          <!-- 日期 -->
          <div class="addSearchinput">
            <span>日期：</span>
            <el-date-picker
              v-model="edittime"
              type="date"
              placeholder="Pick a day"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            >
            </el-date-picker>
          </div>
          <div class="addSearchinput">
            <span>项目名称：</span
            ><el-select v-model="editentryname" clearable placeholder="Select">
              <el-option
                v-for="item in editentrynames"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="addSearchinput">
            <span>实训老师：</span
            ><el-select
              v-model="editTrainingteacher"
              clearable
              placeholder="Select"
            >
              <el-option
                v-for="item in editTrainingteachers"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <br />
          <div class="addSearchinput">
            <span>责任老师：</span
            ><el-select
              v-model="editResponsibleteacher"
              clearable
              placeholder="Select"
            >
              <el-option
                v-for="item in editResponsibleteachers"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="addSearchinput">
            <span>签到日期：</span>
            <el-date-picker
              v-model="editCheckIndate"
              type="date"
              placeholder="Pick a day"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            >
            </el-date-picker>
          </div>
          <div class="addSearchinput">
            <span>签退日期：</span>
            <el-date-picker
              v-model="editSignOutdate"
              type="date"
              placeholder="Pick a day"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            >
            </el-date-picker>
          </div>
          <br />
          <div class="addSearchinput">
            <span>教室：</span>
            <input type="text" v-model="editclassroom" />
          </div>
          <br />
          <div class="addSearchinput">
            <span>备注：</span>
            <input type="text" v-model="editremarks" />
          </div>
        </div>
        <el-row class="mb-4">
          <el-button type="primary" round class="el-button" @click="edityes()">
            <img
              src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/确定.png"
              style="width: 40px"
            />确认</el-button
          >
          <el-button type="primary" round class="el-button" @click="editno()">
            <img
              src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/取消.png"
              style="width: 40px"
            />取消</el-button
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, toRefs } from "@vue/reactivity";
import {
  chooseGroup,
  trainingTeacherIdAndName,
  teacherIdAndName,
  Viewcourses,
  ViewcoselectProjectIdAndNameurses,
} from "@/api/index";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const time = ref("");
    // 判断蒙版是否开启 共用一个蒙板
    const isshow = ref(false);
    const isadd = ref(false);
    const isselect = ref(false);
    const isedit = ref(false);
    const add = () => {
      // 开启蒙板
      isshow.value = true;
      isadd.value = true;
    };
    const selectStudy = () => {
      // 开启蒙板
      isshow.value = true;
      isselect.value = true;
    };
    const edit = () => {
      // 开启蒙板
      isshow.value = true;
      isedit.value = true;
    };

    const addyes = () => {
      // 关闭蒙版
      isshow.value = false;
      isadd.value = false;     
    };
    const addno = () => {
      // 关闭蒙版
      isshow.value = false;
      isadd.value = false;
    };
    const selectyes = () => {
      // 关闭蒙版
      isshow.value = false;
      isselect.value = false;
    };
    const selectno = () => {
      // 关闭蒙版
      isshow.value = false;
      isselect.value = false;
    };
    const edityes = () => {
      // 关闭蒙版
      isshow.value = false;
      isedit.value = false;
    };
    const editno = () => {
      // 关闭蒙版
      isshow.value = false;
      isedit.value = false;
    };
    const entryname = ref();
    const entrynames = ref();
    const Responsibleteacher = ref();
    const Trainingteacher = ref();
    const Responsibleteachers = ref();
    const Trainingteachers = ref();
    const table = ref();
    const addentryname = ref();
    const addtime = ref();
    const addTrainingteacher = ref();
    const addTrainingteachers = ref();
    const addResponsibleteachers = ref();
    const addResponsibleteacher = ref();
    const addCheckIndate = ref();
    const addSignOutdate = ref();
    const classroom = ref();
    const remarks = ref();
    const Selectgrouping = ref<string[]>([]);
    const Selectstudents = ref<string[]>([]);
    const Selectgroupings = ref();
    const Selectstudent = ref();
    const edittime = ref();
    const editentryname = ref();
    const editentrynames = ref();
    const editTrainingteacher = ref();
    const editTrainingteachers = ref();
    const editResponsibleteacher = ref();
    const editResponsibleteachers = ref();
    const editCheckIndate = ref();
    const editSignOutdate = ref();
    const editclassroom = ref();
    const editremarks = ref();
    onMounted(() => {
      ViewcoselectProjectIdAndNameurses().then(function (res) {
        entrynames.value = res.data.data;
      });
      // 获取下拉框小组
      chooseGroup().then(function (res) {
        console.log(1, res);
      });
      // 新增实训老师数据请求
      trainingTeacherIdAndName().then(function (res) {
        addTrainingteachers.value = res.data.data;
      });
      // 新增责任老师数据请求----没数据
      teacherIdAndName().then(function (res) {
        console.log(3, res);
      });
    });

    // 删除
    // const deletecourse = (id: any) => {
    //   for (let i = tableData.data.length - 1; i >= 0; i--) {
    //     if (tableData.data[i].id == id) {
    //       var index = tableData.data.indexOf(tableData.data[i]);
    //       tableData.data.splice(index, 1);
    //       return;
    //     }
    //   }
    // };

    // const tableData = reactive({
    //   data: [
    //     {
    //       id: 1,
    //       date: "2016-05-04",
    //       name: "Tom",
    //       state: "事假",
    //       city: "Los Angeles",
    //       address: "No. 189, Grove St, Los Angeles",
    //       zip: "CA 90036",
    //       tag: "Home",
    //       caozuo: "查看学生",
    //     },
    //     {
    //       id: 2,
    //       date: "2016-05-01",
    //       name: "Tom",
    //       state: "事假",
    //       city: "Los Angeles",
    //       address: "No. 189, Grove St, Los Angeles",
    //       zip: "CA 90036",
    //       tag: "Office",
    //       caozuo: "查看学生",
    //     },
    //     {
    //       id: 3,
    //       date: "2016-05-01",
    //       name: "Tom",
    //       state: "病假",
    //       city: "Los Angeles",
    //       address: "No. 189, Grove St, Los Angeles",
    //       zip: "CA 90036",
    //       tag: "Office",
    //       caozuo: "查看学生",
    //     },
    //     {
    //       id: 4,
    //       date: "2016-05-01",
    //       name: "Tom",
    //       state: "病假",
    //       city: "Los Angeles",
    //       address: "No. 189, Grove St, Los Angeles",
    //       zip: "CA 90036",
    //       tag: "Office",
    //       caozuo: "查看学生",
    //     },
    //     {
    //       id: 5,
    //       date: "2016-05-01",
    //       name: "Tom",
    //       state: "病假",
    //       city: "Los Angeles",
    //       address: "No. 189, Grove St, Los Angeles",
    //       zip: "CA 90036",
    //       tag: "Office",
    //       caozuo: "查看学生",
    //     },
    //     {
    //       id: 6,
    //       date: "2016-05-01",
    //       name: "Tom",
    //       state: "病假",
    //       city: "Los Angeles",
    //       address: "No. 189, Grove St, Los Angeles",
    //       zip: "CA 90036",
    //       tag: "Office",
    //       caozuo: "查看学生",
    //     },
    //   ],
    // });
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
      time,
      // ...toRefs(tableData),
      isadd,
      isselect,
      isshow,
      isedit,
      entryname,
      entrynames,
      Responsibleteacher,
      Responsibleteachers,
      Trainingteachers,
      Trainingteacher,
      table,
      addentryname,
      addtime,
      addTrainingteacher,
      addTrainingteachers,
      addResponsibleteachers,
      addResponsibleteacher,
      addCheckIndate,
      addSignOutdate,
      classroom,
      remarks,
      Selectgrouping,
      Selectstudent,
      Selectgroupings,
      Selectstudents,
      edittime,
      editentryname,
      editentrynames,
      editResponsibleteacher,
      editResponsibleteachers,
      editCheckIndate,
      editSignOutdate,
      editclassroom,
      editremarks,
      editTrainingteacher,
      editTrainingteachers,
      edit,
      add,
      selectStudy,
      addyes,
      addno,
      selectyes,
      selectno,
      edityes,
      editno,
      dates,
      // deletecourse,
    };
  },
};
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
.Mask {
  position: absolute;
  width: 100%;
  height: 1080px;
  z-index: 999;
  opacity: 1;
}
.add {
  width: 980px;
  height: 600px;
  position: relative;
  border: 3px solid #ebeafc;
  border-radius: 20px;
  padding-top: 36px;
  top: 18%;
  left: 15%;
  background: #f7f7f7;
  h1 {
    text-align: center;
    color: #5660fe;
  }

  .addSearch {
    /deep/.el-icon svg {
      display: none;
    }
    height: 350px;
    margin-top: 20px;
    .addSearchinput {
      display: inline-block;
      height: 45px;
      line-height: 45px;
      padding-left: 10px;
      border-radius: 20px;
      background: #fff;
    }
    .addSearchinput:nth-of-type(1) {
      margin-left: 36px;
      width: 240px;
      /deep/.el-input {
        width: 190px;
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
    .addSearchinput:nth-of-type(2) {
      margin-left: 36px;
      input {
        height: 40px;
        width: 225px;
        border: none;
        outline: none;
        border-radius: 20px;
      }
    }
    .addSearchinput:nth-of-type(3) {
      margin-left: 36px;
      width: 270px;
      /deep/.el-input {
        width: 190px;
      }
    }
    .addSearchinput:nth-of-type(4) {
      margin-top: 45px;
      margin-left: 36px;
      width: 240px;
      /deep/.el-input {
        width: 160px;
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
    .addSearchinput:nth-of-type(5) {
      margin-left: 36px;
      width: 305px;
      /deep/.el-input {
        width: 225px;
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
    .addSearchinput:nth-of-type(6) {
      margin-left: 36px;
      width: 270px;
      /deep/.el-input {
        width: 190px;
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
    .addSearchinput:nth-of-type(7),
    .addSearchinput:nth-of-type(8) {
      margin-top: 45px;
      margin-left: 36px;
      width: 910px;
      input {
        width: 800px;
        height: 45px;
        border: none;
        outline: none;
        border-radius: 20px;
      }
    }
  }
  .el-row {
    margin: 30px auto;
    border-radius: 30px;
    width: 345px;
    .el-button {
      width: 140px;
      height: 60px;
      background-color: #6168fe;
      font-size: 20px;
      span {
        img {
          margin-right: 10px;
        }
      }
    }
    .el-button:nth-of-type(2) {
      margin-left: 60px;
      background-color: #acb0fa;
    }
  }
}
// 选择学生弹框
.SelectStudents {
  width: 980px;
  height: 600px;
  position: relative;
  border: 3px solid #ebeafc;
  border-radius: 20px;
  padding-top: 36px;
  top: 18%;
  left: 15%;
  background: #f7f7f7;
  h1 {
    text-align: center;
    color: #5660fe;
  }
  .SelectStudentsinput {
    /deep/.el-icon svg {
      display: none;
    }
    width: 90%;
    margin: 80px auto 0;
    height: 45px;
    line-height: 45px;
    padding-left: 10px;
    border-radius: 20px;
    background: #fff;
    /deep/.el-input {
      width: 800px;
    }
    .el-row {
      margin: 120px auto;
      border-radius: 30px;
      width: 345px;
      .el-button {
        width: 140px;
        height: 60px;
        background-color: #6168fe;
        font-size: 20px;
        span {
          img {
            margin-right: 10px;
          }
        }
      }
      .el-button:nth-of-type(2) {
        margin-left: 60px;
        background-color: #acb0fa;
      }
    }
  }
}
</style>