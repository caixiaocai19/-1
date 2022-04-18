import React, { useState, useEffect } from "react";
import { List, message, Avatar, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllTypings } from "../../Api/api";
import { useNavigate } from "react-router-dom";
const InfiniteListExample = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    getAllTypings()
      .then((res) => {
        setData([...data, ...res.data]);
        setLoading(false);
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
  function goToExamDetail(id) {
    return function () {
      navigate(`${id}`)
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
        height: 400,
        overflow: "auto",
        padding: "0 16px",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        // next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id} onClick={goToExamDetail(item.id)}>
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
