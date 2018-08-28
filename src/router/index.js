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
        { path: '/person-msg', component: PersonMsg, name: 'person-msg'},
        { path: '/student-manage', component: StudentMessage, name: 'student-manage' },
        { path: '/teacher-manage', component: TeacherManage, name: 'teacher-manage' },
        { path: '/course-manage', component: CourseMessage, name: 'course-manage' },
        { path: '/grade-manage', component: GradeMessage, name: 'grade-manage' },
        { path: '/grade-query', component: GradeQuery, name: 'grade-query' },
        { path: '/grade-write', component: GradeWrite, name: 'grade-write' },
      ]
    }
  ]
})
