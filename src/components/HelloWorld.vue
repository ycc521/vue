<template>
  <el-row :span="24" class="login-bg">
    <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">学生成绩在线管理系统</h3>
      <el-form-item>
        <el-input type="text" v-model="username"  placeholder="请输入登录账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12" class="text-left">
          <el-radio v-model="radio" class="remember" label="1" style="padding-left:5px;">教师</el-radio>
        </el-col>
        <el-col :span="12" class="text-right">
          <el-radio v-model="radio" class="remember" label="2" style="padding-right:5px;">学生</el-radio>
        </el-col>
      </el-row>

      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="dologin()">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </el-row>

</template>

<script>
  import Main from '../api.js';
export default {
  name: 'HelloWorld',
  data () {
    return {
      radio:'1',
      username:'',
      password:''
    }
  },
  methods: {
    dologin() {
      let {username,password,radio} = this;
      if(username==""||password==""){
        alert("用户名或密码为空");
      }else{
        this.$http.get(Main.getUserLogin(username,password,radio)).then(res => {
          let{errCode,errMsg,dataList}= res.data;
          console.log(res.data);
          if(errCode==0){
            let rolename = dataList[0].role;
            sessionStorage.setItem('userrole',rolename);
            sessionStorage.setItem('userId', dataList[0].id);
            let role=radio;
            sessionStorage.setItem('userRole',role);             //存储角色（学生和教师）
           let userName=dataList[0].name || dataList[0].tname;
            sessionStorage.setItem('userName', userName);       //存储用户名（学生和教师）
            let userPsd=dataList[0].passwd;
            sessionStorage.setItem('userPassword', userPsd);   //存储密码（学生和教师）
            let userSex=dataList[0].sex || dataList[0].tsex;
            sessionStorage.setItem('userSex', userSex);         //存储性别（学生和教师）
            let userDepart=dataList[0].depart || dataList[0].tdepart;
            sessionStorage.setItem('userDepart', userDepart);   //存储部门院系（教师和学生）
            let cno =dataList[0].class_cno;
            sessionStorage.setItem('userCno',cno);              //存储课程id（教师）
            let age =dataList[0].age;
            sessionStorage.setItem('studentAge',age);           //存储年龄（学生）
            let major =dataList[0].major;
            sessionStorage.setItem('studentMajor',major);      //存储专业（学生）
            let term =dataList[0].term;
            sessionStorage.setItem('studentTerm',term);        //存储学期（学生）
            let year =dataList[0].year;
            sessionStorage.setItem('studentYear',year);        //存储所在年级（学生）
            this.$router.push({path: '/person-msg'})
            this.$message({
              message: '恭喜'+rolename+userName+'! 成功登录学生成绩管理系统',
              type: 'success'
            });
          }else{
            this.$message.error(errMsg);
          }
        }, response => {
          this.$message.error('error submit!!');
          return false;
        });
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.login-bg {
  height: 100%;
  background: url(../../static/assets/img/bglogin.jpg) no-repeat center;
  background-size: cover;
  overflow: hidden;
}
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  width:380px;
  height:380px;
  position:absolute;
  top:50%;
  left:50%;
  margin-left:-190px;
  margin-top:-190px;
  padding: 40px;
  background: rgba(0,0,0,.2);
  /* overflow-x: hidden; */
  box-sizing: border-box;
  box-shadow: 1px 1px 1px rgba(0,0,0,.2);}
.title {
  margin: 10px auto 25px auto;
  text-align: center;
  font-size:1.5rem;
  font-weight: 400;
  color: #007bff;
}
.remember {
  margin: 10px 0 25px 0;
}
</style>
