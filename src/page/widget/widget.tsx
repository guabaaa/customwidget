import React, { useEffect, useRef, useState } from "react";

type WidgetProps = {
  isEditing: boolean;
  widgets: JSX.Element[];
};

const Widget = ({ isEditing, widgets }: WidgetProps) => {
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
  const gridRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [activeWidget, setActiveWidget] = useState<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  const handleWidgetMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current || !widgetRef.current || !isEditing) return;

    const widgetElement = event.currentTarget;
    setActiveWidget(widgetElement);

    const gridElement = gridRef.current;
    const cell = gridElement.querySelector(".grid-cell");

    if (!cell) return;

    const cellStyles = getComputedStyle(cell);

    const cellWidth = parseFloat(cellStyles.width);
    const cellHeight = parseFloat(cellStyles.height);

    const gridRect = gridElement.getBoundingClientRect();

    const offsetX = event.clientX - gridRect.left;
    const offsetY = event.clientY - gridRect.top;

    const col = Math.floor(offsetX / cellWidth);
    const row = Math.floor(offsetY / cellHeight);

    widgetElement.style.gridColumn = `${col + 1} / span 1`;
    widgetElement.style.gridRow = `${row + 1} / span 1`;

    const widgetRect = widgetElement.getBoundingClientRect();
    const initialX = widgetRect.left;
    const initialY = widgetRect.top;

    setInitialPos({ x: initialX, y: initialY });
    setCurrentPos({ x: initialX, y: initialY });
    setDragging(true);
  };

  const handleWidgetMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!activeWidget || !gridRef.current || !widgetRef.current || !dragging)
      return;

    const gridElement = gridRef.current;
    const cell = gridElement.querySelector(".grid-cell");

    if (!cell) return;

    const cellStyles = getComputedStyle(cell);

    const cellWidth = parseFloat(cellStyles.width);
    const cellHeight = parseFloat(cellStyles.height);

    const gridRect = gridElement.getBoundingClientRect();

    const clientX = event.clientX - gridRect.left;
    const clientY = event.clientY - gridRect.top;

    const col = Math.floor(clientX / cellWidth);
    const row = Math.floor(clientY / cellHeight);

    const widgetElement = widgetRef.current;

    const borderLeftWidth = parseFloat(cellStyles.borderLeftWidth);
    const borderTopWidth = parseFloat(cellStyles.borderTopWidth);

    const newX = col * cellWidth + borderLeftWidth;
    const newY = row * cellHeight + borderTopWidth;

    widgetElement.style.left = `${newX}px`;
    widgetElement.style.top = `${newY}px`;

    setCurrentPos({ x: newX, y: newY });
    setDragging(true);
  };

  const handleWidgetMouseUp = () => {
    if (!activeWidget || !gridRef.current || !widgetRef.current || !dragging)
      return;

    setActiveWidget(null);
    setDragging(false);

    const widgetElement = activeWidget;
    const widgetRect = widgetElement.getBoundingClientRect();
    const initialX = widgetRect.left;
    const initialY = widgetRect.top;

    setInitialPos({ x: initialX, y: initialY });
    setCurrentPos({ x: initialX, y: initialY });
  };

  useEffect(() => {
    const gridElement = gridRef.current;
    if (gridElement) {
      const cell = gridElement.querySelector(".grid-cell");
      if (cell) {
        const cellStyles = getComputedStyle(cell);
        const cellWidth = parseFloat(cellStyles.width);
        const cellHeight = parseFloat(cellStyles.height);
        const containerWidth = gridElement.offsetWidth;
        const containerHeight = gridElement.offsetHeight;
        const gridWidth = Math.floor(containerWidth / cellWidth);
        const gridHeight = Math.floor(containerHeight / cellHeight);
        setGridSize({ width: gridWidth, height: gridHeight });
      }
    }
  }, []);

  return (
    <div className="content">
      <div className="widget-editor">
        {isEditing && (
          <div className={`widget-editor ${isEditing ? "editing" : ""}`} />
        )}
        {isEditing && (
          <div className="grid-overlay">
            <div className="grid-container" ref={gridRef}>
              {[...Array(70)].map((_, index) => (
                <React.Fragment key={index}>
                  {[...Array(80)].map((_, subIndex) => (
                    <div key={subIndex} className="grid-cell" />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        <div className="widget-container">
          {isEditing && (
            <div
              className="widget-drag-area"
              onMouseDown={handleWidgetMouseDown}
              onMouseMove={handleWidgetMouseMove}
              onMouseUp={handleWidgetMouseUp}
            >
              <div
                className={`widget ${dragging ? "dragging" : ""}`}
                ref={widgetRef}
                style={{
                  gridColumn: `span ${gridSize.width}`,
                  gridRow: `span ${gridSize.height}`,
                  transform: `translate(${currentPos.x - initialPos.x}px, ${
                    currentPos.y - initialPos.y
                  }px)`,
                }}
              >
                {widgets}
              </div>
            </div>
          )}
          {!isEditing && <div className="widget">{widgets}</div>}
        </div>
      </div>
    </div>
  );
};

export default Widget;
