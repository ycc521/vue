<template>
  <div>
    <el-row style="margin-bottom:20px;">
      <el-col :span="24">
        <div v-if="showStudent">
          <el-form :inline="true" :model="formInline" class="demo-form-inline title">
            <el-form-item label="学号" style="margin-bottom:0;">
              <el-input v-model="formInline.student_id" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="课程" style="margin-bottom:0;">
              <el-select v-model="formInline.class_id" value-key="id">
                <el-option value="请选择"></el-option>
                <el-option v-for="item in listArry"  :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否及格" style="margin-bottom:0;">
              <el-select v-model="formInline.pass" value-key="id">
                <el-option value="请选择"></el-option>
                <el-option v-for="item in blurArry"  :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom:0;">
              <el-button type="primary" @click="onInquerystudentID()">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="showTeacher">
          <el-form :inline="true" :model="formInline" class="demo-form-inline title">
            <el-form-item label="学号" style="margin-bottom:0;">
              <el-input v-model="formInline.student_id"></el-input>
            </el-form-item>
            <el-form-item label="课程" style="margin-bottom:0;">
              <el-select v-model="formInline.class_id" value-key="id">
                <el-option value="请选择"></el-option>
                <el-option v-for="item in listArry"  :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否及格" style="margin-bottom:0;">
              <el-select v-model="formInline.pass" value-key="id">
                <el-option value="请选择"></el-option>
                <el-option v-for="item in blurArry"  :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom:0;">
              <el-button type="primary" @click="onInquerystudentID()">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="studentId">
          <el-table :data="scoreData" border style="width: 100%" >
            <el-table-column prop="id" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="className" label="课程名"></el-table-column>
            <el-table-column prop="grade" label="成绩"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Main from '../../api.js';
    export default {
      name: "grade-query",
      data() {
        return {
          listArry:[], //课程数组
          scoreData:[], //只查询学号
          studentId:false, //只查询学号列表展示
          showStudent:false,
          showTeacher:false,
          blurArry:[
            {id:'0',name:'不及格'},
            {id:'1',name:'及格'},
          ],           //是否及格
          //输入查询
          formInline: {
            student_id: '',
            class_id:'',
            pass:''
          },

        }
      },
      mounted(){
        let role = sessionStorage.getItem('userrole');
        let id = sessionStorage.getItem('userId');
        if(role=='学生'){
          this.showStudent = true;
          this.formInline.student_id=id;
        }else{
          this.showTeacher = true;
        }
        this.init();
      },
      methods:{
        init(){
          /*获取所有课程*/
          this.$http.get(Main.getallCourse()).then(res =>{
            console.log(res.data);
            let {errCode,dataList,errMsg}=res.data;
            if(errCode==0){
              this.listArry=dataList;
            }else{
              alert(errMsg);
            }
          }, response => {
            // error callback
          })
        },
        /*只查询学号*/
        onInquerystudentID(){
          console.log(this.formInline.student_id);
          let {student_id,class_id,pass} = this.formInline;
          if(student_id !==''||class_id !==''||pass !==''){
            this.$http.post(Main.inqueryScore(),this.formInline).then(res => {
              let {errCode,dataList,errMsg}= res.data;
              if(errCode==0){
                this.studentId = true;
                const studentArray=dataList;
                this.scoreData=studentArray;
              }else if(errCode==2){
                this.studentId = true;
                this.$message.error(errMsg)
              }else{
                this.studentId = true;
                const studentArray=dataList;
                this.scoreData=studentArray;
                this.$message.error(errMsg)
              }
            }, response => {
              // this.$message.error('学号不能为空');
              return false;
            });
          }else{
            this.$message.error("三者查询中必须选择一个查询");
          }
        },
      }
    }
</script>

<style scoped>
  .title{
    background: #e8e8e8;
    font-size:16px;
    font-family:"PingFang SC";
    padding:10px 15px 10px 15px;
    border-left:3px solid rgb(32, 160, 255);
  }
  .btns{
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
    display:inline-block;
    padding:15px 20px;
    border-radius: 4px;
    font-weight:500;
    text-decoration: none;
    font-size:14px;
  }
  .btns:hover{
    background: #85ce61;
    border-color: #85ce61;
    color: #fff;
  }
</style>
