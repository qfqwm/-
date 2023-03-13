<template>
  <div class="example-pagination-block">
    <el-pagination class="a" layout="prev, pager, next" :total="1000" />
    <div class="example-demonstration">共400条记录</div>
  </div>
</template>

<script lang='ts'>
export default {};
</script>

<style lang="less" scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.example-pagination-block {
  width: 80%;
  height: 80px;
  // position: absolute;
  margin-top: -15%;
  text-align: center;

  .a{
    margin-left: 60%;
  }

  .example-demonstration{
    margin-top: 10px;
    margin-left: 40%;
  }
}
</style>