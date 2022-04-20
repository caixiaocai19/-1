import { Table, Modal, message, Radio } from "antd";
import React, { useEffect, useState } from "react";
import {
  getAllTypings2,
  deleteTest,
  getAllTypingExams2,
  deleteExam,
} from "../../Api/api";
const Setting = () => {
  const [id, setId] = useState(null);
  const [radioValue, setRadiovalue] = useState("1");
  function handleRadioChange(even) {
    if (even.target.value === "1") {
      getAllTypings2()
        .then((res) => {
          let resdata = res.data;
          resdata.forEach((element) => {
            element.key = element.id;
          });
          setData(resdata);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
    setRadiovalue(even.target.value);
  }
  //数据加载
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    getAllTypings2()
      .then((res) => {
        let resdata = res.data;
        resdata.forEach((element) => {
          element.key = element.id;
        });
        setData(resdata);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllTypingExams2()
      .then((res) => {
        let resdata = res.data;
        resdata.forEach((element) => {
          element.key = element.id;
        });
        setData2(resdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //弹窗处理
  const [visible, setVisible] = useState(false);
  function handleOnOK() {
    if (radioValue === "1") {
      deleteTest(id)
        .then((res) => {
          setData(data.filter((item) => item.id !== id));
          message.success("删除改测试成功！");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteExam(id)
        .then((res) => {
          setData2(data.filter((item) => item.id !== id));
          message.success("删除改测试成功！");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setVisible(false);
  }
  //列表格式
  const columns = [
    {
      title: "id",
      width: 100,
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "title",
      width: 100,
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
      width: 150,
    },
    {
      title: "uploadTime",
      dataIndex: "uploadTime",
      key: "uploadTime",
      width: 150,
    },
    {
      title: "difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: 150,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (props) => (
        <a
          onClick={() => {
            setId(props.id);
            setVisible(true);
          }}
        >
          删除
        </a>
      ),
    },
  ];
  const columns2 = [
    {
      title: "id",
      width: 100,
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "title",
      width: 100,
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
      width: 150,
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "invitationCode",
      dataIndex: "invitationCode",
      key: "invitationCode",
      width: 150,
    },
    {
      title: "typingId",
      dataIndex: "typingId",
      key: "typingId",
      width: 150,
    },
    {
      title: "createTime",
      dataIndex: "createTime",
      key: "createTime",
      width: 150,
    },
    {
      title: "startTime",
      dataIndex: "startTime",
      key: "startTime",
      width: 150,
    },
    {
      title: "endTime",
      dataIndex: "endTime",
      key: "endTime",
      width: 150,
    },
    {
      title: "retryTimes",
      dataIndex: "retryTimes",
      key: "retryTimes",
      width: 150,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (props) => (
        <a
          onClick={() => {
            setId(props.id);
            setVisible(true);
          }}
        >
          删除
        </a>
      ),
    },
  ];
  return (
    <div>
      <Radio.Group
        value={radioValue}
        defaultValue="1"
        buttonStyle="solid"
        className="radioDroup"
        onChange={handleRadioChange}
      >
        <Radio.Button value="1">测试</Radio.Button>
        <Radio.Button value="2">考试</Radio.Button>
      </Radio.Group>
      {radioValue === "1" ? (
        <div>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 1500 }}
            summary={(pageData) => (
              <Table.Summary fixed={"top"}>
                <Table.Summary.Row></Table.Summary.Row>
              </Table.Summary>
            )}
            sticky
          />
          <Modal
            visible={visible}
            onOk={handleOnOK}
            onCancel={(even) => {
              console.log(even);
              setVisible(false);
            }}
            okText="确认"
            cancelText="取消"
          >
            <p>确定要删除这个考试吗？</p>
          </Modal>
        </div>
      ) : (
        <div>
          <Table
            columns={columns2}
            dataSource={data2}
            scroll={{ x: 1500 }}
            summary={(pageData) => (
              <Table.Summary fixed={"top"}>
                <Table.Summary.Row></Table.Summary.Row>
              </Table.Summary>
            )}
            sticky
          />
          <Modal
            visible={visible}
            onOk={handleOnOK}
            onCancel={(even) => {
              console.log(even);
              setVisible(false);
            }}
            okText="确认"
            cancelText="取消"
          >
            <p>确定要删除这个考试吗？</p>
          </Modal>
        </div>
      )}
    </div>
  );
};
export default Setting;
