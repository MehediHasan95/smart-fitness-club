import React from "react";
import { Outlet } from "react-router-dom";
import Home from "../Components/Home/Home";

const Main = () => {
  return (
    <main className="bg-raisinBlack text-gray-400">
      <Home />
      <Outlet />
    </main>
  );
};

export default Main;
