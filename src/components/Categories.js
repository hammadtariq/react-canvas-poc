import { Fragment, useState } from "react";
import { List, Badge, Menu, Dropdown, Input } from "antd";
import { PlusCircleOutlined, CheckOutlined } from "@ant-design/icons";

import "../styles/components/Categories.less";

const Categories = () => {
  const data1 = ["Create new categories"];
  const [categoryIndex, setIndex] = useState();
  const [data, setData] = useState([
    {
      title: "Ant Design Title 1",
      color: "green",
      isEditable: false,
    },
    {
      title: "Ant Design Title 2",
      color: "lime",
      isEditable: false,
    },
    {
      title: "Ant Design Title 3",
      color: "cyan",
      isEditable: false,
    },
    {
      title: "Ant Design Title 4",
      color: "yellow",
      isEditable: false,
    },
  ]);

  const addCategroy = () => {
    setData([
      ...data,
      { title: "New category", color: "black", isEditable: true },
    ]);
  };

  const onhandlechange = (value, i, key) => {
    key === "color"
      ? setData([
          ...data.slice(0, i),
          { ...data[i], color: value },
          ...data.slice(i + 1),
        ])
      : setData([
          ...data.slice(0, i),
          { ...data[i], title: value },
          ...data.slice(i + 1),
        ]);
  };

  const onhandleBlur = (i) => {
    setData([
      ...data.slice(0, i),
      { ...data[i], isEditable: false },
      ...data.slice(i + 1),
    ]);
  };

  const onhandleEditDelete = ({ key }) => {
    if (key === "edit") {
      setData([
        ...data.slice(0, categoryIndex),
        { ...data[categoryIndex], isEditable: true },
        ...data.slice(categoryIndex + 1),
      ]);
    } else {
      setData([
        ...data.slice(0, categoryIndex),
        ...data.slice(categoryIndex + 1),
      ]);
    }
  };

  const menu = (
    <Menu onClick={onhandleEditDelete}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, i) => (
          <List.Item>
            {!item.isEditable && (
              <Fragment>
                <Badge color={item.color} count="00" />
                <List.Item.Meta title={<a>{item.title}</a>} />
                <Fragment>
                  <Dropdown
                    trigger="click"
                    overlay={menu}
                    placement="bottomLeft"
                  >
                    <a
                      className="ant-dropdown-link"
                      onClick={() => {
                        setIndex(i);
                      }}
                    >
                      ...
                    </a>
                  </Dropdown>
                </Fragment>
              </Fragment>
            )}
            {item.isEditable && (
              <Fragment>
                <Input
                  className="color-input"
                  type="color"
                  value={item.color}
                  onChange={(e) => {
                    onhandlechange(e.target.value, i, "color");
                  }}
                />
                <Input
                  type="text"
                  placeholder="New category"
                  value={item.title}
                  onChange={(e) => {
                    onhandlechange(e.target.value, i, "title");
                  }}
                  onBlur={(e) => {
                    onhandleBlur(i);
                  }}
                />
              </Fragment>
            )}
          </List.Item>
        )}
      />
      <List
        className="add-category"
        dataSource={data1}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a onClick={addCategroy}>
                  <PlusCircleOutlined />
                  {item}
                </a>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Categories;
