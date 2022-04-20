import React, { Component } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter, Navigate,HashRouter } from "react-router-dom";
import Index from "./views/index";
import Test from "./views/test";
import Exam from "./views/exam";
import ExamDetail from "./views/examDetail/examDetail";
import TestDetail from "./views/testDetail/testDetail";
import Seting from "./views/setting/seting";
import Addtype from "./views/addType/addType";
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Routes>
          <Route path="/index" element={<Index />}>
            <Route path="test" element={<Test />}></Route>
            <Route path="addType" element={<Addtype />}></Route>
            <Route path="test/:id" element={<TestDetail />}></Route>
            <Route path="seting" element={<Seting />}></Route>
            <Route path="exam" element={<Exam />}></Route>
            <Route path="exam/:id" element={<ExamDetail />}></Route>
            <Route path="" element={<Navigate to="test" />}></Route>
          </Route>
          <Route index element={<Navigate to="/index/test" />}></Route>
        </Routes>
      </HashRouter>
    );
  }
}

export default App;
