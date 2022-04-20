import React, { useState, useEffect } from "react";
import { List, message, Avatar, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllTypingExams, getTypingExamNums } from "../../Api/api";
import { useNavigate } from "react-router-dom";
const InfiniteListExample = () => {
  const [loading, setLoading] = useState(false);
  //考试题目
  const [data, setData] = useState([]);
  //考试题目的总数
  const [totalExamNums, setTotalExamNums] = useState(0);
  //分页处理
  const page = 1;
  const limit = 6;
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    //获取数据库的总数
    getTypingExamNums()
      .then((res) => {
        setTotalExamNums(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllTypingExams(page, limit)
      .then((res) => {
        setData([...data, ...res.data]);
        setLoading(false);
        page++;
      })
      .catch(() => {
        setLoading(false);
      });
    // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    //   .then(res => res.json())
    //   .then(body => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  //前往题目的详情
  const navigate = useNavigate();
  function goToExamDetail(item) {
    let now = new Date().getTime();
    if (new Date(item.startTime).getTime() <= now && new Date(item.endTime).getTime() >= now) {
      return function () {
        navigate(`${item.id}`);
      };
    } else {
      return function () {
        message.warn("当前时间不在考试时间内！！");
      };
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
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length <= totalExamNums}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多考试了哦 🤐</Divider>}
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
                    考试描述{item.description}
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
                开始时间：
                {`${new Date(item.startTime).getFullYear()}年 ${new Date(
                  item.startTime
                ).getMonth()+1}月 ${new Date(item.startTime).getDay()}日`}
              </div>
              <div
                style={{
                  color: "#3f3f3f",
                  fontSize: "20px",
                  marginRight: "50px",
                }}
              >
                结束时间：
                {`${new Date(item.endTime).getFullYear()}年 ${new Date(
                  item.endTime
                ).getMonth()+1}月 ${new Date(item.endTime).getDay()}日`}
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
