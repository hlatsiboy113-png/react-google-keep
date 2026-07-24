const APPS = [
  { name: "Gmail", color: "#EA4335", initial: "M" },
  { name: "Drive", color: "#FBBC04", initial: "D" },
  { name: "Docs", color: "#4285F4", initial: "D" },
  { name: "Sheets", color: "#34A853", initial: "S" },
  { name: "Slides", color: "#FBBC04", initial: "S" },
  { name: "Meet", color: "#00832D", initial: "M" },
  { name: "Maps", color: "#EA4335", initial: "M" },
  { name: "Photos", color: "#4285F4", initial: "P" },
  { name: "Calendar", color: "#4285F4", initial: "C" },
  { name: "YouTube", color: "#FF0000", initial: "Y" },
];

function GoogleAppsMenu() {
  return (
    <div className="google-apps-menu">
      <div className="apps-grid">
        {APPS.map((app) => (
          <div key={app.name} className="app-item">
            <div
              className="app-icon"
              style={{ backgroundColor: app.color }}
            >
              {app.initial}
            </div>
            <span className="app-name">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoogleAppsMenu;