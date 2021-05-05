import React from "react";
import { Rect, Group, Text } from "react-konva";
import PropTypes from "prop-types";
import SubSection from "./SubSection";

import {
  SECTION_TOP_PADDING,
  getSectionWidth,
  getSubsectionWidth,
} from "./Layout";

const Section = React.memo(
  ({
    section,
    height,
    x,
    y,
    onHoverSeat,
    onSelectSeat,
    onDeselectSeat,
    selectedSeatsIds,
  }) => {
    const containerRef = React.useRef();

    // caching will boost rendering
    // we just need to recache on some changes
    React.useEffect(() => {
      containerRef.current.cache();
      containerRef.current.getLayer().batchDraw();
    }, [section, selectedSeatsIds]);

    const width = getSectionWidth(section);
    let lastSubsectionX = 0;
    return (
      <Group y={y} x={x} ref={containerRef}>
        <Rect
          width={width}
          height={height}
          fill="white"
          strokeWidth={1}
          stroke="lightgrey"
          cornerRadius={5}
        />
        {section.subsections.map((subsection, index) => {
          const subWidth = getSubsectionWidth(subsection);
          const pos = lastSubsectionX;
          lastSubsectionX += subWidth;

          return (
            <SubSection
              x={pos}
              y={SECTION_TOP_PADDING}
              key={index}
              data={subsection}
              width={subWidth}
              height={height}
              onHoverSeat={onHoverSeat}
              onSelectSeat={onSelectSeat}
              onDeselectSeat={onDeselectSeat}
              selectedSeatsIds={selectedSeatsIds}
            />
          );
        })}
        <Text
          text={section.name}
          height={SECTION_TOP_PADDING}
          width={width}
          align="center"
          verticalAlign="middle"
          fontSize={20}
        />
      </Group>
    );
  }
);

// Section.propTypes = {
//   section: PropTypes.number,
//   height: PropTypes.number,
//   x: PropTypes.number,
//   y: PropTypes.number,
//   onHoverSeat: PropTypes.func,
//   onSelectSeat: PropTypes.func,
//   onDeselectSeat: PropTypes.func,
//   selectedSeatsIds: PropTypes.array,
//   data: PropTypes.shape({
//     seats_by_rows: PropTypes.arrayOf(PropTypes.string),
//     name: PropTypes.string,
//   }),
// };

export default Section;
