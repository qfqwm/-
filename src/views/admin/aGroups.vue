<template>
  <div class="locat">
    <!-- 搜索部分 -->
    <div class="SearchBar">
      <div class="Search">
        <span>小组名称：</span>
        <el-select v-model="groupName" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in groupNames"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="Search">
        <span>学员姓名：</span>
        <el-input v-model="input" />
      </div>
      <div class="Search">
        <span>学号：</span>
        <el-input v-model="input" />
      </div>
      <el-button @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <!-- 导航栏 -->
    <div class="navBar">
      <el-row class="navBarLeft">
        <el-button type="primary" round>查看未结业分组</el-button>
        <el-button type="primary" round>查看已结业分组</el-button>
      </el-row>
      <el-row class="navBarRight">
        <el-button type="primary" @click="tag = true" round>新增分组</el-button>
        <el-button type="primary" @click="member = true" round>新增成员</el-button>
        <el-button type="primary" @click="groupUpdate = true" round>更新分组</el-button>
        <el-button type="primary" round>批量删除</el-button>
      </el-row>
    </div>

    <div class="showdata">
      <div class="left">
        <div class="left-a"><span>　项目分组</span></div>
        <div class="left-b"><span>　查看所有分组成员</span></div>
        <div class="left-d">
          <el-table :data="tableData">
            <el-table-column prop="group_name" width="135"/>
            <el-table-column width="110">
              <template #default>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
                <el-button type="text" size="small">增加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="right">
        <el-table :data="tableData">
          <el-table-column prop="group_name" label="小组名称" width="150"/>
          <el-table-column prop="college_name" label="院系" width="130"/>
          <el-table-column prop="major" label="专业" width="130"/>
          <el-table-column prop="stu_grade" label="年级" width="120"/>
          <el-table-column prop="stu_class" label="班级" width="120"/>
          <el-table-column prop="teacher_id" label="班主任" width="80"/>
          <el-table-column prop="stu_realname" label="学员姓名" width="80"/>
          <el-table-column prop="stu_id" label="学号" width="100"/>
          <el-table-column prop="stu_idcard" label="身份证号码" width="100"/>
          <el-table-column prop="stu_sex" label="性别" width="60"/>
          <el-table-column prop="stu_email" label="邮箱" width="150"/>
          <el-table-column prop="stu_phone" label="手机号" width="150"/>
          <el-table-column prop="projectRole" label="项目角色" width="120"/>
          <el-table-column prop="is_leader" label="设置组长" width="60"/>
          <el-table-column label="操作" width="100">
            <template #default="course">
              <el-button type="text" size="small">删除</el-button>
              <el-button type="text" size="small" @click='groupUpdate=true'>更换分组</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div> 

  <!-- 新增分组弹窗 -->
  <div class="groupAdd" v-show="tag">
    <h1>项目分组</h1>
    <el-form label-width="120px">
      <el-form-item label="小组名称：">
        <el-input/>
      </el-form-item>
      <el-form-item label="是否已结业：">
        <el-checkbox-group>
          <el-checkbox label="是" name="type" />
          <el-checkbox label="否" name="type" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="buts">
      <el-button type="primary" round class="el-button" @click="tag=false">
        <img src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/确定.png"
          style="width: 40px"/>确认
      </el-button>
      <el-button type="primary" round class="el-button" @click="tag=false">
        <img src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/取消.png"
          style="width: 40px"/>取消
      </el-button>
    </div>
  </div>

  <!-- 新增成员弹窗 -->
  <div class="memberAdd" v-show="member">
    <h1>新增成员</h1>
    <div class="me-searchBar">
      <div class="me-search">
        <span>院系：</span>
        <el-select v-model="department" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in departments"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="me-search">
        <span>专业：</span>
        <el-select v-model="value" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="me-search">
        <span>年级：</span>
        <el-select v-model="value" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <br>
      <div class="me-search">
        <span>班级：</span>
        <el-select v-model="value" class="m-2" placeholder=" " size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="me-search">
        <span>学员姓名：</span>
        <el-input v-model="input" />
      </div>
      <div class="me-search">
        <span>学号：</span>
        <el-input v-model="input" />
      </div>
      <el-button @click="query">查询</el-button>
      <el-button>重置</el-button>
    </div>
    <div class="me-result">
      <el-table :data="tableData_result">
        <el-table-column prop="group_name" label="小组名称" width="80"/>
        <el-table-column prop="college_name" label="院系" width="80"/>
        <el-table-column prop="major" label="专业" width="80"/>
        <el-table-column prop="stu_grade" label="年级" width="80"/>
        <el-table-column prop="stu_class" label="班级" width="80"/>
        <el-table-column prop="tea_name" label="班主任" width="80"/>
        <el-table-column prop="stu_realname" label="学员姓名" width="80"/>
        <el-table-column prop="stu_id" label="学号" width="80"/>
        <el-table-column prop="stu_idcard" label="身份证号码" width="100"/>
        <el-table-column prop="stu_sex" label="性别" width="60"/>
        <el-table-column prop="stu_email" label="邮箱" width="100"/>
        <el-table-column prop="stu_phone" label="手机号" width="100"/>
        <el-table-column prop="projectRole" label="项目角色" width="80"/>
      </el-table>
    </div>
    <div class="buts">
      <el-button type="primary" round class="el-button" @click="member=false">
        <img src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/确定.png"
          style="width: 40px"/>确认
      </el-button>
      <el-button type="primary" round class="el-button" @click="member=false">
        <img src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/取消.png"
          style="width: 40px"/>取消
      </el-button>
    </div>
  </div>

  <!-- 更新分组弹框 -->
  <div class="groupUpdate" v-show="groupUpdate">
    <h1>更换分组</h1>
    <div class="groupSearch">
      <span>请选择新分组：</span>
      <el-select v-model="updategroup" class="m-2" placeholder=" " size="large">
        <el-option
          v-for="item in updategroups"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="buts">
      <el-button type="primary" round class="el-button" @click="groupUpdate=false">
        <img src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/确定.png"
          style="width: 40px"/>确认
      </el-button>
      <el-button type="primary" round class="el-button" @click="groupUpdate=false">
        <img src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/取消.png"
          style="width: 40px"/>取消
      </el-button>
    </div>
  </div>
</template>
 
<script lang='ts' setup>
import { ref,reactive} from "@vue/reactivity";
import { onMounted } from "vue";
import { getGroups} from "@/api/index";

const input = ref('')
const groupName = ref('')
const value = ref("")
const tableData = ref();
const tableData_result = ref();
const options:any= ref()
const updategroup = ref()
const department = ref() //院系查询绑定

const tag=ref(false)
const member=ref(false)
const groupUpdate=ref(false)

const object=reactive({projectTeamName:''})

const groupNames = [
  {
    value:"java实训项目组1",
    label:"java实训项目组1",
  },
  {
    value:"php",
    label:"php",
  }
]
const updategroups = [
  {
    value:"java实训项目组1",
    label:"java实训项目组1",
  },
  {
    value:"php",
    label:"php",
  }
]
const departments = [
  {
    value:"软件学院",
    label:"软件学院",
  },
  {
    value:"管理学院",
    label:"管理学院",
  }
]
onMounted(() => {
  loadData();
});
const query=()=>{
  object.projectTeamName = groupName.value
  loadData();
}
const loadData = async function () {
  await getData();
};
const getData =() => {
  getGroups(object).then((res) => {
    console.log(res.data.data);
    tableData.value=res.data.data;
    tableData_result.value = res.data.data;
  });
}

//重置
const reset=()=>{
  groupName.value='',
  // object.group_name=''
  getData()
}
// onMounted(() => {
//   getGroups(object).then((res) => {
//     console.log(res.data.data);
//     tableData.value=res.data.data;
//   });
// });

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
}
.SearchBar {
  margin-top: 120px;
  width: 100%;
  height: 50px;
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
  .Search:nth-child(1) {
    margin-left: 100px;
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
  .Search:nth-child(2) {
    margin-left: 100px;
    width: 250px;
    /deep/.el-input {
      --el-input-hover-border-color: none;
      --el-color-primary: none;
      width: 185px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
        --el-input-border-color: none;
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
    margin-left: 100px;
    margin-right: 100px;
    width: 250px;
    /deep/.el-input {
      --el-input-hover-border-color: none;
      --el-color-primary: none;
      width: 185px;
      height: 38px;
      .el-input__inner {
        padding-left: 10px !important;
        height: 38px;
        line-height: 38px;
        border-radius: 0 20px 20px 0;
        --el-input-border-color: none;
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
.navBar{
  margin-top: 40px;
  width: 100%;
  height: 60px;
  flex-wrap: nowrap;
  /deep/.el-button--primary{
    --el-button-bg-color: #acb0fa;
    --el-button-hover-bg-color: #6168fe;
  }
  .navBarLeft{
    height: 40px;
    margin-left: 60px;
    float: left;
    /deep/span{
      font-size: 24px;
    }
    /deep/.el-button{
      height: 40px;
    }
  }
  .navBarRight{
    flex-wrap: nowrap;
    margin-left: 100px;
    float: left;
    /deep/.el-button{
      margin-top: 8px;
    }
  }
}
.showdata{
  .left{
    z-index: 1;
    width: 250px;
    height: 500px;
    margin-left: 5px;
    background: #fff;
    border-radius: 10px;
    box-shadow: #bbb 2px 2px 2px;
    .left-a span{
      color: #6168fe;
    }
    .left-b span{
      color: #7b80c4;
      font-size: 16px;
    }
    /deep/.cell{
      justify-content: center;
      display: flex;
      flex-wrap: nowrap;
    }
    .left-d{
      margin-top: 5px;
      /deep/[data-v-30c750ab] thead tr{
        height: 0;
        th{
          background-color:#fff;
        }
      }
      /deep/[data-v-30c750ab] .el-table__row td{
        background-color: #fff;
      }
    }
  }
}
.right {
  z-index: 1;
  position: absolute;
  top: 270px;
  .el-table {
    margin-left: 265px;
    width: 1240px;
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

//新建分组弹窗
.groupAdd{
  position: fixed;
  z-index: 555;
  width: 600px;
  height: 420px;
  border: 1px solid #fff;
  background-color: #fff;
  border-radius: 15px;
  margin-top: -800px;
  margin-left: 750px;
  h1{
    color: #6168fe;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  /deep/.el-form-item__label{
    color: #6168fe;
    font-size: 20px;
  }
  /deep/.el-input{
    width: 300px;
    border: none;
    // border-radius: 10px;
    .el-input__inner{
      border-radius: 10px;
      border: 1px solid #6168fe;
    }
  }
  /deep/.el-form-item{
    margin-bottom: 5%;
    margin-left: 15%;
  }
  /deep/.el-checkbox__inner{
    border: 1px solid #6168fe;
  }
  /deep/.el-checkbox__label{
    font-size: 20px;
    color: #6168fe;
  }
  .buts{
    position:absolute;
    margin-left:150px;
    margin-top:80px;
    .el-button{
      height:40px;
      border-radius:15px;
      margin-left:40px;
    }
  }
}

//新增成员弹窗
.memberAdd{
  position: fixed;
  z-index: 555;
  width: 1200px;
  height: 680px;
  border: 1px solid #fff;
  background-color: #f7f7f7;
  border-radius: 15px;
  margin-top: -1000px;
  margin-left: 650px;
  h1{
    color: #6168fe;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .me-searchBar {
    width: 100%;
    height: 100px;
    a {
      text-decoration: none;
    }

    .me-search {
      display: inline-block;
      width: 300px;
      height: 38px;
      margin-bottom: 15px;
      line-height: 38px;
      padding-left: 8px;
      margin-left: 30px;
      border-radius: 20px;
      background: #fff;
    }
    /deep/.el-input{
      --el-input-focus-border-color:none;
      width: 220px;
    }
    /deep/.el-input .el-input__inner{
      box-shadow: none;
      border: none;
    }
    /deep/.el-input--large .el-input__suffix{
      right: -10px;
    }
    .me-search:nth-child(6){
      /deep/.el-input{
        width: 180px;
      }
    }
    .me-search:nth-child(7){
      margin-right: 12px;
    }
  }
  .me-result{
    width: 1080px;
    margin: 10px auto;
  }
  .buts{
    position:absolute;
    margin-left: 430px;
    margin-top:10px;
    .el-button{
      height:40px;
      border-radius:15px;
      margin-left:40px;
    }
  }

  
}
//更新分组
.groupUpdate{
  position: fixed;
  z-index: 555;
  width: 600px;
  height: 420px;
  border: 1px solid #fff;
  background-color: #fff;
  border-radius: 15px;
  margin-top: -800px;
  margin-left: 750px;
  h1{
    color: #6168fe;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .groupSearch{
    text-align: center;
    span{
    color: #6168fe;
    }
    .el-select[data-v-30c750ab]{
      width: 300px;
      border: 1px solid #999999;
      border-radius: 12px;
      /deep/.el-input--large.el-input--suffix .el-input__inner{
        border-radius: 12px;
      }
    }
  }
  .buts{
    position:absolute;
    margin-left:150px;
    margin-top:130px;
    .el-button{
      height:40px;
      border-radius:15px;
      margin-left:40px;
    }
  }
}
</style>