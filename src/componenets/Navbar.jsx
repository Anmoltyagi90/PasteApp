import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">PasteApp</h1>

      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300"
          }
        >
          Pastes
        </NavLink>

        <NavLink
          to="/pastes/:id"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300"
          }
        >
          ViewPaste
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
