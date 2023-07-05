import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNavBar from "../navbar/TopNavBar";
import LeftMenuNavBar from "../navbar/LeftMenuNavBar";
import Widget from "../../page/widget/widget";

const Container = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div id="wrap">
      <div className="containers">
        <LeftMenuNavBar
          onEditButtonClick={handleEditButtonClick}
          isEditing={isEditing}
        />
        <TopNavBar />
        <Widget isEditing={isEditing} />
      </div>
    </div>
  );
};

export default Container;
