import React, { Component } from 'react';
import "./App.css";
import {Route,Routes,BrowserRouter,Navigate} from "react-router-dom";
import Index from "./views/index";
import Test from './views/test';
import Exam from "./views/exam";
import Rank from './views/rank/rank';
import ExamDetail from './views/examDetail/examDetail'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/index' element={<Index />}>
          <Route path="test" element={<Test />}></Route>
          <Route path="exam" element={<Exam />}></Route>
          <Route path="exam/:id" element={<ExamDetail />}></Route>
          <Route path="Rank" element={<Rank/>}></Route>
          <Route path="" element={<Navigate to="test" />}></Route>
        </Route>
        {/* <Route index element={<Navigate to="/index/test" />}></Route> */}
      </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
