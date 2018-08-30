<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div v-if="Teacherform">
          <h4 class="title">教师信息</h4>
          <el-table :data="teacherData" border style="width: 100%" >
            <el-table-column prop="id" label="账号"></el-table-column>
            <el-table-column prop="tname" label="姓名"></el-table-column>
            <el-table-column prop="tsex" label="性别"></el-table-column>
            <el-table-column prop="tdepart" label="部门"></el-table-column>
            <el-table-column prop="class_cno" label="课程名"></el-table-column>
            <el-table-column prop="passwd" label="密码"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
          </el-table>
        </div>
        <div v-if="Studentform">
          <h4 class="title">学生信息</h4>
          <el-table :data="studentData" border style="width: 100%" >
            <el-table-column prop="id" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="major" label="专业"></el-table-column>
            <el-table-column prop="depart" label="院系"></el-table-column>
            <el-table-column prop="term" label="学期"></el-table-column>
            <el-table-column prop="year" label="年级"></el-table-column>
            <el-table-column prop="passwd" label="密码"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Main from '../api.js';
    export default {
        name: "person-msg",
        data(){
          return{
            teacherData:[],
            Teacherform:false,
            Studentform:false
          }
        },
        mounted(){
          this.init();
        },
        methods:{
          init(){
            var id = sessionStorage.getItem('userId');
            var role = sessionStorage.getItem('userRole');
            this.$http.get(Main.getPersonmsg(id,role)).then(res => {
             let {errCode,errMsg,dataList}= res.data;
             if(errCode==0){
               if(role==1){
                 this.Teacherform = true;
                 const teacherArray=dataList;
                 this.teacherData=teacherArray;
               }else{
                 this.Studentform = true;
                 const studentArray=dataList;
                 this.studentData = studentArray;
               }
             }else{
               this.$message.error(errMsg)
             }
            }, response => {
              this.$message.error('error submit!!');
              return false;
            });
          }
       }
    }
</script>

<style scoped>
  /*标题通用*/
  .title{
    height:40px;
    line-height:40px;
    background: #fff;
    color:rgb(32, 160, 255);
    font-size:16px;
    font-family:"PingFang SC";
    padding:0 15px;
    border-left:3px solid rgb(32, 160, 255);
  }
</style>
