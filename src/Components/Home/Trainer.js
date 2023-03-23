import React, { useContext } from "react";
import Slider from "react-slick";
import { GlobalContext } from "../../Context/ContextProvider";

const Trainer = () => {
  const { authCollection } = useContext(GlobalContext);
  const trainer = authCollection.filter((e) => e.role === "trainer");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
    <div className="px-5 lg:px-20 mt-20" id="trainer">
      <h1 className="text-center text-3xl text-orange uppercase mb-10">
        Expert Trainers
      </h1>

      <Slider {...settings}>
        {trainer.map((e) => (
          <div key={e.uid}>
            <div className="bg-black w-11/12 mx-auto overflow-hidden">
              <div className="h-96">
                <img
                  src={e.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center p-3">
                <p className="text-orange">Expert Trainer</p>
                <h1 className="text-xl text-white">{e.displayName}</h1>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Trainer;
