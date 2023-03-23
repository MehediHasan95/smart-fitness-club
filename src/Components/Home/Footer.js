import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <footer className="footer p-16 lg:px-20 mt-20 bg-black">
      <div>
        <Link to="/" className="text-2xl lg:text-3xl font-bold font-lobster">
          Fitness <span className="text-orange">Club</span>
        </Link>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div>
        <span className="uppercase text-white">Quick Links</span>
        <ScrollLink
          to="home"
          spy={true}
          smooth={true}
          offset={-20}
          duration={500}
          className="cursor-pointer hover:text-orange"
        >
          Home
        </ScrollLink>
        <ScrollLink
          to="about"
          spy={true}
          smooth={true}
          offset={-20}
          duration={500}
          className="cursor-pointer hover:text-orange"
        >
          About us
        </ScrollLink>
        <ScrollLink
          to="services"
          spy={true}
          smooth={true}
          offset={-20}
          duration={500}
          className="cursor-pointer hover:text-orange"
        >
          Services
        </ScrollLink>
        <ScrollLink
          to="trainer"
          spy={true}
          smooth={true}
          offset={-20}
          duration={500}
          className="cursor-pointer hover:text-orange"
        >
          Trainer
        </ScrollLink>
      </div>
      <div>
        <span className="uppercase text-white">Opening Hours</span>
        <a className="link link-hover">Monday: 7:00am-10:30pm</a>
        <a className="link link-hover">Tuesday: 7:00am-10:30pm</a>
        <a className="link link-hover">Wednesday: 7:00am-10:30pm</a>
        <a className="link link-hover">Thrusday: 7:00am-10:30pm</a>
      </div>
      <div>
        <span className="uppercase text-white">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
};

export default Footer;
