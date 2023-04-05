import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { GlobalContext } from "../../Context/ContextProvider";

const Services = () => {
  const { serviceCollection, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-5 lg:px-20 mt-20" id="services">
      <h1 className="text-center text-3xl uppercase text-orange mb-10">
        Our Services
      </h1>

      <Slider {...settings}>
        {serviceCollection.map((e) => (
          <div key={e.id}>
            <div className="border border-gray-400 text-center rounded-lg m-3 h-98 relative">
              <h1 className="text-white text-2xl mt-5">{e.title}</h1>
              <h1 className="my-5">
                tk
                <span className="text-6xl text-orange font-semibold">
                  {e.amount}
                </span>
                /{e.duration}Mo
              </h1>
              <div className="flex justify-center text-left">
                <ul>
                  {e.features.map((e, index) => (
                    <li key={index} className="my-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-orange mr-1"
                      />{" "}
                      {e.features}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate(`/user-services/${e.id}`)}
                className="bg-orange text-white my-5 px-4 py-2 hover:bg-deepOrange hover:scale-105 duration-300 hover:duration-300 border-0 left-24 right-24 outline-none rounded absolute bottom-0"
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Services;
