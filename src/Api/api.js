import axios from "axios";
let root = "http://119.29.136.236:8081";
let api = {
  getAllTypings: root + "/front/typing/getAllTypings",
  getExamDetailById: root + "/front/typing/exam/",
  getTestDetailById: root + "/front/typing/",
  joinExam: root + "/front/typing/joinExam",
  getTypingSubmitOrderByCorrectRate:
    root + "/front/typing/getTypingSubmitOrderByCorrectRate",
  getTypingSubmitOrderBySpendTime:
    root + "/front/typing/getTypingSubmitOrderBySpendTime",
  addSubmit: root + "/front/typing/addSubmit",
  getTypingSubmitByExamId: root + "/front/typing/getTypingSubmitByExamId",
  getAllTypingExams: root + "/front/typing/getAllTypingExams",
  getTypingExamNums: root + "/front/typing/getTypingExamNums",
  getTypingNums: root + "/front/typing/getTypingNums",
  deleteExam: root + "/front/typing/deleteExam",
  deleteTest: root + "/front/typing/delete",
  addTest: root + "/front/typing/add",
  addExam: root + "/front/typing/addExam",
  getTypingsByDifficulty: root + "/front/typing/getTypingsByDifficulty",
  getTypingNumsByDifficulty: root + "/front/typing/getTypingNumsByDifficulty",
};
//根据难度获取改题目的数量
export function getTypingNumsByDifficulty(difficulty) {
  return axios.get(api.getTypingNumsByDifficulty + `?difficulty=${difficulty}`);
}
//根据难度获取所有的测试
export function getTypingsByDifficulty(page, limit, difficulty) {
  let param = new URLSearchParams();
  param.append("limit", limit);
  param.append("page", page);
  param.append("difficulty", difficulty);
  return axios.post(api.getTypingsByDifficulty,param);
}
//新增考试
export function addExam(data) {
  let param = new URLSearchParams();
  param.append("title", data.title);
  param.append("description", data.description);
  param.append("userId", data.userId);
  param.append("typingId", data.typingId);
  param.append("endTime", data.endTime);
  param.append("startTime", data.startTime);
  param.append("retyTimes", data.retryTimes);
  return axios.post(api.addExam, param);
}

//新增测试
export function addTest(data) {
  let param = new URLSearchParams();
  param.append("title", data.title);
  param.append("content", data.content);
  param.append("userId", data.userId);
  param.append("uploadTime", data.uploadTime);
  param.append("difficulty", data.difficulty);
  return axios.post(api.addTest, param);
}
//删除测试
export function deleteTest(id) {
  return axios.post(api.deleteTest + `?id=${id}`);
}
//删除考试
export function deleteExam(id) {
  return axios.post(api.deleteExam + `?id=${id}`);
}
//获取考试题目的总数
export function getTypingExamNums() {
  return axios.get(api.getTypingExamNums);
}
//获取所有测试的总数
export function getTypingNums() {
  return axios.get(api.getTypingNums);
}
//获取所有的测试列表
export function getAllTypings(page, limit) {
  return axios.get(api.getAllTypings, { page, limit });
}
//获取所有的测试列表
export function getAllTypings2() {
  return axios.get(api.getAllTypings);
}
//获取所有的考试列表
export function getAllTypingExams(page, limit) {
  return axios.get(api.getAllTypingExams, { page, limit });
}
//获取所有的考试列表
export function getAllTypingExams2() {
  return axios.get(api.getAllTypingExams);
}
//获取考试详情
export function getExamDetailById(id) {
  return axios.get(api.getExamDetailById + id);
}
//获取测试详情
export function getTestDetailById(id) {
  return axios.get(api.getTestDetailById + id);
}
//加入考试
export function joinExam(data) {
  return axios.post(
    api.joinExam +
      `?userId=${data.userId}&typingExamId=${data.typingExamId}&inviationCode=${data.invitationCode}`
  );
}
//获取考试的及格率通过ID
export function getTypingSubmitOrderByCorrectRate(id) {
  return axios.post(
    api.getTypingSubmitOrderByCorrectRate + `?typingExamId=${id}`
  );
}
//获取考试的时间通过ID
export function getTypingSubmitOrderBySpendTime(data) {
  return axios.post(api.getTypingSubmitOrderBySpendTime, data);
}
//提交考试结果
export function addSubmit(data) {
  let param = new URLSearchParams();
  param.append("userId", data.userId);
  param.append("typingId", data.typingId);
  param.append("submitTime", data.submitTime);
  param.append("spendTime", data.spendTime);
  param.append("correctRate", data.correctRate);
  param.append("errorCount", data.errorCount);
  param.append("typingExamId", data.typingExamId);
  return axios.post(api.addSubmit, param);
}
//获取考试的所有提交
export function getTypingSubmitByExamId(id) {
  return axios.post(api.getTypingSubmitByExamId + `?typingExamId=${id}`);
}
