import moment from "moment";
import React from "react";

const NewCard = ({ cryptoNew }) => {
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
  return (
    <div className="w-80 shadow-md border rounded-md p-3">
      <div className="flex items-center gap-5">
        <h1 className="text-gray-700 font-semibold">
          {cryptoNew.name.substring(0, 60)} ...
        </h1>
        <img
          src={cryptoNew.image?.thumbnail?.contentUrl || demoImage}
          alt=""
          className="rounded-full"
        />
      </div>
      <p className="text-sm text-gray-500 my-5 tracking-wider">
        {cryptoNew.description.substring(0, 100)}...
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="rounded-lg"
            src={
              cryptoNew.provider[0]?.image?.thumbnail?.contentUrl || demoImage
            }
            width={"35px"}
            alt=""
          />
          <p className="text-gray-500 text-xs">{cryptoNew.provider[0].name}</p>
        </div>
        <p className="text-gray-500 text-xs">
          {moment(cryptoNew.datePublished).startOf("ss").fromNow()}
        </p>
      </div>
    </div>
  );
};

export default NewCard;
