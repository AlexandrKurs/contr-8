import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
const Header: React.FC = () => {
  return (
    <div className="header">
      <p>QUOTES</p>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({isActive}) => (isActive ? "active" : "")}
              end
            >
              Quotes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new-quote"
              className={({isActive}) => (isActive ? "active" : "")}
            >
              Submit new quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;