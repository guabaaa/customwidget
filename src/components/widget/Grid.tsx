import React, { useEffect, useRef, useState } from "react";

type WidgetProps = {
  isEditing: boolean;
  isEditWidget: boolean;
  widgets: JSX.Element[];
};

const Grid = ({ isEditing, isEditWidget, widgets }: WidgetProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [widgetPositions, setWidgetPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  useEffect(() => {
    if (
      (isEditing || isEditWidget) &&
      widgetContainerRef.current &&
      gridRef.current
    ) {
      const gridContainer = gridRef.current;
      const widgetElements = widgetRef.current?.children;

      const gridSize = 100; // 모눈판 셀 크기
      const margin = 10; // 위젯 간격
      const widgetWidth = 200; // 위젯 너비

      let currentX = margin;
      let currentY = margin;
      let maxHeight = 0;
      const newWidgetPositions: { [key: string]: { x: number; y: number } } =
        {};

      if (widgetElements) {
        for (let i = 0; i < widgetElements.length; i++) {
          const widget = widgetElements[i] as HTMLElement;
          const widgetRect = widget.getBoundingClientRect();

          if (currentX + widgetRect.width > gridContainer.offsetWidth) {
            currentX = margin;
            currentY += maxHeight + margin;
            maxHeight = 0;
          }

          if (currentY + widgetRect.height > gridContainer.offsetHeight) {
            // 스크롤 처리 추가하기(아직 못함)
          }

          const widgetId = widget.getAttribute("data-widget-id")!;
          const newPosition = { x: currentX, y: currentY };
          newWidgetPositions[widgetId] = newPosition;

          widget.style.left = `${currentX}px`;
          widget.style.top = `${currentY}px`;

          currentX += widgetRect.width + margin;
          maxHeight = Math.max(maxHeight, widgetRect.height);
        }
      }

      setWidgetPositions(newWidgetPositions);
    }
  }, [isEditing, isEditWidget, widgets]);

  const handleWidgetMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const widgetId = event.currentTarget.getAttribute("data-widget-id");
    if (!widgetId) return;

    const initialX = event.clientX;
    const initialY = event.clientY;

    const widgetPosition = widgetPositions[widgetId];
    const initialPos = widgetPosition || { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const currentX = event.clientX;
      const currentY = event.clientY;

      const offsetX = currentX - initialX;
      const offsetY = currentY - initialY;

      const newX = initialPos.x + offsetX;
      const newY = initialPos.y + offsetY;

      const newPositions = { ...widgetPositions };
      newPositions[widgetId] = { x: newX, y: newY };
      setWidgetPositions(newPositions);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div className="widget-editor">
      {(isEditing || isEditWidget) && (
        <div className={`widget-editor ${isEditing ? "editing" : ""}`} />
      )}
      {isEditing && (
        <div className="grid-overlay">
          <div className="grid-container" ref={gridRef}>
            {[...Array(100)].map((_, index) => (
              <React.Fragment key={index}>
                {[...Array(50)].map((_, subIndex) => (
                  <div key={subIndex} className="grid-cell" />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      <div className="widget-container" ref={widgetContainerRef}>
        {(isEditing || isEditWidget) && (
          <div
            className={`widget-drag-area ${
              isEditing || isEditWidget ? "editing" : ""
            }`}
          >
            {widgets.map((widget, index) => (
              <div
                key={index}
                className={`widget ${
                  widgetPositions[index]?.x !== undefined &&
                  widgetPositions[index]?.y !== undefined
                    ? "dragging"
                    : ""
                }`}
                data-widget-id={index}
                style={{
                  left: widgetPositions[index]?.x,
                  top: widgetPositions[index]?.y,
                }}
                onMouseDown={handleWidgetMouseDown}
                ref={widgetRef}
              >
                {widget}
              </div>
            ))}
          </div>
        )}
        {!isEditing && !isEditWidget && (
          <div className="widget" ref={widgetRef}>
            {widgets}
          </div>
        )}
      </div>
    </div>
  );
};
export default Grid;
