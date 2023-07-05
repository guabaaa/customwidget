import React, { useState, useRef } from "react";
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
};
const LeftMenuNavBar = ({
  isEditing,
  onEditButtonClick,
}: LeftMenuNavBarProps) => {
  return (
    <div className="left-nav-wrap">
      <button className="menu-1">
        {isEditing ? (
          <AiFillPlusCircle style={{ width: "2rem", height: "2rem" }} />
        ) : (
          <PiChartPolarDuotone style={{ width: "2rem", height: "2rem" }} />
        )}
        <span>{isEditing ? "위젯 추가" : "탐지현황"}</span>
      </button>
      <button className="menu-2">
        {isEditing ? (
          <AiFillPushpin style={{ width: "2rem", height: "2rem" }} />
        ) : (
          <BsFillBarChartLineFill style={{ width: "2rem", height: "2rem" }} />
        )}
        <span>{isEditing ? "위젯 수정" : "분석현황"}</span>
      </button>
      <button className="menu-3">
        {isEditing ? (
          <AiFillMinusCircle style={{ width: "2rem", height: "2rem" }} />
        ) : (
          <TbNotes style={{ width: "2rem", height: "2rem" }} />
        )}
        <span>{isEditing ? "위젯 삭제" : "시나리오"}</span>
      </button>
      <button className="menu-4" onClick={onEditButtonClick}>
        {isEditing ? (
          <AiFillCheckCircle style={{ width: "2rem", height: "2rem" }} />
        ) : (
          <BiSolidMessageEdit style={{ width: "2rem", height: "2rem" }} />
        )}
        <span>{isEditing ? "수정 완료" : "수정하기"}</span>
      </button>
    </div>
  );
};

export default LeftMenuNavBar;
