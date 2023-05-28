import React from "react";
import { ImSpinner10 } from "react-icons/im";
export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <ImSpinner10 size={"4rem"} color="blue" className="animate-spin" />
    </div>
  );
}
