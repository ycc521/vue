<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table :data="teacherData" border style="width: 100%" v-if="Teacherform">
          <el-table-column prop="id" label="账号"></el-table-column>
          <el-table-column prop="tname" label="姓名"></el-table-column>
          <el-table-column prop="tsex" label="性别"></el-table-column>
          <el-table-column prop="tdepart" label="部门"></el-table-column>
          <el-table-column prop="class_cno" label="课程名"></el-table-column>
          <el-table-column prop="passwd" label="密码"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column label="操作" class="text-center">
            <template scope="scope">
              <el-button type="primary" size="small"  @click="teacherEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="teacherDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="studentData" border style="width: 100%" v-if="Studentform">
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
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="small" @click="studentEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="studentDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
                 this.studentData=studentArray;
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
  .el-table th,.el-table td{
    text-align: center !important;
  }
</style>
