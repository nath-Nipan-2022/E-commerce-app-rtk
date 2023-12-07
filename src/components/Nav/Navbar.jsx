import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../constants";
import { useResponsiveLayout } from "../../hooks";

import { GoChevronDown } from "react-icons/go";
import NavLinksDropdown from "./NavLinksDropdown";

function Navbar({ openMenu, onClose }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const isMobileView = useResponsiveLayout(1024);

  const closeDropdown = () => {
    setOpenDropdown(false);
    onClose();
  };

  const dropdownEventHandlers = () => ({
    onMouseLeave: !isMobileView ? () => setOpenDropdown(false) : undefined,
    onMouseEnter: !isMobileView ? () => setOpenDropdown(true) : undefined,
  });

  const renderLinks = navLinks.map((link) => (
    <li
      key={link.id}
      className="relative text-sm text-gray-600 lg:text-base lg:hover:text-slate-900"
    >
      {!link.hasDropdown ? (
        <Link
          to={link.path}
          className="block p-2 font-medium hover:bg-neutral-100 lg:hover:bg-transparent"
        >
          {link.label}
        </Link>
      ) : (
        <div {...dropdownEventHandlers()}>
          <button
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="flex items-center justify-between gap-2 p-2 font-medium rounded-lg cursor-pointer"
          >
            <span>{link.label}</span>
            <GoChevronDown
              className={`transition duration-300 ${
                openDropdown
                  ? "rotate-180 lg:rotate-0 lg:translate-y-0.5"
                  : "translate-y-0 rotate-0"
              }`}
              aria-hidden="true"
            />
          </button>
          <NavLinksDropdown
            isOpen={openDropdown}
            onItemClick={() => setOpenDropdown(false)}
            className="relative top-0 my-1 lg:pt-4 lg:my-0 lg:absolute lg:top-full"
          />
        </div>
      )}
    </li>
  ));

  return (
    <nav className={`absolute lg:relative h-[56px] flex items-center`}>
      {/* The menu appear on mobile */}
      <div
        className={`nav-dropdown-wrapper ${
          openMenu
            ? "opacity-100 translate-y-5 visible transition duration-300"
            : "opacity-0 -translate-y-full invisible"
        } lg:opacity-100 lg:translate-y-0 lg:visible`}
      >
        <ul className="p-4 lg:max-w-3xl lg:flex lg:items-center lg:p-0">
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
