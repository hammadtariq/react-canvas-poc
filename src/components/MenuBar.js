import { Menu } from "antd";
import { DotChartOutlined } from "@ant-design/icons";
import cursorIcon from "../images/cursor.svg";
import ellipsisIcon from "../images/ellipsis.svg";

import "../styles/components/MenuBar.less";

const MenuBar = () => {
  const { SubMenu } = Menu;

  return (
    <Menu
      theme="dark"
      mode="inline"
      triggerSubMenuAction="click"
      className="menubar-container"
    >
      <Menu.Item key="1">
        <img src={cursorIcon} />
      </Menu.Item>
      <SubMenu key="sub1" title={<img src={ellipsisIcon} />}>
        <Menu.Item key="2">
          <img src={ellipsisIcon} />
        </Menu.Item>
        <Menu.Item key="3">
          <DotChartOutlined />
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default MenuBar;
