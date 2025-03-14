import React from "react";
import logo from "./ISG_LOGO.jpeg";
import "./Navbar.css";
import { Link } from "react-router-dom";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="relative container mx-auto p-6 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" width="10%" height="10%" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-back">
          <div className="hover:text-darkBlue">Login</div>
          <Link
            to="/pdf-page"
            className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
