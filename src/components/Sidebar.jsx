import {
  MdLightbulbOutline,
  MdNotificationsNone,
  MdEdit,
  MdArchive,
  MdDeleteOutline,
} from "react-icons/md";

const PAGES = [
  { id: "notes", label: "Notes", icon: MdLightbulbOutline },
  { id: "reminders", label: "Reminders", icon: MdNotificationsNone },
  { id: "labels", label: "Edit labels", icon: MdEdit },
  { id: "archive", label: "Archive", icon: MdArchive },
  { id: "trash", label: "Bin", icon: MdDeleteOutline },
];

function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="sidebar">
      {PAGES.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`sidebar-item${currentPage === id ? " active" : ""}`}
          onClick={() => setCurrentPage(id)}
          type="button"
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;
