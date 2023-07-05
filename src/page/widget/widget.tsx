import React, { useState } from "react";

const WidgetEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState({ x: 0, y: 0 });
  const [widgetSize, setWidgetSize] = useState({ width: 200, height: 200 });
  const [gridPosition, setGridPosition] = useState({ x: 0, y: 0 });

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleMouseDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditing) return;
    const newX = e.clientX;
    const newY = e.clientY;
    const gridX = Math.floor(newX / 10) * 10;
    const gridY = Math.floor(newY / 10) * 10;
    setWidgetPosition({ x: newX, y: newY });
    setGridPosition({ x: gridX, y: gridY });
  };

  const handleMouseResize = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditing) return;
    const newWidth = e.clientX - widgetPosition.x;
    const newHeight = e.clientY - widgetPosition.y;
    setWidgetSize({ width: newWidth, height: newHeight });
  };

  return (
    <div className="content">
      <div className="widget-wrap">
        <button onClick={handleEditButtonClick} className="widget-edit-btn">
          EDIT
        </button>
        <div
          className={`widget${isEditing ? " editing" : ""}`}
          style={{
            left: `${widgetPosition.x}px`,
            top: `${widgetPosition.y}px`,
            width: `${widgetSize.width}px`,
            height: `${widgetSize.height}px`,
          }}
          onMouseMove={handleMouseDrag}
          onMouseUp={() => setIsEditing(false)}
        >
          {isEditing && (
            <div
              className="grid-overlay"
              style={{
                left: `${gridPosition.x}px`,
                top: `${gridPosition.y}px`,
              }}
              onMouseMove={handleMouseResize}
            />
          )}
          위젯
        </div>
      </div>
    </div>
  );
};

export default WidgetEditor;
