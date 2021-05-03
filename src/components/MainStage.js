/* eslint-disable no-param-reassign */
import React from "react";
import { Stage, Layer } from "react-konva";
import Section from "./Section";
import SeatPopup from "./SeatPopup";

import * as layout from "./layout";

const useFetch = (url) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [url]);
  return data;
};

const MainStage = (props) => {
  const jsonData = useFetch("./seats-data.json");
  const containerRef = React.useRef(null);
  const stageRef = React.useRef(null);

  const [scale, setScale] = React.useState(1);
  const [scaleToFit, setScaleToFit] = React.useState(1);
  const [size, setSize] = React.useState({
    width: 1000,
    height: 1000,
    virtualWidth: 1000,
  });
  const [virtualWidth, setVirtualWidth] = React.useState(1000);

  const [selectedSeatsIds, setSelectedSeatsIds] = React.useState([]);

  const [popup, setPopup] = React.useState({ seat: null });

  // calculate available space for drawing
  React.useEffect(() => {
    const newSize = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    };
    if (newSize.width !== size.width || newSize.height !== size.height) {
      setSize(newSize);
    }
  }, [size.width, size.height]);

  // calculate initial scale
  React.useEffect(() => {
    if (!stageRef.current) {
      return;
    }
    const stage = stageRef.current;
    const clientRect = stage.getClientRect({ skipTransform: true });

    const scaleFit = size.width / clientRect.width;
    setScale(scaleFit);
    setScaleToFit(scaleFit);
    setVirtualWidth(clientRect.width);
  }, [jsonData, size]);

  // togle scale on double clicks or taps
  const toggleScale = React.useCallback(() => {
    if (scale === 1) {
      setScale(scaleToFit);
    } else {
      setScale(1);
    }
  }, [scale, scaleToFit]);

  let lastSectionPosition = 0;

  const handleHover = React.useCallback((seat, pos) => {
    setPopup({
      seat,
      position: pos,
    });
  }, []);

  const handleSelect = React.useCallback(
    (seatId) => {
      const newIds = selectedSeatsIds.concat([seatId]);
      setSelectedSeatsIds(newIds);
    },
    [selectedSeatsIds]
  );

  const handleDeselect = React.useCallback(
    (seatId) => {
      const ids = selectedSeatsIds.slice();
      ids.splice(ids.indexOf(seatId), 1);
      setSelectedSeatsIds(ids);
    },
    [selectedSeatsIds]
  );

  const handleDragBound = (pos) => {
    pos.x = Math.min(
      size.width / 2,
      Math.max(pos.x, -virtualWidth * scale + size.width / 2)
    );
    pos.y = Math.min(size.height / 2, Math.max(pos.y, -size.height / 2));
    return pos;
  };

  if (jsonData === null) {
    return (
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  const maxSectionWidth = layout.getMaximimSectionWidth(
    jsonData.seats.sections
  );

  const renderSections = () => {
    return jsonData.seats.sections.map((section) => {
      const height = layout.getSectionHeight(section);
      const position = lastSectionPosition + layout.SECTIONS_MARGIN;
      lastSectionPosition = position + height;
      const width = layout.getSectionWidth(section);
      const offset = (maxSectionWidth - width) / 2;

      return (
        <Section
          x={offset}
          y={position}
          height={height}
          key={section.name}
          section={section}
          selectedSeatsIds={selectedSeatsIds}
          onHoverSeat={handleHover}
          onSelectSeat={handleSelect}
          onDeselectSeat={handleDeselect}
        />
      );
    });
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
      }}
      ref={containerRef}
    >
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        draggable={false}
        dragBoundFunc={handleDragBound}
        onDblTap={toggleScale}
        onDblClick={toggleScale}
        scaleX={scale}
        scaleY={scale}
      >
        <Layer>{renderSections()}</Layer>
      </Stage>
      {/* draw popup as html */}
      {popup.seat && (
        <SeatPopup
          position={popup.position}
          seatId={popup.seat}
          onClose={() => {
            setPopup({ seat: null });
          }}
        />
      )}
    </div>
  );
};

export default MainStage;
