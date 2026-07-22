import {
  MdMenu,
  MdLightbulbOutline,
  MdRefresh,
  MdSettings,
  MdApps,
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";

function Header({ searchTerm, setSearchTerm}){
  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn">
          <MdMenu />
        </button>

        <div className="logo">
          <MdLightbulbOutline className="logo-icon" />
          <span>Keep</span>
        </div>
      </div>

      <div className="search-bar">
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="header-right">
        <button className="icon-btn">
          <MdRefresh />
        </button>

        <button className="icon-btn">
          <MdSettings />
        </button>

        <button className="icon-btn">
          <MdApps />
        </button>

        <div className="profile">M</div>
      </div>
    </header>
  );
}

export default Header;