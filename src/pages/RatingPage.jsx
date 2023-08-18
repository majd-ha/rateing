import React, { useEffect, useRef, useState } from "react";
import { BiMessageError } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Stars from "../components/Stars";
export default function RatingPage({ getimg }) {
  const [success, setsuccess] = useState(false);
  const formref = useRef();
  const [details, setdetails] = useState();
  const [hotel, setHotel] = useState({});
  const [food, setFood] = useState();
  const [cleanliness, setcleanliness] = useState();
  const [service, setservice] = useState();
  const [invoice, setinvoice] = useState();
  const [price, setPrice] = useState();
  const [internalErr, setInternalerr] = useState("");
  const [error, setError] = useState(false);
  const url = "http://127.0.0.1:5000";
  const { id } = useParams();
  const getone = async () => {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    setHotel(data.onehotel);
  };
  useEffect(() => {
    getone();
  }, []);
  const resetfields = () => {
    setFood("");
    setPrice("");
    setcleanliness("");
    setinvoice("");
    setservice("");
  };
  const validatedata = (obj) => {
    let total = 0;
    Object.keys(obj).forEach((key) => {
      if (key == "price") {
        let pricefield = parseFloat(obj["price"]);
        if (pricefield > 10) {
          total += 1;
        }
      } else {
        let field = parseFloat(obj[key]);

        if (field <= 10 && field >= 0) {
          total += 1;
        } else {
          return false;
        }
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
      setError(false);
    } else {
      setError(true);
      setsuccess(false);
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

    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });
    const data = await response.json();
    if ("err" in data) {
      console.log(data.err);
      setsuccess(false);
      setInternalerr(data.err);
    } else {
      setdetails(data);
      setInternalerr("");
      getone();
      setsuccess(true);
      formref.current.reset();
      resetfields();
    }
  };

  return (
    <div>
      {error && (
        <div className=" bg-yellow-100 text-red-500  py-2 px-5 rounded-lg w-[40%] mx-auto">
          <p className="capitalize text-center flex gap-2 font-bold py-2">
            {" "}
            <BiMessageError size={"1.5rem"} />
            there is an error , here is the instructions :
          </p>
          <ul className="list-disc text-xs">
            <li>all fields must be filled</li>
            <li>
              food , service and cleanliness rate must be between 0 and 10
            </li>
            <li> invoice must be 8 char length </li>
            <li>price must be greater than 10</li>
          </ul>
        </div>
      )}
      {success && (
        <div className="w-[30%] mx-auto rounded-2xl flex  gap-2 bg-green-700 p-3 items-center justify-center">
          <BsCheckCircleFill size={"1.5rem"} color="white" />
          <p className="text-2xl text-white capitalize">
            submitted successfully
          </p>
        </div>
      )}
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
          error ? "border border-red-500" : ""
        }`}
        onSubmit={middleware}
      >
        {/*  */}
        <p className="text-red-500">{internalErr}</p>
        <div className="inputcontainer">
          <label className="w-[20%]">invoice number</label>
          <input
            type="text"
            onChange={(e) => setinvoice(e.target.value)}
            className={` ${internalErr ? " border-red-500" : ""} inputstyle`}
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
