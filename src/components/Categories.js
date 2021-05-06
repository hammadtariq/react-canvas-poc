import uniqId from "uniqid";
import { Fragment, useContext, useState } from "react";
import { List, Badge, Menu, Dropdown, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Context as CategoriesContext } from "../context/CategoriesContext";

import "../styles/components/Categories.less";

const Categories = () => {
  const [activeCategoryId, setActiveCategoryId] = useState();
  const { state, addCategory, setCategory, updateCategories } = useContext(
    CategoriesContext
  );
  const { categories } = state;

  const handleAddCategory = () => {
    const newCategory = {
      id: uniqId(),
      title: "",
      color: "black",
      isEditable: true,
    };
    addCategory(newCategory);
  };

  const handleChange = (value, id, key) => {
    if (["title", "color"].includes(key)) {
      const updatedCategories = categories.map((c) =>
        c.id === id ? { ...c, [key]: value } : c
      );
      updateCategories(updatedCategories);
    }
  };

  const handleBlur = (categoryId) => {
    updateCategories(
      categories.map((c) =>
        c.id === categoryId ? { ...c, isEditable: false } : c
      )
    );
  };

  const handleEditDelete = ({ key }) => {
    if (key === "edit") {
      updateCategories(
        categories.map((c) =>
          c.id === activeCategoryId ? { ...c, isEditable: true } : c
        )
      );
    } else {
      updateCategories(categories.filter((c) => c.id !== activeCategoryId));
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
        dataSource={categories}
        renderItem={(category, i) => (
          <List.Item>
            {!category.isEditable && (
              <>
                <Badge color={category.color} count="00" />
                <List.Item.Meta title={<a>{category.title}</a>} />
                <Dropdown trigger="click" overlay={menu} placement="bottomLeft">
                  <a
                    className="ant-dropdown-link"
                    onClick={() => {
                      setActiveCategoryId(category.id);
                    }}
                  >
                    ...
                  </a>
                </Dropdown>
              </>
            )}
            {category.isEditable && (
              <>
                <Input
                  className="color-input"
                  type="color"
                  value={category.color}
                  onChange={(e) => {
                    handleChange(e.target.value, category.id, "color");
                  }}
                />
                <Input
                  type="text"
                  placeholder="New category"
                  value={category.title}
                  onChange={(e) => {
                    handleChange(e.target.value, category.id, "title");
                  }}
                  onBlur={() => {
                    handleBlur(category.id);
                  }}
                />
              </>
            )}
          </List.Item>
        )}
      />
      <List
        className="add-category"
        dataSource={["Create a new category"]}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a onClick={handleAddCategory}>
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
