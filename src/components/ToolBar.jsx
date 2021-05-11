import { useContext } from "react";
import { Menu } from "antd";
import { useLocation } from "react-router-dom";
import cursorIcon from "../images/cursor.svg";
import ellipsisIcon from "../images/ellipsis.svg";

import { Context as ToolbarContext } from "../context/ToolbarContext";
import { TOOLS } from "../utils/constants";

const ToolBar = () => {
  const { pathname } = useLocation();
  const { setTool } = useContext(ToolbarContext);

  const handleChangeTool = (toolName) => () => {
    setTool(toolName);
  };

  return (
    <Menu
      theme="dark"
      triggerSubMenuAction="click"
      className="menubar-container"
    >
      <Menu.Item key="1" onClick={handleChangeTool(TOOLS.SELECTION)}>
        <img src={cursorIcon} />
      </Menu.Item>
      {pathname === "/seats/new" && (
        // <SubMenu
        //   key="sub-menu-1"
        //   // title={}
        //   icon={<img src={ellipsisIcon} />}
        //   onClick={handleChangeTool(TOOLS.CREAT)}
        // >
        <>
          <Menu.Item key="2" onClick={handleChangeTool(TOOLS.CREAT_LINEAR)}>
            <img src={ellipsisIcon} />
          </Menu.Item>
          <Menu.Item key="3" onClick={handleChangeTool(TOOLS.CREAT)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img src={ellipsisIcon} />
              <img src={ellipsisIcon} style={{ marginTop: "-5px" }} />
              <img src={ellipsisIcon} style={{ marginTop: "-5px" }} />
            </div>
          </Menu.Item>
        </>
        // </SubMenu>
      )}
    </Menu>
  );
};

export default ToolBar;
