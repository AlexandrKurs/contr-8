import { NavLink } from "react-router-dom";
import { categories } from "../../categories";
import { Category } from "../../types";
import "../../App.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h3>Categories</h3>
      <nav>
        {categories.map((category: Category) => (
          <NavLink
            key={category.id}
            to={`/${category.id}`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {category.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
