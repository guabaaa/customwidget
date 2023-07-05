import React, { useState } from "react";
import TopNavBar from "../navbar/TopNavBar";
import LeftMenuNavBar from "../navbar/LeftMenuNavBar";
import Widget from "../../page/widget/widget";

const Container = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [widgets, setWidgets] = useState<JSX.Element[]>([]);

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  };

  // 위젯 추가
  const handleAddWidget = () => {
    // 위젯상태는 저장해놓기
    const newWidget = <div className="widget-wrap">나? 위젯!</div>;
    setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
  };

  // size 변경
  const handleWidgetSizeChange = (width: number, height: number) => {
    const updatedWidgets = widgets.map((widget) => {
      // 각 위젯의 사이즈 변경
      return widget;
    });
    setWidgets(updatedWidgets);
  };

  // 위젯 위치 변경
  const handleWidgetPositionChange = (col: number, row: number) => {
    const updatedWidgets = widgets.map((widget) => {
      // 각 위젯의 위치 변경
      return widget;
    });
    setWidgets(updatedWidgets);
  };

  const handleEditWidget = () => {
    return {
      handleWidgetSizeChange,
      handleWidgetPositionChange,
    };
  };

  return (
    <div id="wrap">
      <div className="containers">
        <LeftMenuNavBar
          onEditButtonClick={handleEditButtonClick}
          onAddWidget={handleAddWidget}
          isEditing={isEditing}
          onEditWidget={handleEditWidget}
        />
        <TopNavBar />
        <Widget isEditing={isEditing} widgets={widgets} />
      </div>
    </div>
  );
};

export default Container;
