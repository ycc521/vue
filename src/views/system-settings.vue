<template>
    <div class="m-t-sm text-center">
      <el-col :span="8" :offset="8">
        <el-form :model="ruleForm2" status-icon ref="ruleForm2" :rules="rules2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="passwd">
           <el-input type="password" v-model="ruleForm2.passwd" placeholder="请输入原始密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="checkPass">
          <el-input v-model="ruleForm2.checkPass" auto-complete="off" placeholder="必须为数字且为六个数"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPass">
          <el-input v-model="ruleForm2.confirmPass" auto-complete="off" placeholder="请确认新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </div>
</template>

<script>
  import Main from '../api.js';
    export default {
      name: "system-settings",
      data() {
        var validatePass = (rule,value,callback) => {
          if (value === '') {
            callback(new Error('请输入旧密码'));
          }else if(value !== sessionStorage.getItem('userPassword')){
            callback(new Error('旧密码输入不正确!'));
          }else{
            callback();
          }
        };
        var validatecheckPass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入新密码'));
          } else {
            if(value.length<6){

            }else{
              if (this.ruleForm2.confirmPass !== '') {
                this.$refs.ruleForm2.validateField('confirmPass');
              }
            }
            callback();
          }
        };
        var validateconfirmPass= (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入新密码'));
          } else if (value !== this.ruleForm2.checkPass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm2: {
            passwd: '',
            checkPass: '',
            confirmPass: ''
          },
          rules2: {
            passwd: [
              { validator:validatePass , trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatecheckPass, trigger: 'blur' }
            ],
            confirmPass: [
              { validator: validateconfirmPass, trigger: 'blur' }
            ]
          }
        };
      },
      mounted(){
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let role = sessionStorage.getItem('userRole');
              let id = sessionStorage.getItem('userId');
              let userName = sessionStorage.getItem('userName');
              let userSex = sessionStorage.getItem('userSex');
              let userDepart = sessionStorage.getItem('userDepart');
              let userCno = sessionStorage.getItem('userCno');
              let studentAge = sessionStorage.getItem('studentAge');
              let studentMajor = sessionStorage.getItem('studentMajor');
              let studentTerm = sessionStorage.getItem('studentTerm');
              let studentYear = sessionStorage.getItem('studentYear');
              let teacherForm = {
                role:1,
                id:id,
                tname:userName,
                tsex:userSex,
                tdepart:userDepart,
                class_cno:userCno,
                passwd:this.ruleForm2.checkPass
              };
              if(role==1){
                this.$http.put(Main.changeTeacher(),teacherForm).then(res => {
                  let {errCode,errMsg}= res.data;
                  if(errCode !==1){
                    this.$message.success(errMsg);
                  }else{
                    this.$message.error(errMsg);
                  }
                  console.log(res.data);
                }, response => {

                });
              }else{
                let studentForm = {
                  role:0,
                  id:id,
                  name:userName,
                  sex:userSex,
                  depart:userDepart,
                  age:studentAge,
                  major:studentMajor,
                  term:studentTerm,
                  year:studentYear,
                  passwd:this.ruleForm2.checkPass
                };
                this.$http.put(Main.changeStudenet(),studentForm).then(res => {
                  let {errCode,errMsg} = res.data;
                  if(!errCode==1){
                    this.$message.success(errMsg);
                  }else{
                    this.$message.error(errMsg);
                  }
                }, response => {

                });
              }
            } else {
              this.$message.error("提交失败")
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
  .el-input{
    width:425px !important;
  }
</style>
