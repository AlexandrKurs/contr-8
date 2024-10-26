import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { categories } from "../../categories";

const Sidebar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavLinkClick = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/${id}`);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="sidebar">
      <h3>Categories</h3>
      <nav>
        {loading ? (
          <div className="spinner-container">
            <Oval
              height={200}
              width={200}
              color="#007bff"
              ariaLabel="loading"
            />
          </div>
        ) : (
          categories.map((category) => (
            <NavLink
              key={category.id}
              to={`/${category.id}`}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(category.id)}
            >
              {category.title}
            </NavLink>
          ))
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
