/* eslint-disable no-param-reassign */
import { useRef, useState, useEffect, useContext } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import Konva from "konva";

import { Context as ToolbarContext } from "../context/ToolbarContext";
import usePosition from "../hooks/usePosition";
import { TOOLS } from "../utils/constants";
import GridCircle from "./GridCircle";

const generateMatrix = (xAxis = 30, yAxis = 30, width = 300, height = 600) => {
  const temp = [];
  for (let x = xAxis; x < width; x += 15) {
    for (let y = yAxis; y < height; y += 15) {
      // temp.push(`0.9,0,0,0.9,${x},${y}`);
      temp.push({ x, y });
    }
  }
  return temp;
};

const CreateSeatsTool = () => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const selectionRectangleRef = useRef(null);

  const transformerRef = useRef(null);
  const [circles, setCircles] = useState([]);
  const { state: toolbarState } = useContext(ToolbarContext);
  const { positions, setPositions } = usePosition();

  const [existingCircles, setExistingCircles] = useState([]);
  const { activeTool } = toolbarState;

  useEffect(() => {
    setExistingCircles([...existingCircles, ...circles]);
    console.log("Circles::::", circles);
  }, [circles]);

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
    ) {
      return;
    }

    let x1;
    let y1;
    let x2;
    let y2;
    const stage = stageRef.current;
    const selectionRectangle = selectionRectangleRef.current;
    const layer = layerRef.current;
    let touchStarted = false;

    stage.on("mousedown touchstart", (e) => {
      // do nothing if we mousedown on any shape
      if (e.target !== stageRef.current) return;

      touchStarted = true;

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
      const x = Math.min(x1, x2);
      const y = Math.min(y1, y2);
      const width = Math.abs(x2 - x1);
      const height = Math.abs(y2 - y1);

      selectionRectangle.setAttrs({
        x,
        y,
        width,
        height,
      });
      setCircles(generateMatrix(x, y, width, height));
      layer.batchDraw();
    });

    stage.on("mouseup touchend", () => {
      // no nothing if we didn't start selection
      if (!selectionRectangle.visible()) return;

      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        selectionRectangle.visible(false);
        layer.batchDraw();
        setCircles([]);
      });

      // const shapes = stage.find(".rect").toArray();
      // const box = selectionRectangle.getClientRect();
      // const selected = shapes.filter((shape) =>
      //   Konva.Util.haveIntersection(box, shape.getClientRect())
      // );
      // transformerRef.current.nodes(selected);
      // setPositions(
      //   constructPositionObject(transformerRef.current.getClientRect())
      // );
      // layer.batchDraw();
    });
  };

  useEffect(() => {
    attachSelectSeatsEvents();
    const stage = stageRef.current;
    // eslint-disable-next-line consistent-return
    return () => {
      if (stage) {
        stage.off("mousedown touchstart mousemove touchmove mouseup touchend");
      }
    };
  }, [activeTool]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        padding: "15px 0 0 15px",
      }}
      ref={containerRef}
    >
      <Stage ref={stageRef} width={2000} height={1000}>
        <Layer ref={layerRef}>
          {circles.map((circle) => (
            <GridCircle key={circle} transformData={circle} />
          ))}
          {existingCircles.map((circle) => (
            <GridCircle transformData={circle} />
          ))}
          <Rect
            fill="rgba(173, 198, 255, 0.5)"
            ref={selectionRectangleRef}
            setZIndex={5}
          />
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
};

export default CreateSeatsTool;
