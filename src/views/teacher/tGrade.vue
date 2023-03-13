<template>
  <div class="locat">
    <!-- 头部导航 -->
    <el-row class="titleStyle">
      <el-button type="primary" class="tit">
        <router-link to="/tGrade">个人评分</router-link></el-button>
      
      <el-button type="primary" class="tit">
        <router-link to="/tgradex">小组评分</router-link></el-button>
    </el-row>
    <!-- 按需查询 -->
    <div class="SearchBar">
      
      <div class="Search">
        <span>项目名称：</span>
        <el-select
          v-model="projectName"
          class="m-2"
          placeholder="项目名称："
          size="large"
        >
          <el-option
            v-for="item in projectNames"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>小组名称：</span>
        <el-select
          v-model="groupName"
          class="m-2"
          placeholder="小组名称："
          size="large"
        >
          <el-option
            v-for="item in groupNames"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> 
      </div>
      
      
      
       <el-button @click="test">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <!-- 显示查询结果 -->
    <div class="result">
       <el-table :data="tableData">
        <el-table-column prop="collegeName" label="院系" width="170"/>
        <el-table-column prop="projectName" label="项目名称" width="170" />
        <el-table-column prop="teacherName" label="责任老师" width="170" />
        <el-table-column prop="groupName" label="小组" width="120" />
        <el-table-column prop="stuRealname" label="学生姓名" width="120" />
        <el-table-column prop="stuSex" label="性别" width="170" />
        <el-table-column prop="stuId" label="学号" width="150"/>
        <el-table-column prop="projectMember" label="项目角色" width="170"/>
        <el-table-column prop="proName" label="专业" width="100"/>
        <el-table-column label="操作" width="100">
          <!-- <el-button><router-link to="/dowork">操作</router-link></el-button> -->
        <template #default>
            <el-button type="text" size="small">
            <router-link to="/tgrade-edit">操作</router-link></el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang='ts'>

import { ref, reactive } from "vue";
import { score } from "@/api/index";
import { onMounted } from "vue";
export default{
  setup(){
    const value = ref("");
    const options= ref("");
// const options = [
//   {
//     value: "Option1",
//     label: "Option1",
//   },
// ];
    onMounted(() => {
      loadData1();
    });
    const tableData = ref();

    const getData = function () {
      score().then(function (res) {
        tableData.value = res.data.data.studentInfoList.list;
        console.log(res.data.data.studentInfoList);
      });
      // });
    };

    const loadData1 = async function () {
      await getData();
      // console.log(tableData);
    };

   //查询
    const test = () => {
      if(groupName.value=="java实训项目组1"){
          object.leaveStatus='0'
      }
      if(groupName.value=="java实训项目组2"){
          object.leaveStatus='1'
      }
      if(groupName.value=="java实训项目组3"){
          object.leaveStatus='2'
      }
      object.leaveType = projectName.value;
      loadData1();
    };
    const object = reactive({ leaveStatus: "", leaveType: "" });

    //重置
    const reset=()=>{
      groupName.value='',
      projectName.value='',
      object.leaveStatus='',
      object.leaveType=''
      getData()
    }
    
    const groupName = ref();
    const groupNames = [
      {
        value: "java实训项目组1",
        label: "java实训项目组1",
      },
      {
        value: "java实训项目组2",
        label: "java实训项目组2",
      },
      {
        value: "java实训项目组3",
        label: "java实训项目组3",
      },
    ];
    const projectName = ref();
    const projectNames = [
      {
        value: "java实训项目",
        label: "java实训项目",
      },
    
    ];


return{
  tableData,
  value,
  options,
  test,
  reset,
  groupNames,
  groupName,
  projectName,
  projectNames,

}
} 
}



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
  left: 32%;
  flex-wrap: nowrap;
  a {
    text-decoration: none;
    color: #fff;
    font-size: 30px;
  }
  :nth-child(2) {
    background-color: #acb0fa;
  }
  :nth-child(3) {
    background-color: #acb0fa;
  }
}

.tit {
  width: 200px;
  height: 50px;
  right: 200px;
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
    margin-left: 210px;
    border-radius: 20px;
    background: #fff;
  }
 
 
  .Search:nth-child(1) {
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
  .Search:nth-child(2) {
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
  background: url("../../../public/4.教师信息管理系统/5.教师信息管理系统-综合打分/1.教师信息系统界面-综合打分-个人评分图标/下拉1.png")
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