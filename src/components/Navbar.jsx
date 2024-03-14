import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full bg-amber-400 p-5 font-bold flex">
      <Link to={"/"}>
        <span>HomeBurger</span>
      </Link>

      <ul className="flex flex-grow ml-10 font-normal">
        <li className="mr-10">
          <Link to={"/cart"}>Cart</Link>
        </li>
        <li className="mr-10">
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        <li className="mr-10">
          <Link to={"/about"}>About</Link>
        </li>
      </ul>
    </div>
  );
}
