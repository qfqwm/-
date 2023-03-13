<template>
  <div class="locat">
    <div class="topdiv">
      <div class="Search">
        <el-input placeholder="教师姓名:" v-model="teac" />
      </div>
      <div class="Search">
        <el-input placeholder="身份证号:" v-model="cardid" />
      </div>
      <div class="Search">
        <el-input placeholder="工号:" v-model="gohao" />
      </div>
      <div class="Search">
        <el-input placeholder="手机号码:" v-model="numbers" />
      </div>
      <div class="Search">
        <span>状态：</span><el-select clearable placeholder="Select"> </el-select>
      </div>
      <div class="Search">
        <div class="doing">
          <el-button type="primary" @click="tag = true">新增</el-button>
          <!--查询老师 -->
          <el-button type="primary" @click="check">查询</el-button>
          <el-button>重置</el-button>
        </div>
      </div>
    </div>

    <div class="showdata">
      <el-table :data="currenttableData">
        <el-table-column prop="teacherName" label="教师姓名:" />
        <el-table-column prop="teacherIdcard" label="工号:" />
        <el-table-column prop="teacherIdcard" label="身份证号码" />
        <el-table-column prop="teacherSex" label="性别:" />
        <el-table-column prop="teacherPhone" label="手机号:" />
        <el-table-column prop="teacherProfession" label="职位:" />
        <el-table-column prop="teacherStatus" label="状态" />

        <el-table-column label="操作">
          <template #default="course">
            <!-- 后期传id -->
            <el-button @click="tag = true" type="primary">新增</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增 -->
      <div class="add" v-show="tag">
        <h1>教师信息维护</h1>
        <div class="addteacher">
          <input placeholder="教师姓名" v-model="names" />
          <input placeholder="工号" v-model="gohaos" />
          <input placeholder="身份证号" v-model="cardids" />
          <div class="spl">
            <span>性别：</span
            ><el-select :options="Sex" v-model="sex">
              <el-option v-for="item in Sex" :label="item.label" :value="item.value" />
            </el-select>
          </div>

          <input placeholder="手机号" v-model="number" />
          <div class="spl">
            <span>职位：</span
            ><el-select clearable placeholder="Select" :options="zhiwei" v-model="status">
              <el-option v-for="item in zhiwei" :label="item.label" :value="item.value" />
            </el-select>
          </div>

          <div class="buts">
            <el-button type="primary" round class="el-button" @click="sure">
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

<script lang="ts">
import { onMounted } from "vue";
import axios from "axios";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { teachMes, teachDetail } from "@/api/index";

export default {
  setup() {
    let currenttableData: any = ref();
    const pagesize = ref(6);
    const cardids = ref("");
    const currentpage = ref(1);
    const page = ref(1);
    const tag = ref(false); // 定义控件的显示与否
    const tabledata = ref(); // 表单
    const tags = ref("1");
    const tabs = ref();
    const teac = ref("");
    const cardid = ref("");
    const numbers = ref("");
    const gohaos = ref("");
    const ds = reactive({
      teacherName: teac,
      teacherIdcard: cardid,
      teacherPhone: numbers,
    });

    const names = ref("");
    const gohao = ref("");
    const sex = ref("");
    const Sex = [
      { value: "1", label: "男" },
      { value: "2", label: "女" },
    ];

    const zhiwei = [
      { value: "1", label: "教师" },
      { value: "2", label: "教授" },
      { value: "3", label: "管理员" },
    ];
    const status = ref("");
    const check = () => {
      loaddata();
    };

    onMounted(() => {
      loaddata();
    });

    const loaddata = async function () {
      await getdata();
    };
    const getdata = () => {
      teachDetail(ds).then((res) => {
        tabs.value = res.data.data;
        page.value = tabs.value.length;
        sizeList();
        console.log(res.data.data);
      });
    };

    const sizeList = () => {
      currenttableData.value = tabs.value.slice(
        (currentpage.value - 1) * pagesize.value,
        currentpage.value * pagesize.value
      );
    };



    const sure = () => {
      tag.value = false;
      
  
      const params = new URLSearchParams();
      params.append("teacherName", names.value);
      params.append("teacherId", gohaos.value);
      params.append("teacherSex", sex.value);
      params.append("teacherProfession", status.value);
      params.append("teacherStatus", "0");
      params.append("teacherIdcard",  cardids.value);
      axios
        .post("http://47.115.216.81:8888/teacherInfo/insertTeacherInfo", params)
        .then((res) => {
          console.log(res);
        });

    




     
    };


    





    // 尝试一下新增

    return {
     
      gohaos,
      cardids,
      names,
      cardid,
      check,
      tag,
      teac,
      tabledata,
      Sex,
      sure,
      tags,
      numbers,
      tabs,
      gohao,
      sex,
      sizeList,
      currenttableData,
      currentpage,
      pagesize,
      page,
      zhiwei,
      status,
    };
  },
};
</script>

<style lang="less" scoped>
.example-pagination-block {
  position: fixed;
  bottom: 300px;
  z-index: 90;
  top: 750px;
  margin-left: 150px;
}
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
    }
  }
}
.el-select {
  --el-select-border-color-hover: none;
  --el-select-input-focus-border-color: none;
  /deep/.el-input {
    --el-input-border-color: none;
  }
  height: 38px;
  /deep/ .el-input__inner {
    width: 140px;
    height: 38px;
    line-height: 38px;
    border-radius: 10px;
  }
}
.doing {
  margin-left: 100px;
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
  position: fixed;

  top: 250px;

  z-index: 999;
  width: 600px;
  border-radius: 24px;
  padding: 60px;
  height: 300px;
  border: 2px solid #ebeafc;
  margin-left: 400px;
  background: #f7f7f7;

  .spl {
    width: 190px;
    height: 40px;
    margin-top: 40px;
    border-radius: 14px;
    border: 1px solid white;
    outline: none;
    background-color: white;
    /deep/.el-input .el-input__suffix {
      border-radius: 50%;
      font-size: 30px;
      margin-left: 74px;
      margin-top: 2px;
      i {
        font-size: 30px;
        margin-left: 3px;
        background: url("../../../public/3.个人信息管理界面/2.个人信息管理系统-项目课程表/1.个人信息管理系统-项目课程表图标/上拉.png")
          no-repeat scroll center center transparent;
        background-size: 28px 28px;
        svg {
          display: none;
        }
      }
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
      width: 170px;
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
.Search {
  width: 200px;
  // border:2px solid red;
  .el-input/deep/.el-input__inner {
    width: 200px;
    height: 40px;
    border-radius: 12px;
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
</style>
