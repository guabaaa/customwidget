import React, { useEffect, useRef, useState } from "react";

type WidgetProps = {
  isEditing: boolean;
  isEditWidget: boolean;
  widgets: JSX.Element[];
};

const Widget = ({ isEditing, widgets, isEditWidget }: WidgetProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isPosition, setIsPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isInitialPos, setIsInitialPos] = useState({ x: 0, y: 0 });

  const handleWidgetMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);

    const initialX = event.clientX;
    const initialY = event.clientY;

    setIsInitialPos({ x: initialX, y: initialY });

    document.addEventListener("mousemove", handleWidgetMouseMove);
    document.addEventListener("mouseup", handleWidgetMouseUp);
  };

  const handleWidgetMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    const currentX = event.clientX;
    const currentY = event.clientY;

    const offsetX = currentX - isInitialPos.x;
    const offsetY = currentY - isInitialPos.y;

    const newX = isPosition.x + offsetX;
    const newY = isPosition.y + offsetY;

    setIsPosition({ x: newX, y: newY });
    setIsInitialPos({ x: currentX, y: currentY });
  };

  const handleWidgetMouseUp = () => {
    setIsDragging(false);

    document.removeEventListener("mousemove", handleWidgetMouseMove);
    document.removeEventListener("mouseup", handleWidgetMouseUp);
  };

  return (
    <div className="content">
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
        <div className="widget-container">
          {(isEditing || isEditWidget) && (
            <div
              className={`widget-drag-area ${
                isEditing || isEditWidget ? "editing" : ""
              }`}
              style={{ left: isPosition.x, top: isPosition.y }}
              onMouseDown={handleWidgetMouseDown}
            >
              <div
                className={`widget ${isDragging ? "dragging" : ""}`}
                ref={widgetRef}
              >
                {widgets}
              </div>
            </div>
          )}
          {!isEditing && !isEditWidget && (
            <div className="widget">{widgets}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
