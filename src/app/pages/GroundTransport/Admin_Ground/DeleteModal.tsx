import React from "react";

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  itemName: string; // Name of the item to delete (optional)
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, onClose, onDelete, itemName }) => {
  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Confirm Deletion</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete{" "}
              <strong>{itemName || "this entry"}</strong>? This action cannot be undone.
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
