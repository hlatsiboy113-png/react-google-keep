import {
  MdLightbulbOutline,
  MdNotificationsNone,
  MdEdit,
  MdArchive,
  MdDeleteOutline,
  MdLabelOutline,
} from "react-icons/md";

const BASE_PAGES = [
  { id: "notes", label: "Notes", icon: MdLightbulbOutline },
  { id: "reminders", label: "Reminders", icon: MdNotificationsNone },
];

const BASE_PAGES_BOTTOM = [
  { id: "archive", label: "Archive", icon: MdArchive },
  { id: "trash", label: "Bin", icon: MdDeleteOutline },
];

function Sidebar({ currentPage, setCurrentPage, isOpen, labels, onEditLabels }) {
  return (
    <aside className={`sidebar${isOpen ? " open" : " closed"}`}>
      <div className="sidebar-section">
        {BASE_PAGES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`sidebar-item${currentPage === id ? " active" : ""}`}
            onClick={() => setCurrentPage(id)}
            type="button"
            title={label}
          >
            <Icon />
            <span className="sidebar-label">{label}</span>
          </button>
        ))}
      </div>

      {labels.length > 0 && (
        <div className="sidebar-section labels-section">
          <div className="sidebar-divider" />
          {labels.map((label) => (
            <button
              key={label}
              className={`sidebar-item${currentPage === label ? " active" : ""}`}
              onClick={() => setCurrentPage(label)}
              type="button"
              title={label}
            >
              <MdLabelOutline />
              <span className="sidebar-label">{label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="sidebar-section">
        <div className="sidebar-divider" />
        <button
          className="sidebar-item edit-labels-item"
          onClick={onEditLabels}
          type="button"
          title="Edit labels"
        >
          <MdEdit />
          <span className="sidebar-label">Edit labels</span>
        </button>

        {BASE_PAGES_BOTTOM.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`sidebar-item${currentPage === id ? " active" : ""}`}
            onClick={() => setCurrentPage(id)}
            type="button"
            title={label}
          >
            <Icon />
            <span className="sidebar-label">{label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;