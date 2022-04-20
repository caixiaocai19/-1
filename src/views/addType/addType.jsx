import React, { useState, useEffect } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  message,
  Radio,
  InputNumber,
  DatePicker,
} from "antd";
import MonacoEditor from "react-monaco-editor";
import { addTest, getAllTypings2, addExam } from "../../Api/api";
const RangePicker = DatePicker.RangePicker;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const formItemLayout2 = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "请选择对应的开始和结束时间!",
    },
  ],
};
const Addtype = () => {
  //单选框选择练习还是考试
  const [radioValue, setRadioValue] = useState("1");
  const [selectItem, setSelectItem] = useState([]);
  function handleRadioChange(even) {
    if (even.target.value === "2") {
      getAllTypings2()
        .then((res) => {
          setSelectItem(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setRadioValue(even.target.value);
  }
  const options = {
    selectOnLineNumbers: true,
    renderSideBySide: false,
  };
  //内容改变的回调
  const [myInputCode, setMyInputCode] = useState("");
  function onChangeHandle(value, e) {
    setMyInputCode(value);
    return false;
  }
  //初次挂载
  function editorDidMountHandle(editor, monaco) {
    editor.focus();
    return false;
  }
  //完成操作
  const onFinish2 = (fieldsValue) => {
    const rangeValue = fieldsValue["range-picker"];
    const values = {
      ...fieldsValue,
      "range-picker": [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
    };
    const data = {
      title: values.title,
      description: values.description,
      userId: 10, //登录后获取
      typingId: values.select,
      startTime: values["range-picker"][0],
      endTime: values["range-picker"][1],
      createTime: new Date().getTime(),
      retryTimes: values.retryTime,
    };
    addExam(data)
      .then((res) => {
        message.success("新增考试成功！");
      })
      .catch((err) => {
        message.error("新增考试失败！");
      });
  };
  const onFinish = (values) => {
    if (myInputCode === "") {
      message.warn("你是不是忘记输入代码了！！！！");
      return;
    }
    let content = `\`\`\`c\r\n` + myInputCode + `\r\n\`\`\``;
    const data = {
      title: values.input,
      content,
      userId: 1,
      uploadTime: new Date().getTime(),
      difficulty: values.select,
    };
    addTest(data)
      .then((res) => {
        console.log(res);
        message.success("新增成功！");
      })
      .catch((err) => {
        console.log(err);
        message.error("新增失败");
      });
    setMyInputCode("");
  };
  //邀请码校验
  const [invitaStatus,setInvitaStatus]=useState('');
  function invitatBlur(even){
      if(even.target.value.length===6){
          setInvitaStatus('success');
      }else{
          setInvitaStatus('error')
      }
  }
  return (
    <div>
      <Radio.Group
        value={radioValue}
        defaultValue="1"
        buttonStyle="solid"
        className="radioDroup"
        onChange={handleRadioChange}
      >
        <Radio.Button value="1">练习</Radio.Button>
        <Radio.Button value="2">考试</Radio.Button>
      </Radio.Group>
      {radioValue === "1" ? (
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            "input-number": 3,
            "checkbox-group": ["A", "B"],
            rate: 3.5,
          }}
        >
          <Form.Item label="功能">
            <span className="ant-form-text">新增一个练习</span>
          </Form.Item>

          <Form.Item
            name="input"
            label="标题"
            hasFeedback
            rules={[
              {
                required: true,
                message: "请输入这次练习的标题",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            name="select"
            label="练习难度"
            hasFeedback
            rules={[
              {
                required: true,
                message: "请选择这次练习的难度",
              },
            ]}
          >
            <Select placeholder="选择练习的难度">
              <Option value="0">简单</Option>
              <Option value="1">中等</Option>
              <Option value="2">困难</Option>
            </Select>
          </Form.Item>

          <Form.Item label="代码">
            <div style={{ width: "50vw" }}>
              <MonacoEditor
                width="100%"
                height="600"
                theme="vs-dark"
                language="cpp"
                value={myInputCode}
                options={options}
                onChange={onChangeHandle}
                editorDidMount={editorDidMountHandle}
              />
            </div>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          name="time_related_controls"
          {...formItemLayout2}
          onFinish={onFinish2}
        >
          <Form.Item label="功能">
            <span className="ant-form-text">新增一个练习</span>
          </Form.Item>

          <Form.Item
            name="title"
            label="标题"
            hasFeedback
            rules={[
              {
                required: true,
                message: "请输入这次考试的标题",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            hasFeedback
            rules={[
              {
                required: true,
                message: "请输入这次考试的描述",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            name="invitationCode"
            label="邀请码"
            hasFeedback
            validateStatus={invitaStatus}
            help="请输入这次考试的邀请码（6位字母）"
            rules={[
              {
                required: true
              },
            ]}
          >
            <Input onBlur={invitatBlur} onKeyUp={(even)=>{even.target.value = even.target.value.replace(/[^\w]/g,'')}}></Input>
          </Form.Item>

          <Form.Item name="range-picker" label="时间范围" {...rangeConfig}>
            <RangePicker />
          </Form.Item>

          <Form.Item label="可重复次数">
            <Form.Item
              name="retryTime"
              noStyle
              rules={[
                {
                  required: true,
                  message: "请输入这次考试的可重复次数",
                },
              ]}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text"> 次</span>
          </Form.Item>

          <Form.Item
            name="select"
            label="选择对应的练习"
            hasFeedback
            rules={[{ required: true, message: "请选择对应的练习!" }]}
          >
            <Select placeholder="请选择对应的练习">
              {selectItem.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Addtype;
