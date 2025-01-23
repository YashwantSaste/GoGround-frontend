import React, { useState } from "react";

// Driver Interface
interface Driver {
  name: string;
  contactNo: string;
  status: string;
}

// Props for AddDriver Component
interface AddDriverProps {
  onClose: () => void;
  onAdd: (driver: Driver) => void;
}

const AddDriver: React.FC<AddDriverProps> = ({ onClose, onAdd }) => {
  const [newDriver, setNewDriver] = useState<Driver>({
    name: "",
    contactNo: "",
    status: "Active", // Default status
  });

  const [errors, setErrors] = useState<{ name?: string; contactNo?: string }>({});

  // Input Change Handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewDriver({ ...newDriver, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors on change
  };

  // Form Submission Handler
  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const newErrors: { name?: string; contactNo?: string } = {};
    if (!newDriver.name.trim()) newErrors.name = "Name is required.";
    if (!newDriver.contactNo.trim() || !/^\d+$/.test(newDriver.contactNo)) {
      newErrors.contactNo = "Valid contact number is required.";
    } else if (newDriver.contactNo.length < 10) {
      newErrors.contactNo = "Contact number must be at least 10 digits.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Pass the new driver to the parent component
    onAdd(newDriver);
    onClose(); // Close the modal
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      aria-labelledby="addDriverModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addDriverModal">Add New Driver</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddDriver}>
              {/* Name Field */}
              <div className="mb-3">
                <label htmlFor="driverName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="driverName"
                  name="name"
                  value={newDriver.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* Contact Number Field */}
              <div className="mb-3">
                <label htmlFor="contactNo" className="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.contactNo ? "is-invalid" : ""
                  }`}
                  id="contactNo"
                  name="contactNo"
                  value={newDriver.contactNo}
                  onChange={handleInputChange}
                  required
                />
                {errors.contactNo && (
                  <div className="invalid-feedback">{errors.contactNo}</div>
                )}
              </div>

              {/* Status Field */}
              <div className="mb-3">
                <label htmlFor="driverStatus" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="driverStatus"
                  name="status"
                  value={newDriver.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                Add Driver
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDriver;
