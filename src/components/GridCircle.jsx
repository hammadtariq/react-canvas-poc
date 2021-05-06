import { Circle } from "react-konva";

function decompose(me) {
  const { a, b, c, d } = me;
  const { acos, atan, sqrt } = Math;

  const pi = Math.PI;
  const translate = { x: me.e, y: me.f };
  let rotation = 0;
  let scale = { x: 1, y: 1 };
  const skew = { x: 0, y: 0 };
  const determ = a * d - b * c; // determinant(), skip DRY here...

  if (a || b) {
    const r = sqrt(a * a + b * b);
    rotation = b > 0 ? acos(a / r) : -acos(a / r);
    scale = { x: r, y: determ / r };
    skew.x = atan((a * c + b * d) / (r * r));
  } else if (c || d) {
    const s = sqrt(c * c + d * d);
    rotation = pi * 0.5 - (d > 0 ? acos(-c / s) : -acos(c / s));
    scale = { x: determ / s, y: s };
    skew.y = atan((a * c + b * d) / (s * s));
  } else {
    // a = b = c = d = 0
    scale = { x: 0, y: 0 }; // = invalid matrix
  }

  return {
    scale,
    position: translate,
    rotation,
    skew,
  };
}

function parseTransform(string) {
  const parts = string.split(",");
  return {
    a: parseFloat(parts[0]),
    b: parseFloat(parts[1]),
    c: parseFloat(parts[2]),
    d: parseFloat(parts[3]),
    e: parseFloat(parts[4]),
    f: parseFloat(parts[5]),
  };
}

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
      fill="red"
      strokeWidth={1}
      stroke="#000000"
    />
  );
};

export default GridCircle;
