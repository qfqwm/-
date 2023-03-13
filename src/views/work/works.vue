<script>
</script>
<template>
<div class="box">


<el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-change="handleChange"
  :file-list="fileList3">
  <el-button size="small" type="primary">上传附件</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  
  <div class="content"></div>
<div class="but">
  <el-button type="primary">确认提交</el-button>
<el-button >保存草稿</el-button></div>


</div>
</template>
<style scoped>
.upload-demo{
width:600px;
}
.content{
    width:600px;
    height:200px;
    border:1px solid blue; 
    margin:20px;
     padding-top:40px; 
     margin-left:4px;

}

.box{
  padding:100px;
}
.el-button{

  font-size:16px;
}

.but{
  margin-top:100px;
}
</style>