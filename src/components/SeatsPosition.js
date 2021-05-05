import { Fragment, useState } from "react";
import { List, Input } from "antd";

import "../styles/components/SeatsPosition.less";

const SeatsPosition = () => {
  const [data, setData] = useState([
    {
      title: "X-axis",
    },
    {
      title: "Y-axis",
    },
  ]);

  return (
    <div className="position-container">
      <h2>Selected positions</h2>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, i) => (
          <List.Item>
            <List.Item.Meta title={<a>{item.title}</a>} />
            <Input
              className="axis-input"
              type="text"
              placeholder={item.title}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default SeatsPosition;
