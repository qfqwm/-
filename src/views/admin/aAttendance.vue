<template>
  <div class="locat">

      <!-- 按钮 -->
    <el-row>
      <el-button type="primary" size="large">
      <router-link to="/aAttendance">考勤记录</router-link>
      </el-button>
      <el-button type="primary" size="large">
      <router-link to="/aClockin">门禁考勤记录</router-link>
      </el-button>
    </el-row>
    <div class="header">
      <div class="block">
        <span>日期：</span>
        <el-date-picker
          v-model="value1"
          type="date"
          :default-value="new Date(2010, 9, 1)"
        />
      </div>
      <div class="blockwork">
        <span>院系：</span>
          <el-select v-model="fac" clearable placeholder="请选择">
          <el-option 
          v-for="item in facs" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value" />
        </el-select>
      </div>
      <div class="blockwork">
        <span>专业：</span>
         <el-select v-model="profession" clearable placeholder="请选择">
          <el-option v-for="item in professions" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value" />
        </el-select>
      </div>
      <div class="blockwork">
        <span>年级：</span>
          <el-select v-model="grade" clearable placeholder="请选择">
          <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="blockwork">
        <span>班级：</span>
        <el-select v-model="aclass" clearable placeholder="请选择">
          <el-option v-for="item in aclasss" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="header-1">
       <div class="blockTask">
        <span>项目名称：</span>
          <el-select v-model="entryname" clearable placeholder="请选择">
          <el-option v-for="item in entrynames" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
         <div class="blockTask">
        <span>实训老师：</span>
          <el-select v-model="trnTeacher" clearable placeholder="请选择">
          <el-option v-for="item in trnTeachers" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
     <div class="blockTask">
        <span>考勤记录：</span>
        <el-select v-model="attendancelist" clearable placeholder="请选择">
          <el-option v-for="item in attendancelists" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
         <div class="blockTask">
        <span>责任老师：</span>
         <el-select v-model="resTeacher" clearable placeholder="请选择">
          <el-option v-for="item in resTeachers" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="blockteacher">
        <span>学号：</span>
        <el-input v-model="stuid" />
      </div>
      <div class="blockteacher">
        <span>学员姓名：</span>
        <el-input v-model="name1" />
      </div>
      
      <div class="Icon">
        <el-button @click="test" >查询</el-button>
      </div>
      <div class="Icon">
        <el-button @click="reset">重置</el-button>
      </div>
    </div>

    <div class="showdata">
      <el-table
        :data="tableData"
        :header-cell-style="{ color: '#FFF', background: '#6168fe' }"
      >
        <el-table-column prop="attendanceDate" label="日期" />
        <el-table-column prop="groups" label="小组" />
        <el-table-column prop="collegeName" label="院系" />
        <el-table-column prop="proName" label="专业" />
        <el-table-column prop="grades" label="年级" />
        <el-table-column prop="classes" label="班级" />
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="practicalTeachers" label="实训老师" />
        <el-table-column prop="responsibleTeacher" label="责任老师" />
        <el-table-column prop="stuId" label="学号" />
        <el-table-column prop="stuRealname" label="姓名" />
        <el-table-column prop="attendanceStatus" label="考勤情况" />
        <el-table-column prop="signInTime" label="应签到" />
        <el-table-column prop="realSignInTIme" label="实签到" />
        <el-table-column prop="signOutTime" label="应签退" />
        <el-table-column prop="realSignOutTime" label="实签退" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="text" size="small"
              ><router-link to="/tnotpass">详情</router-link></el-button
            >
          
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
 
<script lang='ts'>
import {getaAttendance} from "@/api/index";
import { onMounted} from "vue";
import axios from "axios";
import { ref,reactive } from "vue";

export default {
  setup() {
  
    const stuid = ref("");
    const name1 = ref("");
    //院系
    const fac=ref("")
    const facs = [
      {
        value: "软件学院",
        label: "软件学院",
      },
      {
        value: "大数据学院",
        label: "大数据学院",
      },
      {
        value: "数字媒体学院",
        label: "数字媒体学院",
      },
    ];
    //专业
    const profession=ref("")
    const professions = [
      {
        value: "软件工程",
        label: "软件工程",
      },
      {
        value: "数字媒体",
        label: "数字媒体",
      },
      {
        value: "大数据采集",
        label: "大数据采集",
      },
    ];
    //年级
    const grade=ref("")
    const grades = [
      {
        value: "2019级",
        label: "2019级",
      },
      {
        value: "2020级",
        label: "2020级",
      },
      {
        value: "2021级",
        label: "2021级",
      },
    ];
    //班级
    const aclass=ref("")
    const aclasss = [
      {
        value: "19软工1班",
        label: "19软工1班",
      },
      {
        value: "19软工2班",
        label: "19软工2班",
      },
      {
        value: "19软工3班",
        label: "19软工3班",
      },
    ];
    //项目名称
    const entryname=ref("")
    const entrynames = [
      {
        value: "java实训项目",
        label: "java实训项目",
      },
      {
        value: "PHP实训项目",
        label: "PHP实训项目",
      },
      {
        value: "Python实训项目",
        label: "Python实训项目",
      },
    ];
    //实训老师
    const trnTeacher=ref("")
    const trnTeachers = [
      {
        value: "王明",
        label: "王明",
      },
      {
        value: "李明",
        label: "李明",
      },
      {
        value: "刘明",
        label: "刘明",
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
    //责任老师
    //   const  resTeacher=ref('')
    //   const resTeachers = [
    //   {
    //     value: "正常",
    //     label: "正常",
    //   },
    //   {
    //     value: "迟到",
    //     label: "迟到",
    //   },
    //   {
    //     value: "早退",
    //     label: "早退",
    //   },

    // ];
    
    

    onMounted(() => {
      loadData();

  });
  const loadData= async function () {
      await getData();
    };
     const object = reactive({ 
       collegeName: "",proName:'',grades:'',classes:'',projectName:'',practicalTeachers:'',attendanceStatus:'', stuId: "",
       stuRealname:""
       
       })
    //查询
    const test = () => {
        object.collegeName = fac.value
        object.proName = profession.value
        object.grades = grade.value
        object.classes= aclass.value,
        object.projectName = entryname.value
        object.practicalTeachers = trnTeacher.value
        object.attendanceStatus=attendancelist.value
        object.stuId = stuid.value;
          object.stuRealname = name1.value;

        // object.responsibleTeacher = resTeacher.value
        loadData()

    }
    // 重置
    const reset = () => {
      object.collegeName  = '',
      fac.value = '',
      object.proName = '',
      profession.value = '',
      object.grades= '',
      grade.value= '',
       object.classes='',
      aclass.value = '',
      object.projectName = '',
      entryname.value= '',
      object.practicalTeachers= ''  ,
      trnTeacher.value= '',
      stuid.value = "",
      object.stuId = "",
       object.stuRealname = "",
        name1.value="",


      // object.responsibleTeacher= '',
      // object.responsibleTeacher= '',
      attendancelist.value = '',
      object.attendanceStatus = '',
        getData()
    }
  const tableData : any  = ref();

  const getData = function () 
    {
    axios;
    getaAttendance(object).then(function (res) {
          if (res.data.flag == false) {
          return tableData.value = []
        }
        console.log(res)
        tableData.value = res.data.data.records.list;
      });
    };
    return {
      loadData,
      stuid,
      name1,
      tableData,
      fac,
      facs,
      profession,
      professions,
      grade,
      grades,
      aclass,
      aclasss,
      entryname,
      entrynames,
      trnTeacher,
      trnTeachers,
      attendancelist,
      attendancelists,
      // resTeacher,
      // resTeachers,
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
  background-image: url(../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;



//  按钮
.el-button{
  width: 230px;
  height: 54px;
  border-radius: 10px;
  margin-right: 50px;
  span{
    a{
      color: #edeeff;
      text-decoration:none;
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
.Icon .el-button{
  width: 58px;
  height: 30px;
  padding: 8px 15px;
  border-radius: 0px;
  margin-top: 5px;
  margin-right: 20px;
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
    margin-left: 40px;
    width:200px;
    height: 38px;
    background: #fff;
    border-radius: 20px;
    padding-left: 10px;
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
    /deep/.el-input__suffix{
      right: 60px;
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
        width: 65px;
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
    height: 60px;
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
    height: 50px;
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