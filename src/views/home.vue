<template>
  <el-row style="height:100%">
    <v-header></v-header>
    <el-row>
      <el-col class="leftmenu" :span="3">
        <el-menu :default-active="$route.path" light router v-if="showTeacher">
          <template v-for="(item,index) in menuitem">
            <el-menu-item :index="item.path" @click="dolist(item.path)"  v-if="!item.hidden">
              <i class="fa" :class="item.class"></i>
              {{item.name}}
            </el-menu-item>
          </template>
        </el-menu>
        <el-menu :default-active="$route.path" light router v-if="showStudent">
          <template v-for="(item,index) in menuitems">
            <el-menu-item :index="item.path" @click="dolist(item.path)"  v-if="!item.hidden">
              <i class="fa" :class="item.class"></i>
              {{item.name}}
            </el-menu-item>
          </template>
        </el-menu>

        <el-menu :default-active="$route.path" light router v-if="showManager">
          <template v-for="(item,index) in menuitemM">
            <el-menu-item :index="item.path" @click="dolist(item.path)"  v-if="!item.hidden">
              <i class="fa" :class="item.class"></i>
              {{item.name}}
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col class="contentRight" :span="21" :offset="3">
        <router-view></router-view>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import Header from '../views/header/header.vue'
  export default {
    name: "home",
    data(){
      return{
        showTeacher:false,
        showStudent:false,
        showManager:false,
        menuitem:[
          {path:'/person-msg',name:'个人信息',class: 'fa-line-chart'},
          {path:'/grade-manage',name:'成绩管理', class: 'fa-newspaper-o'},
          {path:'/grade-query',name:'成绩查询', class: 'fa-line-chart'},
          {path:'/grade-write',name:'成绩录入', class: 'fa-newspaper-o'},
          {path:'/system-settings',name:'修改密码', class: 'fa-line-chart'},
        ],
        menuitems:[
          {path:'/person-msg',name:'个人信息',class: 'fa-line-chart'},
          {path:'/grade-query',name:'成绩查询', class: 'fa-line-chart'},
          {path:'/system-settings',name:'修改密码', class: 'fa-line-chart'},
        ],
        menuitemM:[
          {path:'/person-msg',name:'个人信息',class: 'fa-line-chart'},
          {path:'/student-manage',name:'学生管理',class: 'fa-table'},
          {path:'/teacher-manage',name:'教师管理',class: 'fa-newspaper-o'},
          {path:'/course-manage',name:'课程管理', class: 'fa-plug'},
          {path:'/system-settings',name:'修改密码', class: 'fa-line-chart'},
        ],
      }
    },
    components: {
      'v-header': Header
    },
    mounted(){
      let role = sessionStorage.getItem('userrole');
      console.log(role);
      if(role=='教师'){
        this.showTeacher = true;
      }else if(role=='管理员'){
        this.showManager = true;
      }else{
        this.showStudent = true;
      }
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
      });
    },
    methods:{
      dolist(e){
        this.$router.push({path:e})   //点击菜单跳转到指定页面，浏览器地址栏对应指定路由
      }
    }
  }
</script>

<style scoped>
  .el-menu-item{
    background: #eee;
    border-bottom:1px solid #fff;
  }
  .el-menu-item:nth-child(5){
    border-right:3px solid rgb(32, 160, 255);
  }
  .leftmenu{
    height:100%;
    position:fixed;
    background: #eee;
  }
  .contentRight{
    padding:20px;
    background: #f2f2f2;
    height:100%;
    position:fixed;
    overflow-y: auto;
  }
</style>
