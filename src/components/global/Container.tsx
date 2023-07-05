import React from "react";
import { Outlet } from "react-router-dom";
import TopNavBar from "../navbar/TopNavBar";
import LeftMenuNavBar from "../navbar/LeftMenuNavBar";

const Container = () => {
  return (
    <div id="wrap">
      <div className="containers">
        <LeftMenuNavBar />
        <TopNavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
