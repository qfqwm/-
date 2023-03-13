<script></script>
<template>
 <div class="works">
  <h3>作业任务:</h3>
  <p>作业任务的描述</p>
  <span>附件：</span>
  <table>
    <tr>
      <td>发布人</td>
      <td>{{message.name}}</td>
      <td>发布时间</td>
      <td>{{message.time}}</td>
      <td>计划完成时间</td>
      <td>{{message.overtime}}</td>
  
    </tr>
  </table>
  </div>
</template>
<script>
export default {
  data(){ 
 return{
      message:{
      name:'陈梦',
      time:'xxxx-xxx-xxx',
      overtime:"xxx-xxx-xxx"

 }
    }
    
  }
}
</script>

<style scoped lang="less">
h1,p,span,table{
    margin-top:40px;
}
table{
  margin-top:300px;
  text-align:center;

    border-collapse:collapse;
    th,td{
      width:150px;
      height:40px;
      border:1px solid blue;
      

    }
}

.works{
 padding-left:100px;
 margin-top:60px;
}
</style>
