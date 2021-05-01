import React, { useState } from "react";
import { Menu, Button } from 'antd';
import {
  SelectOutlined
} from '@ant-design/icons';

const MenuBar = () => {
  return ( 
    <Menu
          theme="dark"
          mode="inline"
          style={{
              marginTop: '60px',
          }}>
          <Menu.Item key="1" icon={<SelectOutlined />}>
              Select tool
          </Menu.Item>
        </Menu>
   );
}
 
export default MenuBar;