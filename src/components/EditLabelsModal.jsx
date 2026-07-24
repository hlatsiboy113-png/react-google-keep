import { useState } from "react";
import { MdClose, MdAdd, MdDeleteOutline, MdLabelOutline } from "react-icons/md";

function EditLabelsModal({ labels, onAdd, onDelete, onClose }) {
  const [newLabel, setNewLabel] = useState("");

  function handleAdd() {
    if (newLabel.trim()) {
      onAdd(newLabel.trim());
      setNewLabel("");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleAdd();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit labels</h3>
          <button className="icon-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <div className="modal-body">
          <div className="add-label-row">
            <button className="icon-btn" onClick={handleAdd}>
              <MdAdd />
            </button>
            <input
              type="text"
              placeholder="Create new label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {labels.map((label) => (
            <div key={label} className="label-row">
              <MdLabelOutline className="label-icon" />
              <span className="label-text">{label}</span>
              <button
                className="icon-btn delete-label-btn"
                onClick={() => onDelete(label)}
                title="Delete label"
              >
                <MdDeleteOutline />
              </button>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="save-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditLabelsModal;