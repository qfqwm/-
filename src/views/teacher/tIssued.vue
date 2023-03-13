<template>
  <div class="locat">
    <!-- 头部导航 -->
    <el-row class="titleStyle">
      <el-button type="primary" class="tit"
        ><router-link to="/tIssued">下发作业</router-link></el-button
      >
      <el-button type="primary" class="tit"
        ><router-link to="/tApproval">作业审批</router-link></el-button
      >
    </el-row>
    <!-- 按需查询 -->
    <div class="SearchBar">
      <div class="search">
        <span>发布日期：</span>
        <el-date-picker
          v-model="value"
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
        <el-select :options="proname" class="m-2" placeholder="项目名称：" size="large" v-model="pronames">
          <el-option
            v-for="item in proname"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>作业主题：</span>
        <el-select v-model="value" class="m-2" placeholder="作业主题：" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>实训老师：</span>
        <el-select :options="teas" class="m-2" placeholder="实训老师：" size="large" v-model="shiteac">
          <el-option
            v-for="item in teas"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <br />
      <div class="Search">
        <span>计划完成时间：</span>
        <el-date-picker
          v-model="value"
          type="date"
          placeholder="计划完成时间："
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          class="searchStyle"
        >
        </el-date-picker>
      </div>
      <div class="Search">
        <span>作业类型：</span>
        <el-select v-model="value" class="m-2" placeholder="作业类型：" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>老师：</span>
        <el-select v-model="value" class="m-2" placeholder="老师：" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-button @click="check">查询</el-button>
      <el-button  @click="reset">重置</el-button>
      <el-button @click="tag=true">新增</el-button>
    </div>
    <!-- 显示查询结果 -->
    <div class="result">
      <el-table :data="tabls">
        <el-table-column prop="homStarttime" label="发布时间" width="130" />
        <el-table-column prop="projectName" label="项目名称" width="160" />
        <el-table-column prop="homTitle" label="作业主题" width="160" />
        <el-table-column prop="noDealHomType" label="作业类型" width="160" />
        <el-table-column prop="teacherName" label="实训老师" width="100" />
        <el-table-column prop="homEndtime" label="计划完成时间" width="130" />
        <el-table-column prop="group" label="小组" width="140" />
        <el-table-column prop="totalNum" label="学生总数" width="90" />
        <el-table-column prop="toSubmit" label="待提交" width="90" />>
        <el-table-column prop="toApproved" label="待批复" width="90" />>
        <el-table-column prop="hasApproved" label="已批复" width="90" />
        <el-table-column label="操作" width="100">
          <!-- <el-button><router-link to="/dowork">操作</router-link></el-button> -->
          <template #default>
            <el-button type="text" size="small" @click="tag=true">查看</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


<!-- 弹出框 -->
    <div class="tags" v-show="tag">
      <h1>作业设置</h1>
      <div class="search" >
        <el-input v-model="input"  placeholder="作业主题" class="a" />
      </div>
        <div class="search">
      
         <el-input v-model="input1" placeholder="计划完成时间" type="date" class="b" />
         <el-select v-model="value" class="fen" placeholder="选择课程：" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
          <el-select v-model="value" class="fen" placeholder="作业类型：" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

       <el-select v-model="value" class="xiaozu" placeholder="选择小组：" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select><br>




          <el-select v-model="value" class="xiaozu" placeholder="选择学生：" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <div class="upload"></div>
         <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-change="handleChange"
    :file-list="fileList"
  >
  
     <el-button type="primary" class="uplo">上传附件</el-button>
   

   

      </el-upload>

       <div id="buts">
        <el-button
              type="primary"
              round
              class="el-button"
              @click="tag=false"
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
              @click="tag=false"
            >
              <img
                src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/取消.png"
                style="width: 40px"
              />取消</el-button>
      
        


        



    </div>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";
import { Check, Delete, Edit, Message, Search, Star } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import {teacHand} from "@/api/index";
import axios from "axios";
let  tabls=ref()
const pronames=ref()
const  proname =ref()
const teas=ref()
const value = ref("");
const tag=ref(false);
const shiteac=ref("")
const reset=()=>{
  shiteac.value=""
   pronames.value=""
}







let  object=reactive({projectName: ''})
const funing=(object)=> {
  teacHand(object).then((res)=>{
  tabls.value=res.data.data.homeworkList.list
  console.log( res.data.data.homeworkList.list)
  proname.value=res.data.data.GroupNameList
  teas.value=res.data.data.TeaList
  console.log( tabls.value)
  });
}


onMounted(()=>{check()})
 funing(object)

const check=()=> {
   object.projectName=pronames.value
   funing(object)
}




</script>

<style lang="less" scoped>

 #buts{
    position:absolute;
    margin-left:300px;
    margin-top:-20px;
    .el-button{
      height:40px;
      border-radius:8px;
      margin-left:20px;
    }
  }
 .a{
    height:40px;
 }
.upload{
  margin-top:10px;
  width:700px;
  height:140px;
  border-radius:20px;
  border:1px solid #7eb9f3;
 
}
.uplo{
  position:absolute;
  margin-left:500px;
  height:40px;
  border-radius:8px;
  // height:45px;
  margin-top:30px;
}


.b{
  // border:4px solid red;
  width:200px;
  margin-left:10px;
  
}

.xiaozu{
  padding:0 4px;
  margin-top:30px;
  width:680px;
  border:1px solid  #7eb9f3;
  border-radius:10px;
}
.tags {
  h1{
    margin-bottom:20px;
    text-align:center;
    color:#6168fe;
  }
  position: fixed;
  width: 700px;
  height: 500px;
  z-index: 555;
  margin-left: 300px;
  border: 2px solid #d1e4f7;
  border-radius:20px;
  padding:20px;
  background-color: white;
  .Search {
    // width:618px;
    //  background-Color:#f5f7fa;
    border: 1px solid #6168fe;;
    margin-top: 20px;
    border-radius: 5px;
    margin-left: 200px;

    // border:1px solid blue;
  }
}

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
  :nth-child(2) {
    background-color: #acb0fa;
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
  top: 270px;
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
    width: 240px !important;
    line-height: 38px;
    padding-left: 10px;
    border-radius: 20px;
    background: #fff;
    margin-left: 36px;
    width: 246px;
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
  .Search:nth-child(2) {
    margin-left: 90px;
    width: 280px;
    /deep/.el-input {
      width: 215px;
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
    margin-left: 90px;
    width: 280px;
    height: 38px;
    /deep/.el-input {
      width: 210px;
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
  .Search:nth-child(4) {
    margin-left: 90px;
    width: 280px;
    height: 38px;
    /deep/.el-input {
      width: 210px;
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
    width: 330px;
    height: 38px;
    margin-left: 35px;
    margin-right: 20px;
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
  .Search:nth-of-type(6) {
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
  .Search:nth-of-type(7) {
    width: 280px;
    height: 38px;
    margin-right: 50px;
    margin-left: 90px;
    /deep/.el-input {
      width: 220px;
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
