<template>
  <div class="locat">
    <div class="topdiv">
      <div class="Search">
        <span>教师姓名：</span
        ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
      </div>
      <div class="Search">
        <span>身份证号：</span
        ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
      </div>
      <div class="Search">
        <span>工号：</span
        ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
      </div>
      <div class="Search">
        <span>手机号码：</span
        ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
      </div>
      <div class="Search">
        <span>手机号码：</span
        ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
      </div>
      <div class="Search">
        <span>状态：</span
        ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
      </div>
      <div class="Search">
        <div class="doing">
          <el-button type="primary" @click="tag = true">新增</el-button>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </div>
      </div>
    </div>

    <div class="showdata">
      <el-table :data="data">
        <el-table-column prop="date" label="院系" />
        <el-table-column prop="name" label="专业" />
        <el-table-column prop="name" label="年纪" />
        <el-table-column prop="name" label="班主任" />
        <el-table-column prop="name" label="是否已结业" />
        <el-table-column prop="name" label="学员总数" />
        <!-- <el-table-column prop="address" label="状态" /> -->

        <el-table-column label="操作">
          <template #default="course">
            <!-- 后期传id -->
            <el-button @click="tag = true" type="primary">新增</el-button>
            <el-button type="primary" @click="tag = true">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增 -->

      <div class="add" v-show="tag">
        <h1>学员信息维护</h1>
        <div class="addteacher">
          <div class="spl">
            <span>院系：</span
            ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
          </div>

          <div class="spl">
            <span>专业：</span
            ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
          </div>

          <div class="spl">
            <span>年纪：</span
            ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
          </div>

          <div class="spl">
            <span>班级：</span
            ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
          </div>

          <div class="spl">
            <span>班主任：</span
            ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
          </div>

          <input placeholder="学员姓名:" class="names" />

          <div class="spl">
            <span>学号：</span
            ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
          </div>

          <div class="spl">
            <span>性别：</span
            ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
          </div>

          <input placeholder="身份证号:" />

          <input placeholder="邮箱:" />

          <input placeholder="手机号码:" />

          <div class="spl">
            <span>角色：</span
            ><el-select :options="entryname" clearable placeholder="Select"> </el-select>
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
import { useRoute } from "vue-router";

const Route = useRoute();
console.log("获取到的参数", Route.query.id);
const {data}=Route.query.id;
console.log(data)



const router = useRouter();
const tag = ref(false);
const pushs = () => {
  router.push("/aa");
};
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

.el-select {
  --el-select-border-color-hover: none;
  --el-select-input-focus-border-color: none;
  /deep/.el-input {
    --el-input-border-color: none;
    .el-input__suffix {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      font-size: 30px;
      margin-left: 74px;
      margin-top: 7px;
      background-color: #6168fe;
      i {
        font-size: 30px;
        margin-left: -1px;
        color: white;
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
  margin-left: -1350px;
  margin-top: 55px;
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

  padding: 60px;
  height: 500px;
  border: 2px solid #ebeafc;
  position: fixed;
  margin-top: -200px;
  z-index: 999;
  margin-left: 400px;
  background: #f7f7f7;
  .spl {
    width: 150px;
    height: 40px;
    margin-top: 40px;
    border-radius: 14px;
    border: 1px solid #f7f7f7;
    outline: none;
    background-color: white;

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
      width: 182px;
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
.names {
  margin-left: 20px;
  border: 3px solid red;
}
</style>
