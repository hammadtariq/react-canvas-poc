/* eslint-disable no-param-reassign */
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import Konva from "konva";
import uniqId from "uniqid";

import { Context as CategoriesContext } from "../context/CategoriesContext";
import Section from "./Section";
import SeatPopup from "./SeatPopup";
import * as layout from "../utils/layout";
import useFetch from "../hooks/useFetch";
import usePosition from "../hooks/usePosition";

const MainStage = () => {
  const jsonData = useFetch("./seats-data.json");
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const trRef = useRef(null);
  const layerRef = useRef(null);
  const selectionRectangleRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [scaleToFit, setScaleToFit] = useState(1);
  const [size, setSize] = useState({
    width: 1000,
    height: 1000,
    virtualWidth: 1000,
  });
  const [virtualWidth, setVirtualWidth] = useState(1000);
  const [selectedSeatsIds, setSelectedSeatsIds] = useState([]);
  const [forceRerender, forceRerenderComponent] = useState(null);
  const [popup, setPopup] = useState({ seat: null });
  const { positions, setPositions } = usePosition();
  const { state } = useContext(CategoriesContext);
  const { activeCategory } = state;

  // calculate available space for drawing
  useEffect(() => {
    const newSize = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    };
    if (newSize.width !== size.width || newSize.height !== size.height) {
      setSize(newSize);
    }
  }, [size.width, size.height]);

  let prevPosition = {
    ...positions,
  };
  const constructPositionObject = (newPosition) => {
    if (
      (prevPosition.x === newPosition.x && prevPosition.y === newPosition.y) ||
      (newPosition.x < 0 && newPosition.y < 0)
    ) {
      newPosition.x = 0;
      newPosition.y = 0;
      newPosition.width = 0;
      newPosition.height = 0;
    } else {
      prevPosition = newPosition;
    }
    return {
      x: Number.isNaN(newPosition.x) ? 0 : newPosition.x,
      y: Number.isNaN(newPosition.y) ? 0 : newPosition.y,
      width: Number.isNaN(newPosition.width) ? 0 : newPosition.width,
      height: Number.isNaN(newPosition.height) ? 0 : newPosition.height,
    };
  };

  const attachSelectSeatsEvents = () => {
    if (
      !stageRef.current ||
      !layerRef.current ||
      !selectionRectangleRef.current
    )
      return;

    let x1;
    let y1;
    let x2;
    let y2;
    const stage = stageRef.current;
    const selectionRectangle = selectionRectangleRef.current;
    const layer = layerRef.current;

    stage.on("mousedown touchstart", (e) => {
      // do nothing if we mousedown on any shape
      // console.log("target", e.target, stageRef.current);
      if (e.target !== stageRef.current) return;

      x1 = stage.getPointerPosition().x;
      y1 = stage.getPointerPosition().y;
      x2 = stage.getPointerPosition().x;
      y2 = stage.getPointerPosition().y;

      selectionRectangle.visible(true);
      selectionRectangle.width(0);
      selectionRectangle.height(0);
      layer.draw();
    });

    stage.on("mousemove touchmove", () => {
      // no nothing if we didn't start selection
      if (!selectionRectangle.visible()) return;

      x2 = stage.getPointerPosition().x;
      y2 = stage.getPointerPosition().y;
      selectionRectangle.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      });
      layer.batchDraw();
    });

    stage.on("mouseup touchend", () => {
      // no nothing if we didn't start selection
      if (!selectionRectangle.visible()) return;

      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        selectionRectangle.visible(false);
        layer.batchDraw();
      });

      const shapes = stage.find(".rect").toArray();
      const box = selectionRectangle.getClientRect();
      const selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      trRef.current.nodes(selected);
      setPositions(constructPositionObject(trRef.current.getClientRect()));
      layer.batchDraw();
    });
  };

  useEffect(() => {
    // re-run this effect on the change of categories selection,
    // and change the color for selected seats that are in the state
    const newNodes = [];
    if (trRef.current) {
      trRef.current.nodes().forEach((node) => {
        node.setAttrs({
          fill: activeCategory.color,
        });
      });
      trRef.current.nodes(newNodes);
      forceRerenderComponent(uniqId());
    }
  }, [activeCategory]);

  useEffect(() => {
    attachSelectSeatsEvents();
    const stage = stageRef.current;
    // eslint-disable-next-line consistent-return
    return () => {
      if (stage) {
        stage.off("mousedown touchstart mousemove touchmove mouseup touchend");
      }
    };
  }, [jsonData, size]);

  // toggle scale on double clicks or taps
  const toggleScale = useCallback(() => {
    if (scale === 1) {
      setScale(scaleToFit);
    } else {
      setScale(1);
    }
  }, [scale, scaleToFit]);

  let lastSectionPosition = 0;

  const handleHover = useCallback((seat, pos) => {
    setPopup({
      seat,
      position: pos,
    });
  }, []);

  const handleSelect = useCallback(
    (seatId) => {
      const newIds = selectedSeatsIds.concat([seatId]);
      setSelectedSeatsIds(newIds);
    },
    [selectedSeatsIds]
  );

  const handleDeselect = useCallback(
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
          forceRerender={forceRerender}
        />
      );
    });
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        padding: "15px 0 0 15px",
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
        <Layer ref={layerRef}>
          {renderSections()}
          <Rect
            fill="rgba(255,0,0,0.5)"
            ref={selectionRectangleRef}
            setZIndex={5}
          />
          <Transformer ref={trRef} />
        </Layer>
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
