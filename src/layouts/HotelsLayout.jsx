import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function HotelsLayout() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
