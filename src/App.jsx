import React, { useState } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import MainStage from "./components/MainStage";
import MenuBar from "./components/MenuBar";
import Categories from "./components/Categories";
import SeatsPosition from "./components/SeatsPosition";

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
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggle} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggle} />
          )}
        </Header>
        <Content
          style={{
            margin: 15,
            overflow: "hidden",
          }}
        >
          <MainStage
            onSelectSeat={(seatId) => {
              console.log(`selected - ${seatId}`);
            }}
          />
        </Content>
      </Layout>
      {/* Header and content code end */}

      <Sider className="right-sider">
        <SeatsPosition />
        <Categories />
      </Sider>
    </Layout>
  );
}

export default App;
