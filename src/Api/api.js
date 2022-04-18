import axios from "axios";
let root="http://119.29.136.236:8081";
let api={
    getAllTypings:root+"/front/typing/getAllTypings",
    getExamDetailById:root+"/front/typing/exam/",
    joinExam:root+"/front/typing/joinExam",
    getTypingSubmitOrderByCorrectRate:root+"/front/typing/getTypingSubmitOrderByCorrectRate"
}
//获取所有的测试列表
export function getAllTypings(){
    return axios.get(api.getAllTypings);
}
//获取
export function getExamDetailById(id){
    return axios.get(api.getExamDetailById+id)
}
//加入考试
export function joinExam(data){
    return axios.post(api.joinExam,data);
}
//获取考试的及格率通过ID
export function getTypingSubmitOrderByCorrectRate(data){
    return axios.post(api.getTypingSubmitOrderByCorrectRate,data);
}