<template>
<div>
  <el-row>
    <el-col :span="24" class="text-right m-b-xs">
      <el-button type="primary" @click="gettAdd()">新增教师</el-button>
    </el-col>
    <el-table :data="teacherData" border style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="tname" label="姓名"></el-table-column>
      <el-table-column prop="tsex" label="性别"></el-table-column>
      <el-table-column prop="tdepart" label="部门"></el-table-column>
      <el-table-column prop="className" label="课程名"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary" size="small"  @click="teacherEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="teacherDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="[10,20,30,40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="page.totalRecords">
      </el-pagination>
    </div>
    <!--编辑页面-->
    <el-dialog title="修改教师信息" :visible="changeTeacherform" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
      <el-form ref="edittForm" :model="edittForm" label-width="80px">
        <el-form-item label="编号">
          <el-input  v-model="edittForm.id" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="edittForm.tname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="edittForm.tsex"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="edittForm.tdepart"></el-input>
        </el-form-item>
        <el-form-item label="课程">
          <el-select v-model="edittForm.class_cno" value-key="id">
            <el-option v-for="item in listArry"  :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="edittForm.passwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="teacherChange()">确定</el-button>
          <el-button  @click="changeTeacherform=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="新增教师信息" :visible="addTeacherform" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
      <el-form id="#addtForm" ref="addtForm" :model="addtForm" label-width="80px">
        <el-form-item label="编号" prop="id">
          <el-input  v-model="addtForm.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="tname">
          <el-input v-model="addtForm.tname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="tsex">
          <el-input v-model="addtForm.tsex"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="tdepart">
          <el-input v-model="addtForm.tdepart"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input v-model="addtForm.role" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="课程">
          <el-select v-model="addtForm.class_cno" value-key="id">
            <el-option v-for="item in courseArry"  :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="teacherAdd('formt')">确定</el-button>
          <el-button @click="addTeacherform = false;canceladdT('formt')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</div>
</template>

<script>
  import Main from '../api.js';
    export default {
        name: "teacher-manage",
      data(){
          return{
            teacherData:[],
            changeTeacherform:false,  //编辑教师信息模态框
            addTeacherform:false,
            listArry:[],
            courseArry:[],  //教师列表数组
            page: {
              pageSize: 10, //每页条数,  默认10条
              totalRecords: 0, //总条数
              totalPages: 0, //总页数
              currentPage:1
            },
            edittForm:{
              id: '',
              tname: '',
              tsex: '',
              tdepart:'',
              class_cno:'',
              passwd:''
            },
            addtForm:{
              id: '',
              tname: '',
              tsex: '',
              tdepart:'',
              role:'1',
              class_cno:''
            }

          }
      },
      mounted(){
       this.init();
      },
      methods:{
        init(){
          this.teacherData=[];
          let {pageNum,pageSize} = this.page;
          this.$http.get(Main.getTeacher(pageNum,pageSize)).then(res =>{
            const data=res.data;
            console.log(data);
            const code =data.errCode;
            this.page.totalRecords=data.totalRecords;
            if(code==0){
              const teacherArray=data.dataList;
              this.teacherData=teacherArray;
            }else{
            }
          }, response => {
            // error callback
          })
        },
        //        点击关闭按钮关闭模态框
        closeDialog(){
          this.addTeacherform = false;
          this.changeTeacherform = false;
        },
        //        翻页
        sizeChange(val) {
          this.page.pageSize = val;
          this.init();
          console.log('翻页');
        },
        currentChange(val) {
          this.page.currentPage = val;
          this.init();
        },
        // 点击新增教师按钮
        gettAdd(){
          this.addTeacherform = true;
          this.$http.get(Main.getallCourse()).then(res =>{
            let {errCode,dataList,errMsg}=res.data;
           if(errCode==0){
             this.courseArry=dataList;

           }else{
             alert(errMsg);
           }
          }, response => {
            // error callback
          })
        },
        //        新增教师信息确定
        teacherAdd(){
          let teacherList=this.addtForm;
          console.log(teacherList);
          let {id,tname,tsex,tdepart,class_cno}= teacherList;
          if(id==""||tname==""||tsex==""||tdepart==""||class_cno==""){
            this.$message.error('新增内容都不能为空');
          }else{
            this.$http.post(Main.addTeacher(),this.addtForm).then(res => {
              let {errCode,errMsg} = res.data;
              if(!errCode==1){
                this.$set(this.addtForm,{});
                this.init();
                this.addTeacherform = false;
//                this.$refs[formName].resetFields();
              }else{
                this.$message.error(errMsg);
              }

            }, response => {
              // error callback
            });
          }

        },
//        新增教师取消
        canceladdT(){

        },
       // 删除当前教师
        teacherDelete(user){
          this.$confirm('此操作将永久删除教师 ' + user.tname + ', 是否继续?', '提示', { type: 'warning' })
            .then(() => { // 向请求服务端删除
              this.$http.delete(Main.deleteTeacher(user.id,1)).then((response) => {
                this.$message.success('成功删除了教师' + user.tname + '!');this.init()})
                .catch((response) => {
                  this.$message.error('删除失败!');
                });
            }) .catch(() => {
            this.$message.info('已取消操作!');
          });
        },
        // 点击编辑
        teacherEdit(index, row) {
          this.changeTeacherform = true;
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
          this.edittForm = Object.assign({}, row);
        },
      //  点击编辑修改教师信息
        teacherChange(){
          let teacherlist=this.edittForm;
          let {tname,tsex,tdepart}=teacherlist;
          if(tname==""||tsex==""||tdepart==""){
            console.log(teacherlist);
            this.$message.error('修改后的内容都不能为空');
          }else{
            let editForm={   class_cno:teacherlist.class_cno
              ,id:teacherlist.id
              ,passwd:teacherlist.passwd
              ,role:1
              ,tdepart:teacherlist.tdepart
              ,tname:teacherlist.tname
              ,tsex:teacherlist.tsex}
            this.$http.put(Main.changeTeacher(),editForm).then(res => {
              console.log(editForm);
            let {errCode,errMsg} = res.data;
            if(!errCode==1){
              this.init();
              this.changeTeacherform  = false;
            }else{
              this.$message.error(errMsg);
            }
            }, response => {

            });
          }

        }
      }
    }
</script>

<style scoped>
  .el-pagination{
    text-align:center;
    margin-top:20px;
  }
  .el-table .cell{
    white-space: nowrap !important;
  }
</style>
