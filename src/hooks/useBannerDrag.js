import { useState, useEffect, useCallback } from "react";
import { clamp } from "../utils/helpers";
import { INITIAL_BG_POSITIONS, DRAG_THRESHOLD } from "../constants";

/**
 * useBannerDrag
 *
 * Manages dragging the background image to reposition it.
 * A mouse movement smaller than DRAG_THRESHOLD pixels is treated as a click
 * and triggers `onClickThrough()` instead.
 *
 * @param {string}   currentSize    - active size key (e.g. "size-3000x340")
 * @param {Function} onClickThrough - called when the user "clicks" (no real drag)
 * @returns {{ bgPos, handleMouseDown, resetPos }}
 */
export function useBannerDrag(currentSize, onClickThrough) {
  const [bgPositions, setBgPositions] = useState(INITIAL_BG_POSITIONS);
  const [isDragging,  setIsDragging]  = useState(false);
  const [dragStart,   setDragStart]   = useState({ x: 0, y: 0 });
  const [mouseDown,   setMouseDown]   = useState({ x: 0, y: 0 });

  // Current position for whichever size is active
  const bgPos = bgPositions[currentSize];

  /** Called on mousedown inside the bg container */
  const handleMouseDown = useCallback((e) => {
    if (e.target !== e.currentTarget) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setMouseDown({ x: e.clientX, y: e.clientY });
  }, []);

  /** Reset the active size back to centre */
  const resetPos = useCallback(() => {
    setBgPositions((prev) => ({ ...prev, [currentSize]: { x: 50, y: 50 } }));
  }, [currentSize]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      setBgPositions((prev) => {
        const pos = prev[currentSize];
        return {
          ...prev,
          [currentSize]: {
            x: clamp(pos.x - (e.clientX - dragStart.x) / 15, 0, 100),
            y: clamp(pos.y - (e.clientY - dragStart.y) / 15, 0, 100),
          },
        };
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const onMouseUp = (e) => {
      if (!isDragging) return;
      setIsDragging(false);
      const dx = Math.abs(e.clientX - mouseDown.x);
      const dy = Math.abs(e.clientY - mouseDown.y);
      if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
        onClickThrough?.();
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
    };
  }, [isDragging, dragStart, mouseDown, currentSize, onClickThrough]);

  return { bgPos, handleMouseDown, resetPos };
}
