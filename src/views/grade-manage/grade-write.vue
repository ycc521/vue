<template>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline title">
        <el-form-item label="学号" style="margin-bottom:0;">
          <el-input v-model="formInline.student_id" placeholder="输入学号录入成绩"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:0;">
          <el-button type="primary" @click="onInquery()">查询</el-button>
        </el-form-item>
        <el-form-item style="margin-bottom:0;">
          <el-button type="success" @click="onWrite()">录入</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="scoreData" border style="width: 100%">
        <el-table-column prop="id" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="className" label="课程名"></el-table-column>
        <el-table-column prop="grade" label="成绩"></el-table-column>
      </el-table>
      <!--录入页面-->
      <el-dialog title="录入成绩" :visible="writeScoreform" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
        <el-form id="#writeForm" ref="writeForm" :model="writeForm" label-width="80px">
          <el-form-item label="学号" prop="student_id">
            <el-input  v-model="writeForm.student_id"></el-input>
          </el-form-item>
          <el-form-item label="课程">
            <el-select v-model="writeForm.class_id" value-key="id">
              <el-option v-for="item in courseArry"  :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成绩" prop="grade">
            <el-input  v-model="writeForm.grade"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="teacherAdd('formt')">确定</el-button>
            <el-button @click="addTeacherform = false;canceladdT('formt')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  import Main from '../../api.js';
    export default {
        name: "grade-write",
      data() {
        return {
          scoreData:[],
          courseArry:[], //所有课程数组
          writeScoreform:false,
          formInline: {
           student_id: '',
          },
          writeForm:{
            student_id:'',
            class_id:'',
            grade:''
          }
        }

      },
      mounted(){

      },
      methods: {
        //        点击关闭按钮关闭模态框
        closeDialog(){
          this.writeScoreform = false;
        },
       // 查询
        onInquery(){
          this.$http.get(Main.getScore(this.formInline.student_id)).then(res => {
            let {errCode,dataList,errMsg}= res.data;
            if(errCode==0){
              const studentArray=dataList;
              this.scoreData=studentArray;
            }else{
              this.$message.error(errMsg)
            }
          }, response => {
            this.$message.error('error submit!!');
            return false;
          });
        },
       // 录入
        onWrite(){
          this. writeScoreform = true;
          this.$http.get(Main.getallCourse()).then(res =>{
            console.log(res.data);
            let {errCode,dataList,errMsg}=res.data;
            if(errCode==0){
              this.courseArry=dataList;
            }else{
            }
          }, response => {
            // error callback
          })
        }
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
</style>
