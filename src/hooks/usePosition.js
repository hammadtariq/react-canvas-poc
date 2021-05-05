import { useEffect, useContext, useState } from "react";
import { Context as PositionContext } from "../context/PositionContext";

const usePosition = () => {
  const [positions, setStatePositions] = useState([]);
  const { state, setPositions } = useContext(PositionContext);

  useEffect(() => {
    setStatePositions([
      {
        title: "X-axis",
        value: state.x,
      },
      {
        title: "Y-axis",
        value: state.y,
      },
      {
        title: "Width",
        value: state.width,
      },
      {
        title: "Height",
        value: state.height,
      },
    ]);
  }, [state]);

  return { positions, setPositions };
};

export default usePosition;
