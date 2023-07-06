import React, { useState } from "react";
import TopNavBar from "../navbar/TopNavBar";
import LeftMenuNavBar from "../navbar/LeftMenuNavBar";
import Widget from "../../page/widget/Widget";

const Container = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [widgets, setWidgets] = useState<JSX.Element[]>([]);
  const [isEditWidget, setIsEditWidget] = useState<any>(null);

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  };

  const handleAddWidget = () => {
    const newWidget = <div className="widget-wrap">나? 위젯!</div>;
    setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
  };

  const handleEditWidget = () => {
    setIsEditWidget("");
  };

  return (
    <div id="wrap">
      <div className="containers">
        <LeftMenuNavBar
          onEditButtonClick={handleEditButtonClick}
          onAddWidget={handleAddWidget}
          isEditing={isEditing}
          onEditWidget={handleEditWidget}
          isEditWidget={isEditWidget}
        />
        <TopNavBar />
        <Widget
          isEditing={isEditing}
          isEditWidget={isEditWidget}
          widgets={widgets}
        />
      </div>
    </div>
  );
};

export default Container;
