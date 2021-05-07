import { useContext } from "react";
import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import { DotChartOutlined } from "@ant-design/icons";
import cursorIcon from "../images/cursor.svg";
import ellipsisIcon from "../images/ellipsis.svg";

import { Context as ToolbarContext } from "../context/ToolbarContext";
import { TOOLS } from "../utils/constants";

import "../styles/components/MenuBar.less";

const ToolBar = () => {
  const { SubMenu } = Menu;
  const { pathname } = useLocation();
  const { state: toolbarState, setTool } = useContext(ToolbarContext);
  const { activeTool } = toolbarState;

  const handleChangeTool = (toolName) => () => {
    if (activeTool === toolName) {
      setTool("");
    } else {
      setTool(toolName);
    }
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      triggerSubMenuAction="click"
      className="menubar-container"
    >
      <Menu.Item
        key="1"
        active={activeTool === TOOLS.SELECTION}
        onClick={handleChangeTool(TOOLS.SELECTION)}
      >
        <img src={cursorIcon} />
      </Menu.Item>
      {pathname === "/seats/new" && (
        <SubMenu
          key="sub1"
          title={<img src={ellipsisIcon} />}
          onClick={handleChangeTool(TOOLS.CREAT)}
        >
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

export default ToolBar;
