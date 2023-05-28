import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Loading from "../components/Loading";

export default function LandingPage({ getimg }) {
  const [isLoading, setIsLoading] = useState(false);

  const url = "http://127.0.0.1:5000";
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      setIsLoading(true);
      const response = await fetch(url);

      const data = await response.json();
      setIsLoading(false);

      setHotels(data?.allstuff);
    };

    getdata();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <p className="text-4xl text-center p-3 capitalize text-blue-400">
        {" "}
        welcome to global rating system
      </p>
      <div className="flex justify-around items-center p-6 gap-6 max-sm:flex-col">
        {hotels?.map((el) => {
          return (
            <Link key={el._id} to={`/hotels/${el._id}`} className="basis-0	grow">
              <Card info={el} getimg={getimg} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
