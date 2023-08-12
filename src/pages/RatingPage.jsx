import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import Stars from "../components/Stars";
export default function RatingPage({ getimg }) {
  const [isLoading, setIsLoading] = useState(false);
  const formref = useRef();
  const [details, setdetails] = useState();
  const [hotel, setHotel] = useState({});
  const [food, setFood] = useState();
  const [cleanliness, setcleanliness] = useState();
  const [service, setservice] = useState();
  const [invoice, setinvoice] = useState();
  const [price, setPrice] = useState();
  const [error, setError] = useState("");
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
  const validatedata = (obj) => {
    let total = 0;
    Object.keys(obj).forEach((key) => {
      let field = parseFloat(obj[key]);
      if (field <= 10 && field >= 0) {
        total += 1;
      } else {
        return false;
      }
    });
    if (total === 4) {
      return true;
    }
  };
  const middleware = (e) => {
    e.preventDefault();

    if (
      validatedata({ food, service, cleanliness, price }) &&
      invoice.length == 8
    ) {
      sendData();
      setError("");
      formref.current.reset();
    } else {
      setError("rate must be between 0 and 10");
    }
  };
  const sendData = async () => {
    const submissionData = {
      food,
      service,
      cleanliness,
      price,
      invoice,
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

  return (
    <div>
      <p className="text-red-500 font-bold text-2xl text-center">{error}</p>
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
                <p>your rate is : {details["your rate"].toFixed(2)}</p>
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
        ref={formref}
        className={` p-4 mt-7 border w-[60%] mx-auto max-sm:w-[95%] rounded-lg ${
          error.length > 0 ? "border border-red-500" : ""
        }`}
        onSubmit={middleware}
      >
        {/*  */}
        <div className="inputcontainer">
          <label className="w-[20%]">invoice number</label>
          <input
            type="text"
            onChange={(e) => setinvoice(e.target.value)}
            className="inputstyle"
          />
        </div>
        {/*  */}
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
