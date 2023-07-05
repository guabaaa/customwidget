import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Container from "../components/global/Container";
import Login from "../page/user/login";
import Widget from "../page/widget/widget";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Container />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      // {
      //   path: "widget",
      //   element: <Widget isEditing={false} />,
      // },
    ],
  },
]);
