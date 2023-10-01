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

  const renderLinks = navLinks.map((link) => (
    <li
      key={link.id}
      className="relative text-gray-600 rounded group lg:hover:text-slate-900"
    >
      {!link.hasDropdown ? (
        <Link
          to={link.path}
          className="block p-1 px-2 hover:bg-[#eaeaea] lg:hover:bg-transparent"
        >
          {link.label}
        </Link>
      ) : (
        <>
          {/* desktop dropdown */}
          {/* dropdown Label  */}
          <div
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <span className="items-center justify-between hidden gap-2 p-1 px-2 cursor-pointer lg:flex">
              {link.label}{" "}
              <GoChevronDown
                className={`transition duration-300 ${
                  openDropdown ? "translate-y-0.5" : "translate-y-0"
                }`}
              />
            </span>
          </div>

          <div
            className="hidden lg:block"
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <NavLinksDropdown
              isOpen={openDropdown}
              onItemClick={() => setOpenDropdown(false)}
              hasTitle={"Top Categories"}
              className="pt-4"
            />
          </div>

          {/* mobile dropdown */}
          {/* dropdown Label */}
          <div onClick={() => setOpenDropdown((prev) => !prev)}>
            <span className="flex items-center justify-between gap-2 p-1 px-2 cursor-pointer lg:hidden">
              {link.label}
              <GoChevronDown
                className={`transition duration-300 ${
                  openDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </span>
          </div>

          <div className={`block lg:hidden`}>
            <NavLinksDropdown
              isOpen={openDropdown}
              onItemClick={closeDropdown}
              hasTitle={"Top Categories"}
              className={"relative top-0"}
            />
          </div>
        </>
      )}
    </li>
  ));

  return (
    <nav className={`absolute lg:relative h-[56px] flex items-center`}>
      {/* The menu appear on mobile */}
      <div
        className={`nav-dropdown-wrapper ${
          openMenu
            ? "opacity-100 translate-y-5 visible"
            : "opacity-0 -translate-y-full invisible"
        } lg:opacity-100 lg:translate-y-0 lg:visible`}
      >
        <ul className="flex flex-col p-3 lg:max-w-7xl lg:flex-row lg:items-center lg:p-0">
          {renderLinks}
        </ul>
      </div>

      {/* Overlay */}
      {openMenu && (
        <div
          className="fixed inset-0 z-10 opacity-0 bg-black/50 lg:hidden animate-fadeIn"
          onClick={closeDropdown}
        ></div>
      )}
    </nav>
  );
}
export default Navbar;
