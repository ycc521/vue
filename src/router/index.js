import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Home from '../views/home'
import PersonMsg from '../views/person-msg'
import StudentMessage from '../views/student-manage'
import TeacherManage from '../views/teacher-manage'
import CourseMessage from '../views/course-manage'
import GradeMessage from '../views/grade-manage/grade-manage'
import GradeQuery from '../views/grade-manage/grade-query'
import GradeWrite from '../views/grade-manage/grade-write'
import SystemSettings from '../views/system-settings'
// import App from '../App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      component: HelloWorld,
    },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/person-msg', component: PersonMsg, name: 'person-msg'},                   //个人信息
        { path: '/student-manage', component: StudentMessage, name: 'student-manage' },    //学生管理
        { path: '/teacher-manage', component: TeacherManage, name: 'teacher-manage' },     //教师管理
        { path: '/course-manage', component: CourseMessage, name: 'course-manage' },       //课程管理
        { path: '/grade-manage', component: GradeMessage, name: 'grade-manage' },          //成绩管理
        { path: '/grade-query', component: GradeQuery, name: 'grade-query' },              //成绩查询
        { path: '/grade-write', component: GradeWrite, name: 'grade-write' },              //成绩录入
        { path:'/system-settings',component: SystemSettings, name:'system-settings'}      //系统设置
      ]
    }
  ]
})
