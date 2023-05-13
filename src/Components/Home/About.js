import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import image from "../../Assets/about-img-min.jpg";

const About = () => {
  return (
    <div className="px-5 mt-20 lg:px-20" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center">
        <div className="col-span-1 p-3">
          <img src={image} alt="" className="w-10/12 mx-auto" />
        </div>
        <div className="col-span-1 p-3">
          <h3 className="text-orange uppercase">About Us</h3>
          <h1 className="text-4xl my-3 text-white">
            Every Day Is A Chance To <br />
            Become Better
          </h1>
          <p className="mb-3">
            A gym is a place where people go to train and exercise, but also to
            unwind, socialize, and recharge. Therefore, a good gym is a facility
            that promotes physical activity, provides a safe, functional, and
            comfortable workout environment, and creates a pleasant and
            enjoyable atmosphere for recreation and socialization.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="col-span-1 p-3">
              <h3 className="text-xl mb-2 font-semibold text-white">
                <FontAwesomeIcon icon={faCheck} className="text-orange mr-2" />
                Body And Mind
              </h3>
              <p>
                Body and mind is an approach to understand the relationship
                between the human body and mind .
              </p>
            </div>
            <div className="col-span-1 p-3">
              <h3 className="text-xl mb-2 font-semibold text-white">
                {" "}
                <FontAwesomeIcon icon={faCheck} className="text-orange mr-2" />
                Healthy Life
              </h3>
              <p>
                A way of living that LOWERS THE RISK of being seriously ill or
                dying early.
              </p>
            </div>
            <div className="col-span-1 p-3">
              <h3 className="text-xl mb-2 font-semibold text-white">
                {" "}
                <FontAwesomeIcon icon={faCheck} className="text-orange mr-2" />
                Strategies
              </h3>
              <p>
                Moving your body and getting the recommended amount of physical
                activity for your age is critical to good health.
              </p>
            </div>
            <div className="col-span-1 p-3">
              <h3 className="text-xl mb-2 font-semibold text-white">
                {" "}
                <FontAwesomeIcon icon={faCheck} className="text-orange mr-2" />
                Workout
              </h3>
              <p>
                Start slowly and build up gradually. Give yourself plenty of
                time to warm up and cool down with easy walking or gentle
                stretching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
