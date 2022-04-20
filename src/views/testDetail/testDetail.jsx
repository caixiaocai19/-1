import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "../../components/Editor";
import { getTestDetailById } from "../../Api/api";
const Testdetail = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState({content:""});
  useEffect(() => {
    getTestDetailById(id)
      .then((res) => {
        setTestData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Editor propCode={testData.content}></Editor>
    </div>
  );
};

export default Testdetail;
