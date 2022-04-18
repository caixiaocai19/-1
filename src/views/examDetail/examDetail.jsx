import React, { useEffect, useState } from "react";
import { getExamDetailById, joinExam } from "../../Api/api";
import { useParams } from "react-router-dom";
import Editor from "../../components/Editor";
import { Radio, Modal, Input, message, Table } from "antd";
import "./examDetail.css";
const Examdetail = () => {
  const { id } = useParams();
  const [examDetail, setExamDetail] = useState({
    id: 2,
    title: "考试2",
    description: "这次考试也不难",
    invitationCode: "1234",
    userId: 100000,
    typingId: 2,
    createTime: 1648885524421,
    joinUsers: [
      {
        id: 100001,
        username: "root1",
        avatar: "/images/avatar.jpg",
        nickname: "深林",
        email: "root1@qq.com",
        type: 2,
      },
      {
        id: 100002,
        username: "root2",
        avatar: "/images/avatar.jpg",
        nickname: "root2",
        email: "root2@qq.com",
        type: 1,
      },
    ],
    startTime: "2022-03-30 00:00:00",
    endTime: "2022-04-06 00:00:00",
    retryTimes: 2,
  });
  useEffect(() => {
    getExamDetailById(id)
      .then((res) => {
        setExamDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //输入框
  const [inputValue, setInputValue] = useState("");
  function handleInputChange(even) {
    setInputValue(even.target.value);
  }
  //单选框
  const [radioValue, setRadiovalue] = useState("1");
  function handleRadioChange(even) {
    setRadiovalue(even.target.value);
  }
  //弹出框
  const [visible, setVisible] = useState(false);
  async function handleOnOk() {
    let res = false;
    try {
      res = await joinExam({
        userId: 100003,
        typingExamId: examDetail.id,
        invitationCode: inputValue * 1,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    if (res) {
      setVisible(false);
    } else {
      message.error("邀请码错误");
    }
  }
  function handleOnCancel() {
    setRadiovalue("1");
    setVisible(false);
  }
  //表格
  function handleTableChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  const data = [
    {
      key: 3,
      userId: 100001,
      typingId: 1,
      submitTime: 1648884324421,
      spendTime: 25,
      correctRate: 97.66,
      errorCount: 1,
      typingExamId: 1,
    },
    {
      key: 5,
      userId: 100002,
      typingId: 1,
      submitTime: 1648884524421,
      spendTime: 33,
      correctRate: 95.0,
      errorCount: 0,
      typingExamId: 1,
    },
    {
      key: 9,
      userId: 100003,
      typingId: 1,
      submitTime: 1648884824421,
      spendTime: 13333,
      correctRate: 88.88,
      errorCount: 6,
      typingExamId: 1,
    },
  ];
  const columns = [
    {
      title: "用户ID",
      dataIndex: "userId"
    },
    {
      title: "提交时间",
      dataIndex: "submitTime",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.submitTime - b.submitTime,
    },
    {
      title: "花费时间",
      dataIndex: "spendTime",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.spendTime - b.spendTime,
    },
    {
      title: "正确率",
      dataIndex: "correctRate",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.correctRate - b.correctRate,
    },
    {
      title: "错误总数",
      dataIndex: "errorCount",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.errorCount - b.errorCount,
    },
    {
      title: "考试编号",
      dataIndex: "typingExamId",
    },
  ];
  return (
    <div className="examDetail">
      <Radio.Group
        value={radioValue}
        defaultValue="1"
        buttonStyle="solid"
        className="radioDroup"
        onChange={handleRadioChange}
      >
        <Radio.Button value="1">比赛说明</Radio.Button>
        <Radio.Button value="2" onClick={() => setVisible(true)}>
          报名
        </Radio.Button>
        <Radio.Button value="3">排行榜</Radio.Button>
      </Radio.Group>
      {radioValue === "1" ? (
        <div className="mainContent">
          <div className="contentItem">
            <div>考试标题</div>
            <div>{examDetail.title}</div>
          </div>
          <div className="contentItem">
            <div>考试描述</div>
            <div>{examDetail.description}</div>
          </div>
          <div className="contentItem">
            <div>比赛编号</div>
            <div>{examDetail.id}</div>
          </div>
          <div className="contentItem">
            <div>开始时间</div>
            <div>{examDetail.startTime}</div>
          </div>
          <div className="contentItem">
            <div>结束时间</div>
            <div>{examDetail.endTime}</div>
          </div>
          <div className="contentItem">
            <div className="enjoinPer">参与人</div>
            <div className="userContainer">
              {examDetail.joinUsers.map((item, index) => {
                return (
                  <div className="userDetail" key={index}>
                    <div className="avatorImg">
                      <img
                        src={"http://119.29.136.236:8081" + item.avatar}
                        alt="头像"
                      />
                    </div>
                    <div className="userName">{item.username}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : radioValue === "2" ? (
        <div>
          <Editor></Editor>
        </div>
      ) : (
        <div>
          <Table
            columns={columns}
            dataSource={data}
            onChange={handleTableChange}
          />
        </div>
      )}
      <Modal
        centered
        visible={visible}
        closable={false}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
        width={400}
        okText="确定"
        cancelText="取消"
        maskClosable={false}
      >
        <Input
          placeholder="邀请码"
          onChange={handleInputChange}
          value={inputValue}
        />
      </Modal>
    </div>
  );
};

export default Examdetail;
