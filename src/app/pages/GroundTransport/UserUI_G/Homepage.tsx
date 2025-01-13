import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Step 1: Define the Route interface
interface Route {
  id: number;
  source: string;
  destination: string;
  distance: number;
  date: string;
  vehicleType: string;
}

const BusBooking = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [availableRoutes, setAvailableRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const response = await axios.post(
        "http://localhost:8080/user/search_routes",
          { source, destination, vehicleType, date },
          { withCredentials: true ,
            headers: {
    'X-Requested-With': 'XMLHttpRequest'
          }},

      );

      console.log(response.data); // Debug API response

      // Ensure the data is an array before setting it to state
      if (Array.isArray(response.data)) {
        setAvailableRoutes(response.data);
      } else {
        setAvailableRoutes([]); // Fallback if response data isn't an array
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
      alert("Failed to fetch available routes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (routeId: number) => {
    const selectedRoute = availableRoutes.find(route => route.id === routeId);
    if (selectedRoute) {
      // Pass state containing route details to PassengerDetails
      navigate(`/passenger-details/${routeId}`, {
        state: {
          source: selectedRoute.source,
          destination: selectedRoute.destination,
          date: date,
          vehicleType: vehicleType,
        },
      });
    }
  };
  

  useEffect(() => {
    // Dummy data for testing purposes
    
  }, []);


  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Bus Booking Form</h3>
        </div>
        <div className="card-body">
          <div className="row align-items-end">
            <div className="col-md-3">
              <label htmlFor="source" className="form-label">
                Source
              </label>
              <input
                type="text"
                id="source"
                className="form-control"
                placeholder="Enter Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                className="form-control"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="vehicleType" className="form-label">
                Vehicle Type
              </label>
              <select
                id="vehicleType"
                className="form-select"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="bus">Bus</option>
                <option value="cab">Cab</option>
              </select>
            </div>

            <div className="col-md-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3 d-flex justify-content-end">
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      <div className="card mt-4">
      <div className="card-body">
        <h2>Available Routes</h2>
        {loading && <p>Loading routes...</p>}
        {availableRoutes.length === 0 && !loading && (
          <p>No routes available.</p>
        )}
      {availableRoutes.length > 0 && (
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Source</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Vehicle Type</th>
            <th>Distance (km)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {availableRoutes.map((route) => (
            <tr key={route.id}>
              <td>{route.source}</td>
              <td>{route.destination}</td>
              <td>{date}</td>
              <td>{vehicleType}</td>
              <td>{route.distance}</td>
              <td>
                <button
                  onClick={() => handleBook(route.id)}
                  className="btn btn-success btn-sm"
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
      </div>

    </div>
  );
};

export default BusBooking;

