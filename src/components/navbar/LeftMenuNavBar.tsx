import React from "react";
import { PiChartPolarDuotone } from "react-icons/pi";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { TbNotes } from "react-icons/tb";
import { BiSolidMessageEdit } from "react-icons/bi";
import {
  AiFillPushpin,
  AiFillCheckCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";

type LeftMenuNavBarProps = {
  isEditing: boolean;
  onEditButtonClick: () => void;
  onAddWidget: () => void;
  onEditWidget: (
    handleWidgetSizeChange: (width: number, height: number) => void,
    handleWidgetPositionChange: (col: number, row: number) => void
  ) => void;
};

const LeftMenuNavBar = ({
  isEditing,
  onAddWidget,
  onEditButtonClick,
  onEditWidget,
}: LeftMenuNavBarProps) => {
  const handleWidgetSizeChange = (width: number, height: number) => {
    onEditWidget(
      (width, height) => handleWidgetSizeChange(width, height),
      handleWidgetPositionChange
    );
  };

  const handleWidgetPositionChange = (col: number, row: number) => {
    onEditWidget(handleWidgetSizeChange, (col, row) =>
      handleWidgetPositionChange(col, row)
    );
  };
  const handleWidgetClick = () => {
    if (isEditing) {
      onAddWidget();
    } else {
      onEditWidget(handleWidgetSizeChange, handleWidgetPositionChange);
    }
  };
  return (
    <div className="left-nav-wrap">
      <button className="menu-1" onClick={handleWidgetClick}>
        {isEditing ? (
          <AiFillPlusCircle style={{ width: "2rem", height: "2rem" }} />
        ) : (
          <PiChartPolarDuotone style={{ width: "2rem", height: "2rem" }} />
        )}
        <span>{isEditing ? "위젯추가" : "탐지현황"}</span>
      </button>
      <button className="menu-2" onClick={handleWidgetClick}>
        {isEditing ? (
          <AiFillPushpin style={{ width: "2rem", height: "2rem" }} />
        ) : (
          <BsFillBarChartLineFill style={{ width: "2rem", height: "2rem" }} />
        )}
        <span>{isEditing ? "위젯수정" : "분석현황"}</span>
      </button>
      <button className="menu-3">
        {isEditing ? (
          <AiFillMinusCircle style={{ width: "2rem", height: "2rem" }} />
        ) : (
          <TbNotes style={{ width: "2rem", height: "2rem" }} />
        )}
        <span>{isEditing ? "위젯삭제" : "시나리오"}</span>
      </button>
      <button className="menu-4" onClick={onEditButtonClick}>
        {isEditing ? (
          <AiFillCheckCircle style={{ width: "2rem", height: "2rem" }} />
        ) : (
          <BiSolidMessageEdit style={{ width: "2rem", height: "2rem" }} />
        )}
        <span>{isEditing ? "편집완료" : "편집하기"}</span>
      </button>
    </div>
  );
};

export default LeftMenuNavBar;
