import React from "react";
import { Carousel } from "react-responsive-carousel";

const Header = () => {
  return (
    <div className="text-white">
      <Carousel
        dynamicHeight={"false"}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
      >
        <div className="min-h-90 bg-slider1 bg-center bg-no-repeat bg-cover flex items-center p-10 lg:p-20">
          <div className="text-left">
            <p className="text-orange text-2xl">Be Strong</p>
            <h1 className="text-3xl lg:text-5xl my-3">
              Make Yourself Stronger
              <br />
              Than Your Excuses.
            </h1>

            <button className="bg-orange text-white px-4 py-2 hover:bg-deepOrange hover:scale-105 duration-300 hover:duration-300 border-0 outline-none rounded">
              Get Started
            </button>
          </div>
        </div>

        <div className="min-h-90 bg-slider2 bg-center bg-no-repeat bg-cover flex items-center p-10 lg:p-20">
          <div className="text-left">
            <p className="text-orange text-2xl">Be Strong</p>
            <h1 className="text-3xl lg:text-5xl my-3">
              Make Yourself Stronger
              <br />
              Than Your Excuses.
            </h1>
            <button className="bg-orange text-white px-4 py-2 hover:bg-deepOrange hover:scale-105 duration-300 hover:duration-300 border-0 outline-none rounded">
              Get Started
            </button>
          </div>
        </div>

        <div className="min-h-90 bg-slider3 bg-center bg-no-repeat bg-cover flex items-center p-10 lg:p-20">
          <div className="text-left">
            <p className="text-orange text-2xl my-3">Be Strong</p>
            <h1 className="text-3xl lg:text-5xl my-5">
              Make Yourself Stronger
              <br />
              Than Your Excuses.
            </h1>
            <button className="bg-orange text-white px-4 py-2 hover:bg-deepOrange hover:scale-105 duration-300 hover:duration-300 border-0 outline-none rounded">
              Get Started
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Header;
