const baseUrl='http://www.rainrain.xin:12345/studentdb'
var getUserLogin = function (id,passwd,role) {
  const url = `${baseUrl}/user/login/${id}/${passwd}/${role}`;
  return url;
};
// 查询所有课程信息
var getCourse = function(){
  const url =`${baseUrl}/class/info`;
  return url;
}
// 删除课程
var deleteCourse = function(id){
  const url =`${baseUrl}/class/delete/${id}`;
  return url;
}

// 新增课程
var addCourse = function(){
  const url =`${baseUrl}/class/insert`;
  return url;
};

//获取教师id和姓名
var gettMsg = function(){
  const url = `${baseUrl}/teacher/id`;
  return url;
}

// 编辑修改课程信息
var changeCourse = function(){
  const url = `${baseUrl}/class/edit`;
  return url;
}
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
}
//编辑修改教师信息
var changeTeacher = function(){
  const url = `${baseUrl}/user/edit`;
  return url;
}
//获取所有课程
var getallCourse = function(){
  const url =`${baseUrl}/class/info`;
  return url;
};

export default {
  baseUrl
  ,getUserLogin
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

}
