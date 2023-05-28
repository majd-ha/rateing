import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <div className="py-2">
      <div>
        <Link to={"/"} className="w-[30%] text-3xl ">
          <IoIosArrowBack size={"2rem"} color="gray" className="mx-4" />
        </Link>
      </div>
    </div>
  );
}
