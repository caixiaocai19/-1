import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Outlet, Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="test">练习</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<DesktopOutlined />} title="考试">
              <Menu.Item key="3">
                <Link to="test/0">简单</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="test/1">中等</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="test/2">困难</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<TeamOutlined />}>
              <Link to="rank">排行榜</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<FileOutlined />}>
              设置
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>打字练习</Breadcrumb.Item>
              <Breadcrumb.Item>考试</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Outlet></Outlet>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}