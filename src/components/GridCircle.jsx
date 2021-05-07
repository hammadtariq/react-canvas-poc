import { Circle } from "react-konva";
import { decompose, parseTransform } from "../utils/transform";

const GridCircle = ({ transformData }) => {
  // <circle r="8" fill="transparent" stroke="#000000" stroke-width="1" transform="matrix(0.9,0,0,0.9,20,20)"></circle>
  const transform = transformData;
  const matrix = parseTransform(transform);
  const attrs = decompose(matrix);

  return (
    <Circle
      width="20"
      height="20"
      x={attrs.position.x}
      y={attrs.position.y}
      scaleX={attrs.scale.x}
      scaleY={attrs.scale.y}
      skewX={attrs.skew.x}
      skewY={attrs.skew.y}
      rotation={(attrs.rotation / Math.PI) * 180}
      fill="transparent"
      strokeWidth={1}
      stroke="#000000"
    />
  );
};

export default GridCircle;
