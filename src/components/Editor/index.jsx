import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
import "./index.css";
import { translate } from "../../utils/createMd";
import { message, Button ,Modal} from "antd";
let md = translate();
let compareString = "";
let startTime;
let endTime;
let timer;
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "考试题目",//题目
      myInputCode: "",//我的输入内容
      startExam:false,//是否开始比赛了
      time:0,//时间单位为秒,
      visible:false,//提示栏是否可见
      completeTime:0,//精确的完成时间
      errCount:0//错误数量
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
  }
  //内容改变的回调
  onChangeHandle(value, e) {
    
    this.setState({ myInputCode: value });
    return false;
  }
  editorDidMountHandle(editor, monaco) {
    //开始时间记录
    startTime = new Date().getTime();
    editor.focus();
  }
  componentDidMount() {
      compareString = this.props.propCode.slice(6, this.props.propCode.length - 5);
  }
  //获取对应的样式
  getClassName = (code, index) => {
    if (code === compareString[index]) {
      return `code-success`;
    } else {
      return `code-error`;
    }
  };
  //防止学生复制粘贴
  handleCopy = (e) => {
    e.preventDefault();
    message.warn("不要耍这样的小聪明！！！");
  };
  //开始考试
  startExam=()=>{
    //开启一个定时器进行计时
    timer = setInterval(()=>{
      this.setState((state)=>({time:state.time+1}));
    },1000);
    this.setState({startExam:true})
  }
  //重新开始考试
  restartExam=()=>{
    this.init();
    clearInterval(timer);
  }
  //点击提交测试
  submitExam=()=>{
    let cnt=0;
    const {myInputCode,errCount} = this.state;
    if(compareString.length!==myInputCode.length){//改为长度相同就可以
      message.warn("你的程序和目标程序长度不一致！");
      return;
    }
    endTime = new Date().getTime();
    //统计错误数量
    for(let i=0;i<compareString.length;i++){
      if(compareString[i]!==myInputCode[i]){
        cnt++;
        this.setState((state)=>({errCount:state.errCount+1}));
      }
    }
    let data={
      spendTime:endTime-startTime,
      correctRate:(1-cnt/compareString.length)*100,
      errorCount:cnt
    }
    this.props.handleSubmit&&this.props.handleSubmit(data);
    clearInterval(timer);
    this.setState({visible:true,completeTime:(endTime-startTime)/1000});
  }
  //点击ok的处理逻辑
  onOkHandle=()=>{
    this.init();
  }
  //点击取消的处理逻辑
  onCancelHandle=()=>{
    this.init();
  }
  //初始化逻辑
  init=()=>{
    startTime=0;
    endTime=0;
    this.setState({
      myInputCode: "",//我的输入内容
      startExam:false,//是否开始比赛了
      time:0,//时间单位为秒,
      visible:false,//提示栏是否可见
      completeTime:0,//精确的完成时间
      errCount:0//错误数量
    })
  }
  render() {
    const {code,time,myInputCode,visible,completeTime,startExam,errCount} = this.state;
    const options = {
      selectOnLineNumbers: true,
      renderSideBySide: false,
    };
    return (
      <div>
        <div className="examControl">
          <Button type="primary" className="startExam" onClick={this.startExam}  disabled={startExam}>开始测试</Button>
          <Button type="primary" onClick={this.restartExam}>重新开始测试</Button>
          <span className="alreadyTime">已经花费的时间{time}s</span>
        </div>
        <div className="wrapper">
          <div className="editor-container">
            {
              this.state.startExam?(<MonacoEditor
                width="700"
                height="600"
                theme="vs-dark"
                language="cpp"
                value={myInputCode}
                options={options}
                onChange={this.onChangeHandle}
                editorDidMount={this.editorDidMountHandle}
              />):<div className="beforeExam"></div>
            }
          </div>
          <div className="view">
            <span className="myInput">
              {myInputCode.split("").map((item, index) => {
                return (
                  <span key={index} className={this.getClassName(item, index)}>
                    {item === "\n" ? (
                      <br />
                    ) : item === " " ? (
                      <span>&nbsp;</span>
                    ) : (
                      item
                    )}
                  </span>
                );
              })}
            </span>
            <span
              onCopy={this.handleCopy}
              dangerouslySetInnerHTML={{
                __html: md.render(this.props.propCode),
              }}
            ></span>
          </div>
        </div>
        <Button type="primary" className="submitExam" onClick={this.submitExam} disabled={!startExam}>提交答案</Button>
        <Modal
        title="测试结束"
        okText="再来一次"
        cancelText="取消"
        centered
        visible={visible}
        onOk={this.onOkHandle}
        onCancel={this.onCancelHandle}
        width={1000}
        maskClosable={false}
      >
        <h1>你本次完成测试的时间是{completeTime}s</h1>
        <h1>你本次完成测试的的错误率是{errCount/myInputCode.length*100}%</h1>
      </Modal>
      </div>
    );
  }
}

export default Editor;
