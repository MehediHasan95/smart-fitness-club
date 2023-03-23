import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ScrollToTop from "react-scroll-to-top";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import Services from "./Services";
import Trainer from "./Trainer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <Services />
      <Trainer />
      <Footer />
      <ScrollToTop
        smooth
        style={{ backgroundColor: "#fd1803", borderRadius: "100%" }}
        component={<FontAwesomeIcon icon={faArrowUp} className="text-white" />}
      />
    </div>
  );
};

export default Home;
