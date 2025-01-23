import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Define the structure for passenger details
interface PassengerDetailsFormData {
  name: string;
  age: number;
  gender: string;
}

interface LocationState {
  routeId: number;
  formData: {
    source: string;
    destination: string;
    vehicleType: string;
    date: string;
  };
}

const PassengerDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve routeId and formData (source, destination, etc.) passed through the navigate state
  const { routeId, formData } = location.state as LocationState;
  console.log("Route ID:", routeId);
  console.log("Form Data:", formData);

  // State to hold multiple passengers
  const [passengers, setPassengers] = useState<PassengerDetailsFormData[]>([]);

  // State for loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes for passenger details
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    console.log(`Updating passenger ${index}, field ${name} to value ${value}`);
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [name]: value, // Dynamically update the field name
    };
    setPassengers(updatedPassengers);
  };

  // Add new passenger form
  const addPassenger = () => {
    console.log("Adding new passenger");
    setPassengers([
      ...passengers,
      { name: "", age: 0, gender: "" },
    ]);
  };

  // Remove a passenger form
  const removePassenger = (index: number) => {
    console.log(`Removing passenger at index ${index}`);
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with passengers:", passengers);
    if (passengers.length === 0 || passengers.some(p => !p.name || !p.age || !p.gender)) {
      alert("Please fill in all passenger details.");
      return;
    }

    setLoading(true);
    try {
      // Pass the route, form data, and passengers details to the next page (payment details page)
      navigate("/confirm-booking", {
        state: {
          bookingDetails: {
            routeId,
            formData,
            passengers,
          },
        },
      });
    } catch (error) {
      console.error("Error submitting passenger details:", error);
      alert("Failed to submit passenger details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title" style={{ fontWeight: "bold" }}>
            Passenger Details
          </h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {passengers.map((passenger, index) => (
              <div
                key={index}
                className="passenger-form"
                style={{
                  border: "2px solid #007bff",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 8px 16px rgba(0, 123, 255, 0.3)", // Increased shadow effect
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 123, 255, 0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 123, 255, 0.3)")}
              >
                <h4>Passenger {index + 1}</h4>

                <div className="mb-3">
                  <label
                    htmlFor={`name-${index}`}
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id={`name-${index}`}
                    className="form-control"
                    name="name"
                    value={passenger.name}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                    style={{
                      marginBottom: "15px",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor={`age-${index}`}
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id={`age-${index}`}
                    className="form-control"
                    name="age"
                    value={passenger.age}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                    style={{
                      marginBottom: "15px",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor={`gender-${index}`}
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Gender
                  </label>
                  <select
                    id={`gender-${index}`}
                    className="form-select"
                    name="gender"
                    value={passenger.gender}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                    style={{
                      marginBottom: "15px",
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Remove button for each passenger form */}
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removePassenger(index)}
                    style={{
                      marginTop: "10px",
                      fontSize: "14px",
                      padding: "5px 15px",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e02f2f")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
                  >
                    Remove Passenger {index + 1}
                  </button>
                )}
              </div>
            ))}

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addPassenger}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a6268")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
              >
                Add Passenger
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#007bff",
                  border: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
              >
                {loading ? "Booking..." : "Submit Details"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
