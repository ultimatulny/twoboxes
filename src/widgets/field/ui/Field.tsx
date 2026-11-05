import styles from "./Field.module.css";
import {
  BASE_BOX_HEIGHT,
  BASE_BOX_WIDTH,
  FIELD_HEIGHT_PX,
  FIELD_WIDTH_PX,
  type Box,
  type movingBox,
} from "../model";
import { useCallback, useRef, useState } from "react";

export const Field = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    {
      id: 1,
      width: BASE_BOX_WIDTH,
      height: BASE_BOX_HEIGHT,
      x: 100,
      y: 100,
      color: "red",
    },
    {
      id: 2,
      width: BASE_BOX_WIDTH,
      height: BASE_BOX_HEIGHT,
      x: 500,
      y: 100,
      color: "green",
    },
  ]);

  const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null);

  const fieldRef = useRef<HTMLDivElement>(null);
  const movingRef = useRef<movingBox | null>(null);

  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    if (!movingRef.current || !fieldRef.current) return;

    const fieldRect = fieldRef.current.getBoundingClientRect();

    const tryX = event.clientX - fieldRect.left - movingRef.current.localX;
    const tryY = event.clientY - fieldRect.top - movingRef.current.localY;

    const x =
      tryX < 0
        ? 0
        : tryX > FIELD_WIDTH_PX - BASE_BOX_WIDTH
          ? FIELD_WIDTH_PX - BASE_BOX_WIDTH
          : tryX;
    const y =
      tryY < 0
        ? 0
        : tryY > FIELD_HEIGHT_PX - BASE_BOX_HEIGHT
          ? FIELD_HEIGHT_PX - BASE_BOX_HEIGHT
          : tryY;

    setBoxes((prev) =>
      prev.map((box) =>
        box.id === movingRef.current?.boxId ? { ...box, x, y } : box,
      ),
    );
  }, []);

  const handleMouseUp = useCallback(() => {
    movingRef.current = null;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    boxId: number,
  ) => {
    setSelectedBoxId(boxId);

    const selectedBox = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - selectedBox.left;
    const localY = event.clientY - selectedBox.top;

    movingRef.current = {
      boxId,
      localX,
      localY,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={styles.field}
      style={{
        width: FIELD_WIDTH_PX,
        height: FIELD_HEIGHT_PX,
      }}
      ref={fieldRef}
    >
      {boxes.map((box) => (
        <div
          key={box.id}
          className={styles.box}
          style={{
            width: box.width,
            height: box.height,
            left: box.x,
            top: box.y,
            backgroundColor: box.color,
            border: selectedBoxId === box.id ? "2px dotted yellow" : undefined,
          }}
          onMouseDown={(event) => handleMouseDown(event, box.id)}
        />
      ))}
    </div>
  );
};
