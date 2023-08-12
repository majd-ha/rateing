import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <div className=" p-2 w-1/2 mx-auto text-center text-red-500">
        <p className="text-3xl font-bold">404</p>
        <p className="text-3xl font-bold">Not Found</p>
        <button onClick={() => navigate(-1)}>back</button>
      </div>
    </div>
  );
}
