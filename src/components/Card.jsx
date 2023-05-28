import React from "react";
import Stars from "./Stars";

export default function Card({ info, getimg }) {
  return (
    <div className=" rounded-xl shadow-md h-[470px]">
      <div className="w-[90%] mx-auto py-3">
        <img
          src={getimg(info)}
          alt="f"
          className="object-contain rounded-xl h-[40%]"
        />
        <h1 className="text-center text-3xl my-2"> {info.name}</h1>
        <p className="italic p-3 w-[90%] break-words overflow-hidden ">
          {info.description}
        </p>
        <p className=" flex items-center gap-1">
          Rrate : <Stars rate={info.rate} />{" "}
        </p>
      </div>
    </div>
  );
}
