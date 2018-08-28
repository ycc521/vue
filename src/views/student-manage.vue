<template>
  <div>
    <el-row>
      <el-col :span="24" class="text-right m-b-xs">
        <el-button type="primary" @click="addStudent()">新增学生</el-button>
      </el-col>
      <el-table :data="studentData" border style="width: 100%">
        <el-table-column prop="id" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="depart" label="院系"></el-table-column>
        <el-table-column prop="term" label="学期"></el-table-column>
        <el-table-column prop="year" label="年级"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="primary" size="small" @click="studentEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="studentDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :page-sizes="[10,20,30,40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="page.totalRecords">
        </el-pagination>
      </div>
      <!--新增学生模态框-->
      <el-dialog title="新增学生信息" :visible="addstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
        <el-form id="#addsForm" ref="addsForm" :model="addsForm" label-width="80px">
          <el-form-item label="学号" prop="id">
            <el-input  v-model="addsForm.id" max-length="10"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addsForm.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="addsForm.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="addsForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input v-model="addsForm.major"></el-input>
          </el-form-item>
          <el-form-item label="院系" prop="depart">
            <el-input v-model="addsForm.depart"></el-input>
          </el-form-item>
          <el-form-item label="学期">
            <el-select v-model="addsForm.term" value-key="id">
              <el-option v-for="item in termArry"  :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级" prop="year">
            <el-input v-model="addsForm.year"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-input v-model="addsForm.role" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="studentAdd()">确定</el-button>
            <el-button @click="addstudentForm = false;canceladdT('formt')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--编辑学生信息模态框-->
      <el-dialog title="编辑学生信息" :visible="editstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
        <el-form ref="editsForm" :model="editsForm" label-width="80px">
          <el-form-item label="学号">
            <el-input  v-model="editsForm.id" max-length="10" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="editsForm.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="editsForm.age"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="editsForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="editsForm.major"></el-input>
          </el-form-item>
          <el-form-item label="院系">
            <el-input v-model="editsForm.depart"></el-input>
          </el-form-item>
          <el-form-item label="学期">
            <el-select v-model="editsForm.term" value-key="id">
              <el-option v-for="item in termArry"  :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级">
            <el-input v-model="editsForm.year"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="editsForm.role" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="editsForm.passwd" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="studentcEdit()">确定</el-button>
            <el-button @click="editstudentForm = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import Main from '../api.js';
    export default {
        name: "student-manage",
      data(){
          return{
            studentData:[],
            addstudentForm:false, //新增学生信息模态框
            editstudentForm:false, //编辑学生信息模态框
            termArry:[
              {id:'第一学期',name:'第一学期'},
              {id:'第二学期',name:'第二学期'},
            ],
            page: {
              pageSize: 10, //每页条数,  默认10条
              totalRecords: 0, //总条数
              totalPages: 0, //总页数
              pageNum:0
            },
            addsForm:{
              id:'',
              name:'',
              age:"",
              sex:'',
              major:'',
              depart:'',
              term:'',
              year:'',
              role:'0'
            },
            editsForm:{
              id:'',
              name:'',
              age:"",
              sex:'',
              major:'',
              depart:'',
              term:'',
              year:'',
              role:'0',
              passwd:''
            },
          }
      },
      mounted(){
          this.init()
      },
      methods:{
          init(){
            this.studentData=[];
            let {pageNum,pageSize} = this.page;
            this.$http.get(Main.getStudent(pageNum,pageSize)).then(res =>{
              let {errCode,errMsg}=res.data;
              this.page.totalRecords=res.data.totalRecords;
              if(errCode==0){
                const studentArray=res.data.dataList;
                this.studentData=studentArray;
               // for(let i=0;i<=studentArray.length;i++){
               //   for(let j=0;j<=this.termArry.length;j++){
               //     console.log(this.termArry[j].id);
               //     if(this.termArry[j].id='一'){
               //       studentArray[i].term='第一学期';
               //     }else if(this.termArry[j].id='二'){
               //       studentArray[i].term='第二学期';
               //     }
               //   }
               // }
              }else{
                  alert(errMsg);
              }
            }, response => {
              // error callback
            })
          },
        // 每页显示多少条数据
        sizeChange(val) {
          this.page.pageSize = val;
          this.init();
        },
        //翻页
        currentChange(val) {
          this.page.pageNum=val-1;
          console.log(this.page.pageNum);
          this.init();
        },
          // 点击关闭按钮关闭模态框
          closeDialog(){
            this.addstudentForm = false;
            this.editstudentForm = false;
          },
          // 点击新增按钮
          addStudent(){
              this.addstudentForm = true;
              console.log(this.addsForm)
          },
        // 点击新增学生信息模态框的确定按钮（确定新增信息）
        studentAdd(){
            let studentList=this.addsForm;
            console.log(studentList);
            let {id,name,age,sex,major,depart,term,year} = studentList;
            if(id==''||name==''||age==''||sex==''||major==''||depart==''||term==''||year==''){
              this.$message.error('新增内容每一项都不准为空')
            }else{
              this.$http.post(Main.addStudent(),this.addsForm).then(res => {
                let {errCode,errMsg} = res.data;
                if(!errCode==1){
                  this.$set(this.addsForm,{});
                  this.init();
                  this.addstudentForm = false;
//                this.$refs[formName].resetFields();
                }else{
                  this.$message.error(errMsg);
                }

              }, response => {
                // error callback
              });
            }
        },
        // 点击编辑按钮
        studentEdit(index,row){
            this.editstudentForm = true;
            this.editsForm = Object.assign({}, row);
        },
        // 点击编辑信息弹框的确定按钮
        studentcEdit(){
          let studenteList=this.editsForm;
          console.log(studenteList);
          let {name,age,sex,major,depart,term,year} = studenteList;
          if(name==''||age==''||sex==''||major==''||depart==''||term==''||year==''){
            this.$message.error("修改内容除了不可编辑的每一项都不准为空")
          }else{
            this.$http.put(Main.changeStudenet(),this.editsForm).then(res => {
              let {errCode,errMsg} = res.data;
              if(!errCode==1){
                this.init();
                this.editstudentForm  = false;
              }else{
                this.$message.error(errMsg);
              }
            }, response => {

            });
          }
        },
        // 删除当前学生
        studentDelete(user){
          this.$confirm('此操作将永久删除学生 ' + user.name + ', 是否继续?', '提示', { type: 'warning' })
            .then(() => { // 向请求服务端删除
              this.$http.delete(Main.deleteStudent(user.id,0)).then((response) => {
                this.$message.success('成功删除了学生' + user.name + '!');this.init()})
                .catch((response) => {
                  this.$message.error('删除失败!');
                });
            }) .catch(() => {
            this.$message.info('已取消操作!');
          });
        },
      }
    }
</script>

<style scoped>
  .el-pagination{
    text-align:center;
    margin-top:20px;
  }
</style>
