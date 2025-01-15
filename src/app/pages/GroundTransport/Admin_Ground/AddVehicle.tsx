import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL

interface Route {
  id: number;
  source: string;
  destination: string;
  distance: string;
}

interface Driver {
  id: number;
  name: string;
  contactNo: string;
  status: string;
}

interface Vehicle {
  name: string;
  type: string;
  status: string;
  pricePerKm: number;
  driverId: number;
  routeId: number;
}

interface AddVehicleProps {
  onClose: () => void;
  onAdd: (vehicle: Vehicle) => void;
}

const AddVehicle: React.FC<AddVehicleProps> = ({ onClose, onAdd }) => {
  const [vehicle, setVehicle] = useState<Vehicle>({
    name: "",
    type: "",
    status: "",
    pricePerKm: 0,
    driverId: 0,
    routeId: 0,
  });
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchDriversAndRoutes = async () => {
      try {
        const [driversRes, routesRes] = await Promise.all([
          axios.get<Driver[]>(`${API_URL}/admin/driver/all`, {
            withCredentials: true,
          }),
          axios.get<Route[]>(`${API_URL}/admin/routes/get`, {
            withCredentials: true,
          }),
        ]);
        setDrivers(driversRes.data);
        setRoutes(routesRes.data);
      } catch (error) {
        console.error("Error fetching drivers or routes:", error);
      }
    };
    fetchDriversAndRoutes();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({
      ...prev,
      [name]: name === "pricePerKm" ? +value : value, // Ensure proper type conversion for pricePerKm
    }));
    setErrors({ ...errors, [name]: "" }); // Clear any validation errors for the field
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!vehicle.name.trim()) newErrors.name = "Vehicle name is required.";
    if (!vehicle.type.trim()) newErrors.type = "Vehicle type is required.";
    if (!vehicle.status.trim()) newErrors.status = "Vehicle status is required.";
    if (vehicle.pricePerKm <= 0)
      newErrors.pricePerKm = "Price per km must be greater than zero.";
    if (!vehicle.driverId) newErrors.driverId = "Please select a driver.";
    if (!vehicle.routeId) newErrors.routeId = "Please select a route.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .post(
        "${API_URL}/admin/vehicle/add",
        vehicle,
        { withCredentials: true }
      )
      .then(() => {
        onAdd(vehicle);
        onClose();
      })
      .catch((error) => {
        console.error("Error adding vehicle:", error);
      });
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      aria-labelledby="addVehicleModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addVehicleModal">
              Add New Vehicle
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddVehicle}>
              <div className="mb-3">
                <label htmlFor="vehicleName" className="form-label">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="vehicleName"
                  name="name"
                  value={vehicle.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.type ? "is-invalid" : ""}`}
                  id="type"
                  name="type"
                  value={vehicle.type}
                  onChange={handleInputChange}
                />
                {errors.type && (
                  <div className="invalid-feedback">{errors.type}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Vehicle Status
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.status ? "is-invalid" : ""}`}
                  id="status"
                  name="status"
                  value={vehicle.status}
                  onChange={handleInputChange}
                />
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="pricePerKm" className="form-label">
                  Price Per Km
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.pricePerKm ? "is-invalid" : ""}`}
                  id="pricePerKm"
                  name="pricePerKm"
                  value={vehicle.pricePerKm}
                  onChange={handleInputChange}
                />
                {errors.pricePerKm && (
                  <div className="invalid-feedback">{errors.pricePerKm}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="driverId" className="form-label">
                  Assign Driver
                </label>
                <select
                  className={`form-select ${errors.driverId ? "is-invalid" : ""}`}
                  id="driverId"
                  name="driverId"
                  value={vehicle.driverId || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select a Driver</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
                {errors.driverId && (
                  <div className="invalid-feedback">{errors.driverId}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="routeId" className="form-label">
                  Assign Route
                </label>
                <select
                  className={`form-select ${errors.routeId ? "is-invalid" : ""}`}
                  id="routeId"
                  name="routeId"
                  value={vehicle.routeId || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select a Route</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.source} → {route.destination} ({route.distance} km)
                    </option>
                  ))}
                </select>
                {errors.routeId && (
                  <div className="invalid-feedback">{errors.routeId}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Add Vehicle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
