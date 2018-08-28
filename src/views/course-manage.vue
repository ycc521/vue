<template>
  <div>
    <el-row>
      <el-col :span="24" class="text-right m-b-xs">
        <el-button type="primary" @click="getAdd()">新增课程</el-button>
      </el-col>
      <el-table class="m-t-sm" :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="课程编号"></el-table-column>
        <el-table-column prop="name" label="课程"></el-table-column>
        <el-table-column prop="credit" label="学分"></el-table-column>
        <el-table-column prop="ctime" label="学时"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="teacher_id" label="教师编号"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="primary" size="small" @click="courseEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="courseDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--编辑页面-->
    <el-dialog title="修改课程信息" :visible="dialogFormVisible" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="课程编号">
          <el-input v-model="form.id" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="课程">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="form.credit"></el-input>
        </el-form-item>
        <el-form-item label="学时">
          <el-input v-model="form.ctime"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="教师编号">
          <el-input v-model="form.teacher_id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editChange()">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--新增课程-->
    <el-dialog title="新增课程信息" :visible="addCourseform" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
      <el-form id="#addForm" ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="课程" prop="name">
          <el-input  v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学分" prop="credit">
          <el-input v-model="addForm.credit"></el-input>
        </el-form-item>
        <el-form-item label="学时" prop="ctime">
          <el-input v-model="addForm.ctime"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="addForm.type"></el-input>
        </el-form-item>
        <el-form-item label="教师编号">
          <el-select v-model="addForm.teacher_id" value-key="id">
            <el-option v-for="item in techerArry"  :key="item.id" :label="item.tname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="courseAdd()">确定</el-button>
          <el-button @click="addCourseform = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import Main from '../api.js';
    export default {
        name: "course-manage",
        data(){
            return{
              url:'http://www.rainrain.xin:12345/studentdb/class/delete',
              tableData: [

              ],
              techerArry:[],
              dialogFormVisible: false,
              addCourseform:false,
              form: {
                id:'',
                name: '',
                credit: '',
                ctime: '',
                type: '',
                teacher_id:''
              },
              addForm:{
                name: '',
                credit: '',
                ctime: '',
                type: '',
                teacher_id:"2014124201"
              },
            }
        },
      // 页面初始化加载
      mounted(){
        this.init();
      },
      methods:{
        init(){
          this.tableData=[];
          this.$http.get(Main.getCourse()).then(res => {
            const data=res.data;
            console.log(data);
            const code =data.errCode;
            if(code==0){
              const listArray=data.dataList;
              this.tableData=listArray;
            }else{
            }
          }, response => {
            // error callback
          });
        },
//        点击关闭按钮关闭模态框
        closeDialog(){
          this.dialogFormVisible = false;
          this.addCourseform = false;
        },
//        删除课程
        courseDelete(user){
          this.$confirm('此操作将永久删除课程 ' + user.name + ', 是否继续?', '提示', { type: 'warning' })
            .then(() => { // 向请求服务端删除
              this.$http.delete(Main.deleteCourse(user.id)).then((response) => {
                  this.$message.success('成功删除了课程' + user.name + '!');this.init()})
                .catch((response) => {
                  this.$message.error('删除失败!');
                });
            }) .catch(() => {
            this.$message.info('已取消操作!');
          });
        },
//        点击新增课程
        getAdd(){
          this.addCourseform = true;
          this.$http.get(Main.gettMsg()).then(res => {
            let {errCode,dataList,errMsg}=res.data;
            console.log(res.data);
            if(errCode==0){
              this.techerArry = dataList
            }else{
              alert(errMsg);
            }
          }, response => {
          });
        },
//        新增课程确定按钮
        courseAdd(){
         let addlist=this.addForm;
         let {name,credit,ctime,type}=addlist;
         if(name==""||credit==""||ctime==""||type==""){
            this.$message.error('新增内容都不能为空');
          }else{
           this.$http.post(Main.addCourse(),this.addForm).then(res => {
             this.$set(this.addForm,{});
             this.init();
             this.addCourseform = false;
           }, response => {
           });
         }
        },
//        点击编辑
        courseEdit (index, row) {
          this.dialogFormVisible = true;
          this.form = Object.assign({}, row);
        },
//        点击编辑的修改（修改课程信息）
        editChange(){

          let changelist=this.form;
          let {name,credit,ctime,type}=changelist;
          if(name==""||credit==""||ctime==""||type==""){
            this.$message.error('修改后的内容都不能为空');
          }else{
            this.$http.put(Main.changeCourse(),this.form).then(res => {
              this.init();
              this.dialogFormVisible = false;
            }, response => {
            });
          }

        }
      },
    }
</script>

<style scoped>

</style>
