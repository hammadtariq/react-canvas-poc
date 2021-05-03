/* eslint-disable react/no-array-index-key */
import React from "react";
import { Group, Text } from "react-konva";
import PropTypes from "prop-types";

import Seat from "./Seat";

import { SEATS_DISTANCE, SUBSECTION_PADDING, SEAT_SIZE } from "./layout";

const SubSection = ({
  width,
  x,
  y,
  data,
  onHoverSeat,
  onSelectSeat,
  onDeselectSeat,
  selectedSeatsIds,
}) => {
  return (
    <Group x={x} y={y}>
      {Object.keys(data.seats_by_rows).map((rowKey, rowIndex) => {
        const row = data.seats_by_rows[rowKey];
        return (
          <React.Fragment key={rowKey}>
            {row.map((seat, seatIndex) => {
              return (
                <Seat
                  key={seat.name}
                  x={seatIndex * SEATS_DISTANCE + SUBSECTION_PADDING}
                  y={rowIndex * SEATS_DISTANCE + SUBSECTION_PADDING}
                  data={seat}
                  onHover={onHoverSeat}
                  onSelect={onSelectSeat}
                  onDeselect={onDeselectSeat}
                  isSelected={selectedSeatsIds.indexOf(seat.name) >= 0}
                />
              );
            })}
            <Text
              text={rowKey}
              x={SUBSECTION_PADDING - SEATS_DISTANCE}
              y={rowIndex * SEATS_DISTANCE + SUBSECTION_PADDING - SEAT_SIZE / 2}
              fontSize={SEAT_SIZE}
              key={`label-left${rowKey}`}
            />
          </React.Fragment>
        );
      })}
      {data.seats_by_rows[1].map((_, seatIndex) => {
        return (
          <Text
            text={(seatIndex + 1).toString()}
            x={seatIndex * SEATS_DISTANCE + SUBSECTION_PADDING - 50}
            width={100}
            y={
              Object.keys(data.seats_by_rows).length * SEATS_DISTANCE +
              SUBSECTION_PADDING
            }
            key={`label-bottom${seatIndex}`}
            align="center"
          />
        );
      })}
      <Text text={data.name} width={width} align="center" y={-10} />
    </Group>
  );
};

SubSection.defaultProps = {
  onHoverSeat: () => {},
  onSelectSeat: () => {},
  onDeselectSeat: () => {},
  selectedSeatsIds: () => {},
  data: {
    seats_by_rows: [],
    name: "",
  },
  width: "",
  x: "",
  y: "",
};

SubSection.propTypes = {
  width: PropTypes.string,
  x: PropTypes.string,
  y: PropTypes.string,
  onHoverSeat: PropTypes.func,
  onSelectSeat: PropTypes.func,
  onDeselectSeat: PropTypes.func,
  selectedSeatsIds: PropTypes.func,
  data: PropTypes.shape({
    seats_by_rows: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
  }),
};

export default SubSection;
