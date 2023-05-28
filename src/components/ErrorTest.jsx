import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorTest() {
  const error = useRouteError();
  return (
    <div>
      <p className="text-center text-3xl p-8">{error.message}</p>
    </div>
  );
}
