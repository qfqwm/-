<template>
  <div class="locat">
    <div class="topdiv">
      <div class="Search">
        <span>教师姓名：</span
        ><el-select :options="teachers" placeholder="Select" v-model="teach">
          <el-option v-for="item in teachers" :label="item" :value="item" />
        </el-select>
      </div>
      <div class="Search">
        <span>身份证号：</span
        ><el-input placeholder="Select" v-model="mess.shen"> </el-input>
      </div>
      <div class="Search">
        <span>工号：</span><el-input placeholder="Select" v-model="mess.gh"> </el-input>
      </div>
      <div class="Search">
        <span>手机号码：</span
        ><el-input placeholder="Select" v-model="mess.number"> </el-input>
      </div>
      <div class="Search">
        <span>状态：</span
        ><el-select placeholder="Select" v-model="mess.ztai"> </el-select>
      </div>
      <div class="Search">
        <br />
        <div class="doing">
          <el-button type="primary" @click="tag = true">新增班级</el-button>
          <el-button type="primary" @click="check">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </div>
    </div>

    <div class="showdata">
      <el-table :data="showtab">
        <el-table-column prop="collegeName" label="院系" />
        <el-table-column prop="proName" label="专业" />
        <el-table-column prop="classesGrade" label="年级" />
        <el-table-column prop="teacherName" label="班主任" />
        <el-table-column prop="name" label="是否已结业" />
        <el-table-column prop="classesNum" label="学员总数" />

        <el-table-column label="操作">
          <template #default="course">
            <el-button @click="bianji(course.row)" type="primary">编辑</el-button>
            <el-button type="primary" @click="pushs(course.row)">学员明细</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增 -->

      <div class="add" v-show="tag">
        <h1>班级信息维护</h1>
        <div class="addteacher">
          <div class="spl">
            <span>院系：</span
            ><el-select   clearable placeholder="Select"> </el-select>
          </div>

          <div class="spl">
            <span>专业：</span
            ><el-select  clearable placeholder="Select"> </el-select>
          </div>

          <div class="spl">
            <span>年级：</span
            ><el-select   clearable placeholder="Select"> </el-select>
          </div>

          <div class="spl">
            <span>班级：</span>
            <el-input v-model="details.stuId" placeholder="Select"> </el-input>
          </div>

          <div class="spl">
            <span>班级id：</span>
            <el-input   clearable placeholder="Select"> </el-input>
          </div>

          <div class="spl">
            <span>班主任：</span
            ><el-select   clearable placeholder="Select"> </el-select>
          </div>

          <div class="spl">
            <!-- 写死 -->
            <span>是否已结业：</span
            ><el-select placeholder="Select">
              <el-option
                循环选项
                v-for="item in jieye"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div class="buts">
            <el-button type="primary" round class="el-button" @click="tag = false">
              <img
                src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/确定.png"
                style="width: 40px"
              />确认</el-button
            >
            <el-button type="primary" round class="el-button" @click="tag = false">
              <img
                src="../../../public/2.管理员系统界面/4.管理员系统界面-课程管理/2.管理员系统界面-课程管理界面-新增图标/取消.png"
                style="width: 40px"
              />取消</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { stuMess , addClass} from "@/api/index";
import axios from "axios";
import { onMounted } from "vue";
// 这里定义要查询的东西
const mess = reactive({
  // teacher接收值去上面遍历
  teachername: "",
  shen: "",
  gh: "",
  number: "",
  ztai: "",
});
//重置
const reset=()=> {
  teach.value=""


}

// 定义要渲染的数据
const showtab = ref("");
const teachers = ref("");
const usefun = () => {
  stuMess().then((res) => {
    showtab.value = res.data.data.list.list;
    teachers.value = res.data.data.TeacherList;
    
  });
};






onMounted(() => {
  usefun();
});





// // 查询要绑定的数据
// const teach = ref("");
// const check = () => {
//   const paramsq = new URLSearchParams();
//   paramsq.append("teacherName", teach.value);
//   axios.get("http://47.115.216.81:8888/classInfo/selectClass", paramsq).then((res) => {
//     teachers.value = res.data.data.TeacherList;
//     console.log(res.data.data.TeacherList);
//   });
// };







// 此处是要拿到的最开始的所有数据
const datalist = ref("");
const teachname = ref("");

const router = useRouter();
const tag = ref(false);
const pushs = (x) => {
  router.push({
    name: "aa",
    query: {
      id: x,
    },
  });
};

// 定义是否结业
const jieye = [
  { value: "1", label: "是" },
  { value: "2", label: "否" },
];

// 定义展示详情的那个对象
const details = ref("");
// 展示详情的时候绑定这个details对象
// 定义编辑函数
const bianji = (x) => {
  tag.value = true;
  // x:是编辑的那个对象的所有信息
  details.value = x;
  // console.log(details.value);
};



// const dd= new URLSearchParams();
// dd.append('classesName', '软工11班');
// dd.append('classesGrade', '2019级');
// dd.append('classesType', '否');
// dd.append('teacherName', '张张');
// dd.append('collegeName', '软件学院');
// dd.append('proName', '软件工程');
// dd.append('classesId', '2019级');
// addClass(dd).then((res)=>{console.log(res)})
// axios.get("http://47.115.216.81:8888/classInfo/insertClass?classesName='软工11班'&classesGrade='2019级'&classesType='否'&teacherName='张张'&collegeName='软件学院'&proName='软件工程'classesId='2019级'").then((res)=>{console.log(res)})







</script>

<style lang="less" scoped>
.locat {
  display: flex;
  margin-left: 20%;
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;
  .topdiv {
    width: 100%;
    height: 140px;
    // border:1px solid red;
    display: flex;
    justify-content: flex-start;
    //  flex-wrap:wrap;
    margin-top: 100px;
    & > div {
      margin-left: 10px;
      background-color: white;
      border-radius: 15px;
      height: 40px;
    }
  }
}

.el-select,
.el-input {
  --el-select-border-color-hover: none;
  --el-select-input-focus-border-color: none;
  /deep/.el-input {
    --el-input-border-color: none;
    .el-input__suffix {
        border-radius: 50%;
      font-size: 30px;
      margin-left: 74px;
      margin-top: 2px;
      i {
        font-size: 30px;
        margin-left: 3px;
        background: url("../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/上拉.png")   no-repeat scroll center center transparent;
         background-size: 28px 28px;
        svg{
          display:none;
        }
      }
    }
  }
  height: 38px;
  /deep/ .el-input__inner {
    width: 150px;
    height: 38px;
    line-height: 38px;
    border-radius: 10px;
  }
}

.doing {
  position: reactive;
  margin-left: -1050px;
  margin-top: 45px;
}

.showdata {
  position: absolute;
  top: 215px;
  z-index: 33;
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

.add {
  width: 600px;
  border-radius: 24px;

  padding: 60px 120px;
  height: 300px;
  border: 2px solid #ebeafc;
  position: fixed;
  margin-top: -240px;
  z-index: 999;
  margin-left: 340px;
  background: #f7f7f7;
  .spl {
    width: 150px;
    height: 40px;
    margin-top: 40px;
    border-radius: 14px;
    border: 1px solid #f7f7f7;
    outline: none;
    background-color: #f7f7f7;
    .el-input__inner {
      width: 40px;
    }
  }
  h1 {
    text-align: center;
    color: #6168fe;
  }
  .addteacher {
    height: 100px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    input {
      width: 162px;
      height: 40px;
      margin-top: 40px;
      border-radius: 14px;
      border: 1px solid #f7f7f7;
      outline: none;
      background-color: white;
    }
  }
}
.buts {
  margin-left: 140px;
  margin-top: 80px;
  .el-button {
    margin-left: 50px;
    height: 40px;
  }
}
</style>
