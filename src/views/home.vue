<template>
  <el-row style="height:100%">
    <v-header></v-header>
    <el-row>
      <el-col class="leftmenu" :span="3">
        <el-menu :default-active="$route.path" light router>
          <template v-for="(item,index) in menuitem">
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
        menuitem:[
          {path:'/person-msg',name:'个人信息',class: 'fa-line-chart'},
          {path:'/student-manage',name:'学生管理',class: 'fa-table'},
          {path:'/teacher-manage',name:'教师管理',class: 'fa-newspaper-o'},
          {path:'/course-manage',name:'课程管理', class: 'fa-plug'},
          {path:'/grade-manage',name:'成绩管理', class: 'fa-newspaper-o'},
        ]
      }
    },
    components: {
      'v-header': Header
    },
    methods:{
      dolist(e){
        this.$router.push({path:e})
      }
    }
  }
</script>

<style scoped>
  .el-menu-item{
    background: #eee;
    border-bottom:1px solid #fff;
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
