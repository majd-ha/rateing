import { BsFillPersonFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";

import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <div className="flex items-center h-[100vh]">
      <div className="w-1/2 mx-auto flex justify-around ">
        <div className="px-5 py-2 text-xl border border-orange-500 rounded-lg">
          <Link to={"/guest"}>
            <BsFillPersonFill size={"2rem"} color="orange" />
          </Link>
        </div>
        <div className="px-5 py-2 text-xl border border-orange-500 rounded-lg">
          <Link to={"/signup"}>
            <GrUserAdmin size={"2rem"} color="green" />
          </Link>
        </div>
      </div>
    </div>
  );
}
