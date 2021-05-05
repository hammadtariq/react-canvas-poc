import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import MainStage from "./components/MainStage";
import MenuBar from "./components/MenuBar";
import Categories from "./components/Categories";
import SeatsPosition from "./components/SeatsPosition";
import Actions from "./components/Actions";

import "./styles/App.less";

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      {/* Side bar code start */}
      <Sider
        className="left-sidebar"
        trigger={null}
        collapsible
        collapsed={!collapsed}
      >
        <MenuBar />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              {collapsed ? (
                <MenuUnfoldOutlined className="trigger" onClick={toggle} />
              ) : (
                <MenuFoldOutlined className="trigger" onClick={toggle} />
              )}
              <h2>Tickets.com</h2>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            overflow: "hidden",
          }}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={20}>
              <MainStage
                onSelectSeat={(seatId) => {
                  // console.log(`selected - ${seatId}`);
                }}
              />
            </Col>
            <Col className="gutter-row right" span={4}>
              <div className="right-sider">
                <Actions />
                <SeatsPosition />
                <Categories />
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
      {/* Header and content code end */}

      {/* <Sider className="right-sider">
        <SeatsPosition />
        <Categories />
      </Sider> */}
    </Layout>
  );
}

export default App;
