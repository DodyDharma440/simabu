import { useCallback, useRef, useState } from "react";

export const useDragScroll = <T extends HTMLElement = HTMLElement>() => {
  const scrollRef = useRef<T>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleStartDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  }, []);

  const handleStopDrag = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isMouseDown) {
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
        const scroll = x - startX;
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollLeft - scroll;
        }
      }
    },
    [isMouseDown, scrollLeft, startX]
  );

  return {
    ref: scrollRef,
    isDragging: isMouseDown,
    onDrag: handleStartDrag,
    onDragEnd: handleStopDrag,
    onMouseMove: handleMouseMove,
  };
};
