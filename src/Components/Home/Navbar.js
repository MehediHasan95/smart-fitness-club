import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="lg:px-20 navbar bg-raisinBlack text-white" id="home">
      <div className="w-full lg:navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu-compact dropdown-content mt-3 p-2 shadow bg-raisinBlack rounded-box w-52"
          >
            <li className="p-2 hover:bg-orange rounded-md cursor-pointer">
              <ScrollLink
                to="home"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Home
              </ScrollLink>
            </li>

            <li className="p-2 hover:bg-orange rounded-md cursor-pointer">
              <ScrollLink
                to="about"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                About
              </ScrollLink>
            </li>
            <li className="p-2 hover:bg-orange rounded-md cursor-pointer">
              <ScrollLink
                to="services"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Services
              </ScrollLink>
            </li>
            <li className="p-2 hover:bg-orange rounded-md cursor-pointer">
              <ScrollLink
                to="trainer"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Trainer
              </ScrollLink>
            </li>
            <li className="p-2 hover:bg-orange rounded-md cursor-pointer">
              <Link to="/authentication">Login</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="text-2xl lg:text-3xl font-bold font-lobster">
          Fitness <span className="text-orange">Club</span>
        </Link>
      </div>
      <div className="lg:navbar-end">
        <div className="hidden lg:flex">
          <ul className="menu-horizontal">
            <li className="ml-7 hover:text-orange hover:font-bold hover:scale-105 duration-300 hover:duration-300 cursor-pointer">
              <ScrollLink
                to="home"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Home
              </ScrollLink>
            </li>
            <li className="ml-7 hover:text-orange hover:font-bold hover:scale-105 duration-300 hover:duration-300 cursor-pointer">
              <ScrollLink
                to="about"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                About
              </ScrollLink>
            </li>

            <li className="ml-7 hover:text-orange hover:font-bold hover:scale-105 duration-300 hover:duration-300 cursor-pointer">
              <ScrollLink
                to="services"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Services
              </ScrollLink>
            </li>
            <li className="ml-7 hover:text-orange hover:font-bold hover:scale-105 duration-300 hover:duration-300 cursor-pointer">
              <ScrollLink
                to="trainer"
                spy={true}
                smooth={true}
                offset={-20}
                duration={500}
              >
                Trainer
              </ScrollLink>
            </li>

            <li className="ml-7 hover:text-orange hover:font-bold hover:scale-105 duration-300 hover:duration-300">
              <Link to="/authentication">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
