<template>
  <div class="locat">
    <div class="back"></div>
    <div class="word">
    <el-span>小组综合评分</el-span>
    </div>
    <div class="mag">
      <el-span prop="name"><span>小组:</span></el-span>
      <el-span prop="num"><span>小组长:</span></el-span>
      <el-span prop="num"><span>成员数：</span></el-span>
    </div>
    <div class="mag1">
      <el-span prop="name"><span>成员：</span></el-span>
      <el-span prop="num"><span>院系：</span></el-span>
      <el-span prop="num"><span>项目名称：</span></el-span>
    </div>
    <div class="mag2">
      <el-span prop="name"><span>实训老师：</span></el-span>
      <el-span prop="num"><span>责任老师：</span></el-span>
      
    </div>
    
    <div class="inputgrade">
         <el-input v-model="input" placeholder="综合打分：  "  />
    </div>
      <div class="inputword">
          <el-input
         v-model="textarea"
         :rows="2"
         type="textarea"
         placeholder="评语："
  />
      </div>
        <div class="data">
          <el-table :data="tableData">
            <el-table-column prop="name" label="作业主题" />
            <el-table-column prop="name1" label="下发老师" />
            <el-table-column prop="name2" label="下发时间" />
            <el-table-column prop="name3" label="提交时间" />
            <el-table-column prop="name4" label="实际提交时间" />
            <el-table-column prop="num" label="提交情况" />
            <el-table-column prop="num1" label="作业得分" />
            <el-table-column prop="num2" label="操作" />
          </el-table>
        </div>
        <div class="footer-1">
        <el-form>
          <el-form-item>
            <el-button type="primary">
              <img
                src="../../../../public/img/changepass/sure.png"
                class="buttonimg"
              />
              <router-link to="/aGradex">确定</router-link>
            </el-button>
            <el-button id="reset">
              <img
                src="../../../../public/img/changepass/cancle.png"
                class="buttonimg"
              />
              <router-link to="/aGradex">取消</router-link>
            </el-button>
            <el-button id="back">
              <img
                 src="../../../../public/img/changepass/返回.png"
                  class="buttonimg"
              />
              <router-link to="/aGrade">返回</router-link>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
      
    

        
    
 
</template>

<script lang='ts'>
import { ref } from "vue";
export default {
  setup() {
    //数据
    const tableData = [
      {
        name: "vue",
        name1: "123",
        name2: "qu",
        name3: "成员",
        name4: "是",
        num: "25",
        num1: "30",
        num2: "25",
      },
    ];
    return {
      tableData,
    };
  },
};
</script>

<style lang="less" scoped>
.locat {
  // overflow: hidden;
  margin-left: 20%;
  // background-color: red;
  // padding-top: 10px;
  margin-top: -1080px;
  height: 1080px;
  width: 80%;
  background-image: url(../../../../public/3.个人信息管理界面/个人信息管理界面左侧栏总图标/2_02.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}
el-span {
  display: inline-block;
  height: 44px;
  line-height: 44px;
  width: 620px;
  span {
    padding: 0 10px;
    color: #1f10fe;
    font-size: 16px;
    font-weight: 600;
  }
}
.word{
  width: 200px;
  height: 50px;
  right: 200px;
//   background-color: #6168fe;
//   border-radius: 10px;
  font-size: 50px;
  color: #a7a0fd;
  position: relative;
  left: 37%;
  top:30px
}


.data {
  position: absolute;
  top: 520px;
  left: 45px;
  width: 1400px;
  border-radius: 7px;
  border: 3px solid #8b81fe;
  background-color: rgb(94, 11, 189);
  /deep/.el-table__header {
    width: 1050px !important;
  
  }
  /deep/.el-scrollbar__view {
    width: 1050px !important;
    .el-table__body {
      width: 1050px !important;
    }
  }
  /deep/.cell {
    text-align: center; 
    //  background-color: #1f10fe;
  }
}
.mag {
  // position: relative;float: left;
  // width: 600px;
  // height: 300px;
  // margin-left: 40px;
  // margin-top: 120px;
  position: absolute;
  top: 110px;
  left: 40px;
  width: 1400px;
  height: 44px;
  background-color: #eeecf9;
}

.mag1 {
  position: absolute;
  top: 150px;
  left: 40px;
  width: 1400px;
  background-color: #eeecf9;

  /deep/img {
    margin-left: 10px;
    vertical-align: middle;
    width: 20px;
  }
}

.mag2 {
  position: absolute;
  top: 190px;
  left: 40px;
  width: 1400px;
  height: 44px;
  background-color: #eeecf9;
}
.mag3 {
  position: absolute;
  top: 230px;
  left: 40px;
  width: 1400px;
  height: 44px;
  background-color: #eeecf9;
}
.el-button--primary {
  --el-button-bg-color: #c3bdf9;
  --el-button-hover-bg-color: #6168fe;
  border-radius: 10px;
}
.inputgrade{
    position: relative;
    width: 1400px;
    left: 40px;
    top: 250px;
    border-radius: 7px;
    border: 3px solid #8b81fe;
    ::-webkit-input-placeholder {
    color: #8b81fe;;
   }
}
.inputword{
    position: relative;
    width: 1400px;
    left: 40px;
    top: 270px;
    border-radius: 7px;
    border: 3px solid #8b81fe;
    ::-webkit-input-placeholder {
    color: #8b81fe;;
   }
}
.footer-1 {
      width: 600px;
      height: 600px;
      margin-top: 600px;
      margin-left: 450px;

      .el-button {
        margin-top: 100px;
        width: 150px;
        height: 50px;
        border-radius: 15px;
        margin-left: 25px;
        font-size: 20px;
        background-color: #888fff;
      }

      a {
        text-decoration: none;
        color: #fff;
      }

      .buttonimg {
        width: 40px;
      }
    }
</style>