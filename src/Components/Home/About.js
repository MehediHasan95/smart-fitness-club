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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            deleniti saepe fuga, assumenda mollitia ea, porro voluptate
            quibusdam consequuntur nesciunt blanditiis id aliquam? Eius, quae? A
            ab voluptatibus iure architecto?
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="col-span-1 p-3">
              <h3 className="text-xl mb-2 font-semibold text-white">
                <FontAwesomeIcon icon={faCheck} className="text-orange mr-2" />
                Body And Mind
              </h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div className="col-span-1 p-3">
              <h3 className="text-xl mb-2 font-semibold text-white">
                {" "}
                <FontAwesomeIcon icon={faCheck} className="text-orange mr-2" />
                Healthy Life
              </h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div className="col-span-1 p-3">
              <h3 className="text-xl mb-2 font-semibold text-white">
                {" "}
                <FontAwesomeIcon icon={faCheck} className="text-orange mr-2" />
                Strategies
              </h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div className="col-span-1 p-3">
              <h3 className="text-xl mb-2 font-semibold text-white">
                {" "}
                <FontAwesomeIcon icon={faCheck} className="text-orange mr-2" />
                Workout
              </h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
