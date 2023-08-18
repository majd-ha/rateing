import React, { useEffect, useState } from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
export default function Stars({ rate }) {
  const [ishalf, setIshalf] = useState(rate % 1 === 0 ? false : true);
  const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  stars.length = Math.ceil(rate);
  useEffect(() => {
    setIshalf(rate % 1 === 0 ? false : true);
  }, []);

  return (
    <div className="flex gap-2  items-center">
      {stars.map((el, i) => {
        return ishalf ? (
          i == stars.length - 1 ? (
            <BsStarHalf color="#756300" key={el} />
          ) : (
            <BsStarFill color="#756300" key={el} />
          )
        ) : (
          <BsStarFill color="#756300" key={el} />
        );
      })}
    </div>
  );
}
