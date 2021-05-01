import React, { useState } from "react";
import { Layout, Menu } from 'antd';
import MainStage from "./components/MainStage";
import MenuBar from "./components/MenuBar";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import "./styles/App.less";
import RightDrawer from "./components/RightDrawer";
import { isWhiteSpaceLike } from "typescript";

const { Header, Sider, Content } = Layout;

function App() {

  const [collapsed, setCollapsed] = useState();

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout>

      {/* Side bar code start */}
      <Sider trigger={null} collapsible collapsed={!collapsed}>
          <MenuBar />
      </Sider>
      {/* Side bar code end */}

      {/* Header and content code start */}
      <Layout className="site-layout">
         <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
        <Content
            style={{
              margin: 15,
              overflow: "hidden"
            }}>
          <MainStage
                onSelectSeat={(seatId) => {
                  console.log("selected - " + seatId);
                }}
              />
        </Content>
      </Layout>
      {/* Header and content code end */}
      <Sider className="right-sider">
        {/* <RightDrawer /> */}
      </Sider>
    </Layout>
   
  );
}

export default App;
