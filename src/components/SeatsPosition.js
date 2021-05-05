import { List, Input } from "antd";
import usePosition from "../hooks/usePosition";
import "../styles/components/SeatsPosition.less";

const SeatsPosition = () => {
  const { positions } = usePosition();
  return (
    <div className="position-container">
      <h2>Selected positions</h2>
      <List
        itemLayout="horizontal"
        dataSource={positions}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={<a>{item.title}</a>} />
            <Input
              className="axis-input"
              type="text"
              placeholder={item.title}
              value={item.value}
              disabled
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default SeatsPosition;
