import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import "../styles/components/Actions.less";

const Actions = () => {
  return (
    <>
      <h2>Actions</h2>
      <div className="actions-list">
        <PlusSquareOutlined />
        <DeleteOutlined />
      </div>
    </>
  );
};

export default Actions;
