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

  const addCategory = () => {
    setData([
      ...data,
      { title: "New category", color: "black", isEditable: true },
    ]);
  };

  const handleChange = (value, i, key) => {
    if (["title", "color"].includes(key)) {
      const updatedData = data.map((item, index) =>
        index === i
          ? {
              ...item,
              [key]: value,
            }
          : item
      );
      setData(updatedData);
    }
  };

  const handleBlur = (i) => {
    setData(
      data.map((item, index) =>
        index === i ? { ...item, isEditable: false } : item
      )
    );
  };

  const handleEditDelete = ({ key }) => {
    if (key === "edit") {
      setData(
        data.map((item, index) =>
          index === categoryIndex ? { ...item, isEditable: true } : item
        )
      );
    } else {
      setData(data.filter((_, index) => index !== categoryIndex));
    }
  };

  const menu = (
    <Menu onClick={handleEditDelete}>
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
              <>
                <Badge color={item.color} count="00" />
                <List.Item.Meta title={<a>{item.title}</a>} />
                <Dropdown trigger="click" overlay={menu} placement="bottomLeft">
                  <a
                    className="ant-dropdown-link"
                    onClick={() => {
                      setIndex(i);
                    }}
                  >
                    ...
                  </a>
                </Dropdown>
              </>
            )}
            {item.isEditable && (
              <>
                <Input
                  className="color-input"
                  type="color"
                  value={item.color}
                  onChange={(e) => {
                    handleChange(e.target.value, i, "color");
                  }}
                />
                <Input
                  type="text"
                  placeholder="New category"
                  value={item.title}
                  onChange={(e) => {
                    handleChange(e.target.value, i, "title");
                  }}
                  onBlur={(e) => {
                    handleBlur(i);
                  }}
                />
              </>
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
                <a onClick={addCategory}>
                  <PlusCircleOutlined />
                  {item}
                </a>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Categories;
