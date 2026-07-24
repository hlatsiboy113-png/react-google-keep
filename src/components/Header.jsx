import { useState, useRef, useEffect } from "react";
import {
  MdMenu,
  MdRefresh,
  MdSettings,
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import GoogleAppsMenu from "./GoogleAppsMenu";

function Header({ searchTerm, setSearchTerm, onRefresh, onToggleSidebar }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const appsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (appsRef.current && !appsRef.current.contains(e.target)) {
        setAppsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn menu-btn" onClick={onToggleSidebar} title="Main menu">
          <MdMenu />
        </button>

        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24" width="34" height="34" fill="#fbbc04">
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
          </svg>
          <span>Keep</span>
        </div>
      </div>

      <div className={`search-bar${searchFocused ? " focused" : ""}`}>
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        {searchTerm && (
          <button
            className="clear-search"
            onClick={() => setSearchTerm("")}
            type="button"
          >
            <IoMdClose />
          </button>
        )}
      </div>

      <div className="header-right">
        <button className="icon-btn" onClick={onRefresh} title="Refresh">
          <MdRefresh />
        </button>

        <button className="icon-btn" title="Settings">
          <MdSettings />
        </button>

        <div className="apps-wrapper" ref={appsRef}>
          <button
            className="icon-btn apps-btn"
            onClick={() => setAppsOpen(!appsOpen)}
            title="Google apps"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#5f6368">
              <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
          {appsOpen && <GoogleAppsMenu />}
        </div>

        <div className="profile" title="Profile">
          M
        </div>
      </div>
    </header>
  );
}

export default Header;