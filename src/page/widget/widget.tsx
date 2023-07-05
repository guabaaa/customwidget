import React, { useEffect, useRef, useState } from "react";

type WidgetProps = {
  isEditing: boolean;
};

const Widget = ({ isEditing }: WidgetProps) => {
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridElement = gridRef.current;

    if (gridElement) {
      const cell = gridElement.querySelector(".grid-cell");

      if (cell) {
        const cellStyles = getComputedStyle(cell);

        const cellWidth = parseFloat(cellStyles.width);
        const cellHeight = parseFloat(cellStyles.height);

        const gridWidth = gridElement.clientWidth;
        const gridHeight = gridElement.clientHeight;

        const numCols = Math.floor(gridWidth / cellWidth);
        const numRows = Math.floor(gridHeight / cellHeight);

        setGridSize({ width: cellWidth, height: cellHeight });

        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numCols; col++) {
            const cellLeft = col * cellWidth;
            const cellTop = row * cellHeight;

            console.log(
              `Cell (${col}, ${row}): left=${cellLeft}px, top=${cellTop}px`
            );
          }
        }
      }
    }
  }, [isEditing]);

  return (
    <div className="content">
      <div className={`widget-editor ${isEditing ? "editing" : ""}`}>
        {isEditing && <div className="widget-overlay" />}
        {isEditing && (
          <div className="grid-overlay">
            <div className="grid-container" ref={gridRef}>
              {[...Array(100)].map((_, index) => (
                <React.Fragment key={index}>
                  {[...Array(100)].map((_, subIndex) => (
                    <div key={subIndex} className="grid-cell" />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Widget;
