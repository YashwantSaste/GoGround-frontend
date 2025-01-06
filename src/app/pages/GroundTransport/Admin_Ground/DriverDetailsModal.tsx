import React, { useState } from "react";

// Interface for Driver
interface Driver {
  driverId?: number;
  name: string;
  contactNo: string;
  status: string;
}

interface DriverModalProps {
  driver: Driver | null;
  onClose: () => void;
  onSave: (updatedDriver: Driver) => void;
  isEditMode: boolean;
}

const DriverDetailsModal: React.FC<DriverModalProps> = ({
  driver,
  onClose,
  onSave,
  isEditMode,
}) => {
  const [name, setName] = useState(driver?.name || "");
  const [contactNo, setContactNo] = useState(driver?.contactNo || "");
  const [status, setStatus] = useState(driver?.status || "Active");

  const handleSave = () => {
    if (driver) {
      const updatedDriver = {
        ...driver,
        name,
        contactNo,
        status,
      };
      onSave(updatedDriver);
    }
  };

  if (!driver) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <h5>{isEditMode ? "Edit Driver Details" : "Driver Details"}</h5>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditMode} // Disable input in View mode
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Contact Number:</label>
            <input
              type="text"
              className="form-control"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              disabled={!isEditMode} // Disable input in View mode
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Status:</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={!isEditMode} // Disable dropdown in View mode
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          {isEditMode ? (
            <button
              style={{
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleSave}
            >
              Save Changes
            </button>
          ) : (
            <button
              style={{
                padding: "10px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDetailsModal;
