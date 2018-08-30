<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h4 class="title">所有课程成绩信息</h4>
      </el-col>
      <el-table :data="scoreData" border style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="student_id" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="className" label="课程名"></el-table-column>
        <el-table-column prop="grade" label="成绩"></el-table-column>
        <el-table-column label="操作" v-if="show">
          <template scope="scope">
            <el-button type="primary" size="small"  @click="scoreEdit(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="scoreDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block text-center m-t-sm" style="height:70px;">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :page-sizes="[10,20,30,40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="page.totalRecords">
        </el-pagination>
      </div>
      <!--修改成绩信息-->
      <el-dialog title="修改成绩" :visible="changeScoreform" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
        <el-form ref="editForm" :model="editForm" label-width="80px">
          <el-form-item label="学号">
            <el-input  v-model="editForm.student_id" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input  v-model="editForm.name" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="课程名">
            <el-select v-model="editForm.class_id" value-key="id" disabled="disabled">
              <el-option v-for="item in listArry"  :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分数">
            <el-input v-model="editForm.grade"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="scoreChange()">确定</el-button>
            <el-button  @click="changeScoreform=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>

  </div>
</template>

<script>
  import Main from '../../api.js';
    export default {
      name: "grade-manage",
      data() {
        return {
          scoreData:[],
          listArry:[], //所有课程数组
          changeScoreform:false,  //修改成绩信息莫模态框
          show:false,            //判断是老师还是学生
          page: {
            pageSize: 10, //每页条数,  默认10条
            totalRecords: 0, //总条数
            totalPages: 0, //总页数
            pageNum:0
          },
          editForm:{
            id:"",
            student_id:"",
            class_id:"",
            grade:"",
          }
        }
      },
      mounted(){
        this.init()
      },
      methods: {
        init(){
          this.scoreData=[];
          let {pageNum,pageSize} = this.page;
          this.$http.get(Main.getallCoursescore(pageNum,pageSize)).then(res =>{
            let{errCode,dataList,totalRecords}=res.data;
            console.log(res.data);
            this.page.totalRecords=totalRecords;
            if(errCode==0){
              const scoreArray=dataList;
              this.scoreData=scoreArray;
            }else{
            }
          }, response => {
            // error callback
          })
        },
        //        点击关闭按钮关闭模态框
        closeDialog(){
          this.changeScoreform = false;
        },
        //        每页显示多少条数据
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
        // 修改成绩信息（点击修改）
        scoreEdit(index,row){
          // 获得所有课程根据id选课程
          this.changeScoreform = true;
          this.$http.get(Main.getallCourse()).then(res =>{
            console.log(res.data);
            let {errCode,dataList,errMsg}=res.data;
            if(errCode==0){
              this.listArry=dataList;
            }else{
            }
          }, response => {
            // error callback
          })
          this.editForm = Object.assign({}, row);
        },

        // 点击修改成绩信息模态框的确定按钮
        scoreChange(){
          let {grade}=this.editForm;
          if(grade !==''){
            this.$http.put(Main.changeScore(),this.editForm).then(res => {
              let {errCode,errMsg} = res.data;
              if(!errCode==1){
                this.init();
                this.$message.success(errMsg);
                this.changeScoreform  = false;
              }else{
                this.$message.error(errMsg);
              }
            }, response => {

            });
          }else{
            this.$message.error('修改后的成绩不能为空');
          }
        },
        // 根据用户id删除当前成绩
        scoreDelete(user){
          this.$confirm('此操作将永久删除学号为 ' + user.student_id + ', 是否继续?', '提示', { type: 'warning' })
            .then(() => { // 向请求服务端删除
              this.$http.delete(Main.deleteScore(user.id)).then((response) => {
                this.$message.success('成功删除了学号为' + user.student_id + '!');this.init()})
                .catch((response) => {
                  this.$message.error('删除失败!');
                });
            }) .catch(() => {
            this.$message.info('已取消操作!');
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
