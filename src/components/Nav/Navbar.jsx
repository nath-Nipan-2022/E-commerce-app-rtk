import { useState } from "react";
import { Link } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import { navLinks } from "../../constants";
import NavLinksDropdown from "./NavLinksDropdown";

function Navbar({ openMenu, onClose }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const closeDropdown = () => {
    setOpenDropdown(false);
    onClose();
  };

  return (
    <nav className={`absolute lg:relative h-[56px] flex items-center`}>
      {/* Overlay */}
      {openMenu && (
        <div
          className="fixed z-20 inset-0 bg-black/50 lg:hidden opacity-0 animate-fadeIn"
          onClick={closeDropdown}
        ></div>
      )}
      {/* The menu appear on mobile */}
      <div
        className={`fixed z-20 left-1/2 -translate-x-1/2 lg:translate-x-0 w-11/12 lg:w-auto lg:static bg-white lg:bg-transparent rounded-lg p-3 lg:p-0 transition duration-300 ${
          openMenu
            ? "top-5 opacity-100 translate-y-0"
            : "top-0 opacity-0 -translate-y-full"
        } lg:opacity-100 lg:translate-y-0`}
      >
        <ul className="lg:max-w-7xl flex flex-col lg:flex-row lg:items-center lg:gap-4 p-3 lg:p-0">
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className="group relative rounded text-gray-600 lg:hover:text-slate-900"
              >
                {!link.hasDropdown ? (
                  <Link
                    to={link.path}
                    className="block p-1 px-2 hover:bg-[#eaeaea] lg:hover:bg-transparent"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <div
                    className="p-1 px-2 flex items-center gap-2 justify-between cursor-pointer"
                    onClick={() => setOpenDropdown((prev) => !prev)}
                  >
                    {link.label}
                    <GoChevronDown className="transition duration-500 lg:group-hover:translate-y-1" />
                  </div>
                )}
                {/* dropdown  */}
                {link.hasDropdown && (
                  <div
                    className={`lg:absolute z-20 top-full left-0 lg:pt-4 ${
                      openDropdown ? "block" : "hidden"
                    } lg:hidden lg:group-hover:block`}
                  >
                    <div className="lg:bg-white lg:border lg:shadow-lg lg:rounded-lg -translate-y-2 lg:-translate-x-2 lg:translate-y-0 opacity-0 animate-popUp transition duration-300">
                      <h4 className="text-gray-600 p-2 lg:p-3 border-b">
                        Top Categories
                      </h4>
                      <NavLinksDropdown
                        className="w-full p-2 lg:p-4 grid gap-2 grid-cols-2 lg:grid-cols-dropdown"
                        childrenClassName="lg:bg-gray-500/5 lg:flex lg:items-center hover:bg-[#f0f0f0] rounded border-[#eaeaea]"
                      />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
