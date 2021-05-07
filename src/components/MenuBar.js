import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import { DotChartOutlined } from "@ant-design/icons";
import cursorIcon from "../images/cursor.svg";
import ellipsisIcon from "../images/ellipsis.svg";

import "../styles/components/MenuBar.less";

const MenuBar = () => {
  const { SubMenu } = Menu;
  const { pathname } = useLocation();

  return (
    <Menu
      theme="dark"
      mode="inline"
      triggerSubMenuAction="click"
      className="menubar-container"
    >
      {pathname === "/" && (
        <Menu.Item key="1">
          <img src={cursorIcon} />
        </Menu.Item>
      )}
      {pathname === "/seats/new" && (
        <SubMenu key="sub1" title={<img src={ellipsisIcon} />}>
          <Menu.Item key="2">
            <img src={ellipsisIcon} />
          </Menu.Item>
          <Menu.Item key="3">
            <DotChartOutlined />
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default MenuBar;
