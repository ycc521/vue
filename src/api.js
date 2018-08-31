const baseUrl='http://www.rainrain.xin:12345/studentdb';
// 登录地址
var getUserLogin = function (id,passwd,role) {
  const url = `${baseUrl}/user/login/${id}/${passwd}/${role}`;
  return url;
};
// 获取个人信息
var getPersonmsg = function (id,role){
  const url = `${baseUrl}/userInfo/${id}/${role}`;
  return url;
};
// 查询所有课程信息
var getCourse = function(){
  const url =`${baseUrl}/class/info`;
  return url;
};
// 删除课程
var deleteCourse = function(id){
  const url =`${baseUrl}/class/delete/${id}`;
  return url;
};

// 新增课程
var addCourse = function(){
  const url =`${baseUrl}/class/insert`;
  return url;
};

//获取教师id和姓名
var gettMsg = function(){
  const url = `${baseUrl}/teacher/id`;
  return url;
};

// 编辑修改课程信息
var changeCourse = function(){
  const url = `${baseUrl}/class/edit`;
  return url;
};
//获取所有教师信息
var getTeacher = function(page,size){
  const url =`${baseUrl}/teacher/info/${page}/${size}`;
  return url;
};

//新增教师

var addTeacher = function(){
  const url =`${baseUrl}/user/insert`;
  return url;
};
// 删除教师
var deleteTeacher = function(id,role){
  const url =`${baseUrl}/user/delete/${id}/${role}`;
  return url;
};
//编辑修改教师信息
var changeTeacher = function(){
  const url = `${baseUrl}/user/edit`;
  return url;
};
//获取所有课程
var getallCourse = function(){
  const url =`${baseUrl}/class/info`;
  return url;
};

// 获取所有学生信息
var getStudent = function(page,size){
  const url =`${baseUrl}/student/info/${page}/${size}`;
  return url;
};
// 新增学生信息
var addStudent = function(){
  const url =`${baseUrl}/user/insert`;
  return url;
};
//删除当前学生信息
var deleteStudent = function(id,role){
  const url =`${baseUrl}/user/delete/${id}/${role}`;
  return url;
};
var changeStudenet = function(){
  const url = `${baseUrl}/user/edit`;
  return url;
};
// 获取所有课程成绩
var getallCoursescore = function(page,size){
  const url =`${baseUrl}/score/info/all/${page}/${size}`;
  return url;
};
//修改成绩
var changeScore = function(){
  const url = `${baseUrl}/score/edit`;
  return url;
};
// 根据id删除成绩
var deleteScore = function(id){
  const url =`${baseUrl}/score/delete/${id}`;
  return url;
};
// 根据id获取成绩
var getScore = function(id){
  const url =`${baseUrl}/score/info/byStudent/${id}`;
  return url;
};
//新增成绩
var addScore = function(){
  const url =`${baseUrl}/score/insert`;
  return url;
};
//根据学号、课程id、是否及格、查学生成绩
var inqueryScore = function(){
  const url =`${baseUrl}/score/search`;
  return url;
};
// 导出到excel
var exportExcel = function(){
  const url =`${baseUrl}/score/export/all`;
  return url;
}
export default {
  baseUrl
  ,getUserLogin
  ,getPersonmsg
  ,getCourse
  ,deleteCourse
  ,addCourse
  ,getTeacher
  ,addTeacher
  ,deleteTeacher
  ,changeTeacher
  ,getallCourse
  ,gettMsg
  ,changeCourse
  ,getStudent
  ,addStudent
  ,deleteStudent
  ,changeStudenet
  ,getallCoursescore
  ,changeScore
  ,deleteScore
  ,getScore
  ,addScore
  ,inqueryScore
  ,exportExcel
}
