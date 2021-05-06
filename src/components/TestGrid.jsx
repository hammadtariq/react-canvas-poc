import { useEffect, useRef, useState } from "react";
import { Layer, Rect } from "react-konva";
import GridCircle from "./GridCircle";

const generateMatrix = (xAxis = 30, yAxis = 30, width = 300, height = 600) => {
  const temp = [];
  for (let x = xAxis; x < width; x += 30) {
    for (let y = yAxis; y < height; y += 30) {
      temp.push(`0.9,0,0,0.9,${x},${y}`);
    }
  }
  return temp;
};

const TestGrid = () => {
  const gridRectRef = useRef(null);
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    if (gridRectRef.current) {
      const rect = gridRectRef.current;
      rect.visible(true);
      rect.width(300);
      rect.height(600);
      setCircles(generateMatrix());
    }
  }, []);

  return (
    <Layer>
      <Rect stroke="#000000" strokeWidth="1" ref={gridRectRef} setZIndex={5} />
      {circles.map((t) => (
        <GridCircle transformData={t} />
      ))}
    </Layer>
  );
};

export default TestGrid;
