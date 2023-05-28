import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Stars from "../components/Stars";
export default function RatingPage({ getimg }) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setdetails] = useState();
  const [hotel, setHotel] = useState({});
  const [food, setFood] = useState();
  const [cleanliness, setcleanliness] = useState();
  const [service, setservice] = useState();
  const [price, setPrice] = useState();
  const url = "http://127.0.0.1:5000";
  const { id } = useParams();
  const getone = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    setHotel(data.onehotel);
    setIsLoading(false);
  };
  useEffect(() => {
    getone();
  }, []);

  const sendData = async (e) => {
    e.preventDefault();
    const submissionData = {
      food,
      service,
      cleanliness,
      price,
    };
    setIsLoading(true);
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });
    const data = await response.json();
    setdetails(data);
    setIsLoading(false);
    getone();
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="text-3xl font-blod text-center text-[#756300] capitalize italic">
        {hotel.name}
      </h1>
      <div className="rounded-lg flex justify-between p-5 w-[60%] mx-auto shadow-md max-sm:flex-col-reverse max-sm:w-[95%]">
        <div>
          <div className="flex items-center gap-3">
            rate : ({hotel?.rate && (hotel?.rate).toFixed(2)})
            {hotel.rate && <Stars rate={hotel?.rate} />}
          </div>

          <h1>total reviews : {hotel?.total_submits}</h1>

          {/*  */}

          <div className=" p-1 ">
            {details && (
              <>
                <p>your rate is : {details["your rate"]}</p>
                {/* <p>global rate is : {details["current rate"]}</p> */}
              </>
            )}
          </div>

          {/*  */}
        </div>

        <div className="w-[40%]  max-sm:w-[100%] max-sm:my-2">
          <img src={getimg(hotel)} alt="f" className="object-contain " />
        </div>
      </div>
      <form
        className=" p-4 mt-7 border w-[60%] mx-auto max-sm:w-[95%] rounded-lg"
        onSubmit={sendData}
      >
        <div className="inputcontainer">
          <label className="w-[20%]">Food Rate</label>
          <input
            type="text"
            onChange={(e) => setFood(e.target.value)}
            className="inputstyle"
          />
        </div>
        {/*  */}
        <div className="inputcontainer">
          <label className="w-[20%]">service Rate</label>
          <input
            type="text"
            onChange={(e) => setservice(e.target.value)}
            className="inputstyle"
          />
        </div>
        {/*  */}
        <div className="inputcontainer ">
          <label className="w-[20%]">cleanliness Rate</label>
          <input
            type="text"
            onChange={(e) => setcleanliness(e.target.value)}
            className="inputstyle"
          />
        </div>
        {/*  */}
        <div className="inputcontainer ">
          <label className="w-[20%]">price </label>
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            className="inputstyle"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button className="w-[20%] p-2 rounded-xl text-white bg-green-700 mx-auto">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
