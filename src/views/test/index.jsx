import React, { useState, useEffect } from "react";
import { List, message, Select, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAllTypings,
  getTypingNums,
  getTypingsByDifficulty,
  getTypingNumsByDifficulty,
} from "../../Api/api";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const InfiniteListExample = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  //考试测试的总数
  const [totalNums, setTotalNums] = useState(0);
  //分页处理
  let page = 1;
  const limit = 6;
  //加载数据的动态函数
  let difficulty = 0;
  let loadDateFunc = null;
  let getDatebaseSize = null;
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    //获取数据库的总数
    getDatebaseSize(difficulty)
      .then((res) => {
        setTotalNums(res);
      })
      .catch((err) => {
        console.log(err);
      });
    loadDateFunc(page, limit, difficulty)
      .then((res) => {
        setData([...data, ...res.data]);
        setLoading(false);
        page++;
      })
      .catch(() => {
        setLoading(false);
      });
  };
  function selectChangeHandle(even) {
    loadDateFunc = getTypingsByDifficulty;
    getDatebaseSize = getTypingNumsByDifficulty;
    difficulty = even * 1;
    //获取数据库的总数
    page = 1;
    getDatebaseSize(difficulty)
      .then((res) => {
        setTotalNums(res);
      })
      .catch((err) => {
        console.log(err);
      });
    loadDateFunc(page, limit, difficulty)
      .then((res) => {
        setData([...res.data]);
        setLoading(false);
        page++;
      })
      .catch(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    loadDateFunc = getAllTypings;
    getDatebaseSize = getTypingNums;
    loadMoreData();
  }, []);
  //前往题目的详情
  const navigate = useNavigate();
  function goToExamDetail(item) {
    return function () {
      navigate(`${item.id}`);
    };
  }
  //获取题目的难度
  function getDifficulty(num) {
    switch (num) {
      case 0:
        return <span style={{ color: "#52c41a" }}>简单</span>;
      case 1:
        return <span style={{ color: "#ffc116" }}>中等</span>;
      case 2:
        return <span style={{ color: "#e74c3c" }}>困难</span>;
    }
  }
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 600,
        overflow: "auto",
        padding: "0 16px",
      }}
    >
      <Select placeholder="按不同难度进行展示" onChange={selectChangeHandle}>
        <Option value="0">简单</Option>
        <Option value="1">中等</Option>
        <Option value="2">困难</Option>
      </Select>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length <= totalNums}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多测试了哦 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id} onClick={goToExamDetail(item)}>
              <List.Item.Meta
                title={
                  <div style={{ color: "#3498db", fontSize: "28px" }}>
                    {item.title}
                  </div>
                }
                description={
                  <h1 style={{ color: "#3498db", fontSize: "20px" }}>
                    我的难度是{getDifficulty(item.difficulty)}
                  </h1>
                }
              />
              <div
                style={{
                  color: "#3f3f3f",
                  fontSize: "20px",
                  marginRight: "50px",
                }}
              >
                发布时间是
                {`${new Date(item.uploadTime).getFullYear()}年 ${new Date(
                  item.uploadTime
                ).getMonth()}月 ${new Date(item.uploadTime).getDay()}日`}
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
const Exam = () => {
  return (
    <div>
      <InfiniteListExample></InfiniteListExample>
    </div>
  );
};
export default Exam;
