import {
  MdLightbulbOutline,
  MdNotificationsNone,
  MdEdit,
  MdArchive,
  MdDeleteOutline,
} from "react-icons/md";

function Sidebar() {
  return (
    <aside className="sidebar">
      <button className="sidebar-item active">
        <MdLightbulbOutline />
        <span>Notes</span>
      </button>

      <button className="sidebar-item">
        <MdNotificationsNone />
        <span>Reminders</span>
      </button>

      <button className="sidebar-item">
        <MdEdit />
        <span>Edit labels</span>
      </button>

      <button className="sidebar-item">
        <MdArchive />
        <span>Archive</span>
      </button>

      <button className="sidebar-item">
        <MdDeleteOutline />
        <span>Bin</span>
      </button>
    </aside>
  );
}

export default Sidebar;