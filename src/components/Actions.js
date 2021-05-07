import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "../styles/components/Actions.less";

const Actions = () => {
  const history = useHistory();

  const handleAddNewClick = () => {
    history.push("/seats/new");
  };

  return (
    <>
      <h2>Actions</h2>
      <div className="actions-list">
        <PlusSquareOutlined onClick={handleAddNewClick} />
        <DeleteOutlined />
      </div>
    </>
  );
};

export default Actions;
