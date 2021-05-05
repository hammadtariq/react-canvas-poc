import React, { useState } from "react";
import { Menu } from "antd";
import { SelectOutlined } from "@ant-design/icons";

import "../styles/components/MenuBar.less";

const MenuBar = () => {
  return (
    <Menu theme="dark" mode="inline" className="menubar-container">
      <Menu.Item key="1" icon={<SelectOutlined />}>
        Select tool
      </Menu.Item>
    </Menu>
  );
};

export default MenuBar;
