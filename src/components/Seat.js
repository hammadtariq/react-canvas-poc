import React from "react";
import { Circle } from "react-konva";
import { SEAT_SIZE } from "./layout";

function getColor(isBooked, isSelected) {
  if (isSelected) {
    return "red";
  }
  if (isBooked) {
    return "lightgrey";
  }
  return "#1b728d";
}

const Seat = (props) => {
  const {
    data,
    x,
    y,
    onHover,
    isSelected,
    status,
    onDeselect,
    onSelect,
  } = props;
  const isBooked = data.status === "booked";

  return (
    <Circle
      x={x}
      y={y}
      radius={SEAT_SIZE / 2}
      fill={getColor(isBooked, isSelected)}
      strokeWidth={1}
      className="rect"
      name="rect"
      onMouseEnter={(e) => {
        e.target._clearCache();
        onHover(data.name, e.target.getAbsolutePosition());
        const container = e.target.getStage().container();
        if (isBooked) {
          container.style.cursor = "not-allowed";
        } else {
          container.style.cursor = "pointer";
        }
      }}
      onMouseLeave={(e) => {
        onHover(null);
        const container = e.target.getStage().container();
        container.style.cursor = "";
      }}
      onClick={(e) => {
        if (isBooked) {
          return;
        }
        if (isSelected) {
          onDeselect(data.name);
        } else {
          onSelect(data.name);
        }
      }}
      onTap={(e) => {
        if (isBooked) {
          return;
        }
        if (isSelected) {
          onDeselect(data.name);
        } else {
          onSelect(data.name);
        }
      }}
    />
  );
};

export default Seat;
