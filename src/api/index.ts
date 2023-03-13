//数据展示，api进行统一管理
import $axios from './request';

//秦发强
//请假管理页面数据（学生）
export const getsleave = (object:object,test:any) => $axios.get("/leave/selectForAdmin?stuId="+test,{
    params: object
})
//请假管理页面数据（教师）
export const gettleave = (object:object) => $axios.get("/leave/selectForAdmin",{
    params: object
})
//请假管理页面数据（管理员）
export const getaleave = (object:object) => $axios.get("/leave/selectForAdmin",{
    params: object
})
//学生修改请假
export const revise = (leaveId:string,leaveType:string,leaveReason:string,startTime:any,endTime:any,leaveDetails:string,relaventDocuments:string) => $axios.post("/leave/update?leaveId="+leaveId+"&leaveType="+leaveType+"&leaveReason="+leaveReason+"&startTime="+startTime+"&endTime="+endTime+"&leaveDetails="+leaveDetails+"&relaventDocuments="+relaventDocuments)
//学生新增请假
export const add = (stuId:string,submitTime:string,startTime:string,endTime:string,leaveType:string,leaveReason:string,leaveDetails:string,relaventFile:string) => $axios.post("/leave/add?stuId="+stuId+"&submitTime="+submitTime+"&startTime="+startTime+"&endTime="+endTime+"&leaveType="+leaveType+"&leaveReason="+leaveReason+"&leaveDetails="+leaveDetails+"&relaventFile="+relaventFile)
//老师批假
export const revise1 = (leaveId:string,leaveStatus:string) => $axios.post("/leave/update?leaveId="+leaveId+"&leaveStatus="+leaveStatus)
//登录判断权限
export const login = (account1:string,root1:string) => $axios.get("/login/root?account="+account1+"&root="+root1)
//登录判断账户与密码
export const judge = (account1:string,password1:string,root1:string) => $axios.post("login/logging",{account:account1,root:root1,password:password1})


//胡龙宇
// 项目课程表页面请求数据（学生）
export const getstuCourse = (object:object,id:any) => $axios.get("/Course/stuCourse/"+id,{
    params: object
})
// 项目课程表页面数据（教师）
export const getTCourse=(object:object,id:any)=>$axios.get("/Course/teacherCourse/"+id,{
  params: object
})
// 项目课程表页面数据---查看学生页面（教师）
export const getTCoursestudent=(id: any,studyobject:object)=>$axios.get("Course/getStudentByCourse/"+id,{
  params: studyobject
})


// 课程管理页面---查看所有课程（管理员）-----接口用不了
export const Viewcourses=()=>$axios.get("/selectAllCourse")
// 课程管理页面---查看项目（管理员）用于搜索功能
export const ViewcoselectProjectIdAndNameurses=()=>$axios.get("/selectProjectIdAndName")

// 课程管理页面---请求课程下拉框数据--添加课程（管理员）
export const chooseGroup=()=>$axios.get("/chooseGroup")
// 课程管理页面---请求实训教师下拉框数据--添加课程（管理员）
export const trainingTeacherIdAndName=()=>$axios.get("/trainingTeacherIdAndName")
// 课程管理页面---请求责任教师下拉框数据--添加课程（管理员）
export const teacherIdAndName=()=>$axios.get("/teacherIdAndName")








//王鑫宇
//考情管理页面数据(学生)
export const getsAttendance = (object:object) => $axios.get("/attendance/toStu/199000101",{
  params:object
})
//打卡记录页面数据(学生)
export const getsClockin = () => $axios.get("/punchin/record/199000101")
//考勤管理页面数据(教师)
export const gettAttendance= (object:object) => $axios.get("/attendance/toTeacher/T_01",{
    params:object
})
//打卡记录页面数据(教师)
export const  gettClockin = () => $axios.get("/punchin/record/toTeacher/T_01",{
   

})
//考勤管理页面数据(管理员)
export const getaAttendance= (object:object) => $axios.get("/attendance/toAdmin",{
    params:object
  })
//打卡记录页面数据(管理员)
export const  getaClockin = () => $axios.get("/punchin/record/toAdmin",{
  
})
// //导入打卡记录(管理员)
// export const  importrecord= () => $axios.post("/punchin/importExcel")
// //下载导入模板(管理员)
// export const  Downloadtemplate= () => $axios.get("/stuHomework/downloadFile")
// //导出文档(管理员)
// export const  Exportrecord= () => $axios.get("/punchin/downloadexcel")





//张丽
// 待提交的作业
export const getTeacher = (object: object) =>$axios.get("/stuHomework/selectNoSendHomWorkByStu",{
    params:object
});
// 获取教师页面信息
export const teacherMsee= () => $axios.post("/teacherInfo/teacherInfoList")
// 获取学生页面
export const stuMess= (object:object) => $axios.get("/classInfo/selectClass",{params:object})
// 教师信息的初始页面
export const teachMes= (object:object) => $axios.get("/teacherInfo/teacherInfoList",{params:object})
// 查询教师页面的信息
export const teachDetail= (object:object) => $axios.get("/teacherInfo/teacherInfo",{params:object})
// 新增班级
export const addClass= (object:object) => $axios.get("/classInfo/insertClass",{params:object})
// 教师下发作业
export const teacHand= (object:object) => $axios.get("/teaHomework/selectTeaHomework",{params:object})

// 教师查看未批复的
export const teacno= (object:object) => $axios.get("/teaHomework/updateTeaHomework",{params:object})






         
//邱彦
//学生个人信息
export const test = (id:any) => $axios.get("/student/getInfo?stuId="+id)
//学生信息修改手机号码
export const updatephone = (id:any,phone:number) => $axios.get("student/updatePhone/"+id+'?stuPhone='+phone)
//学生信息修改邮箱号码
export const updateEmail = (id:any,Email:any) => $axios.get("student/updateEmail/"+id+'?stuEmail='+Email)
//学生个人信息管理实训小组
export const stest = (id:any,projectId:any) => $axios.get("/student/getGroupMemberInfo/"+projectId+'/'+id)
//学生个人信息管理项目得分
export const xtest = (id:any,projectId:any) => $axios.get("/student/getGroupInfo/"+projectId+'/'+id)
//教师综合打分
export const score = () => $axios.get("/personalScore/toTeacher/T_01")
//教师综合打分个人综合打分
export const tcore = () => $axios.get("/personalScore/detail/199000101")
//教师综合打分小组综合打分
export const xcore = () => $axios.get("/student/getGroupInfo/1/199000101")
//管理员综合打分
export const ascore = () => $axios.get("/personalScore/toAdmin",{
    
})



//卢伟
//学生信息管理-作业管理-待批复页面数据
export const getGoOfApproval = (object:object) => $axios.get("/stuHomework/selectNoDealHomWorkByStu",{
    params:object
});
//学生信息管理-作业管理-已批复页面数据
export const getHasBeenApproval = (object: object) =>$axios.get("/stuHomework/selectDealHomWorkByStu",{
    params:object
});
//教师信息管理-作业管理-待批复页面数据
export const getTApproval = () => $axios.get("/teaHomework/selectNoDealTeaHomework");
//教师信息管理-作业管理-已批复页面数据
export const getHasApproved = () => $axios.get("/teaHomework/selectDealHomework");
//管理员信息管理-项目组管理-页面数据
export const getGroups = (object:object) => $axios.get("/projectTeam/queryProjectTeams",{
    params:object
});
//管理员信息管理-项目组管理-新增成员页面数据
export const getAddGroupMenber = () => $axios.get("/projectTeam/queryProjectTeams");




// 修改密码
export const ChangePassword=(account:string,root:string,oldPassword:string,newPassword:string)=>$axios.post("/password/changePassword",{
    account:account,
    root:root,
    oldPassword:oldPassword,
    newPassword:newPassword,
})