<template>
  <div>
    <header class="header">
      学生成绩管理系统
      <div class="pull-right" style="cursor: pointer" @click="loginOut()">
        退 出
      </div>
    </header>
  </div>
</template>

<script>
    export default {
        name: "header",
      methods:{
        loginOut(){
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('userRole');
          this.$router.push({path: '/login'});
        }
      }
    }
</script>

<style scoped>
  .header{
    padding:0 15px;
    height:50px;
    line-height:50px;
    background-color: rgb(32, 160, 255);
    color:#fff;
    font-weight: 700;
    font-size:18px;
  }
</style>
