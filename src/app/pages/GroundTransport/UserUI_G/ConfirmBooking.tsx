import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Define the structure for passenger details and booking details
interface PassengerDetailsFormData {
  name: string;
  age: number;
  gender: string;
}

interface BookingDetails {
  routeId: number;
  formData: {
    source: string;
    destination: string;
    vehicleType: string;
    date: string;
  };
  passengers: PassengerDetailsFormData[];
}

const ConfirmBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the booking details from location.state
  const { bookingDetails } = location.state as { bookingDetails: BookingDetails };

  const { routeId, formData, passengers } = bookingDetails;

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Redirect to home if booking details are missing
    if (!bookingDetails) {
      alert("Booking details are missing. Please try again.");
      navigate("/Ground/homepage");
    }
  }, [bookingDetails, navigate]);

  // Handle booking confirmation and redirect to payment
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      source: formData.source,
      destination: formData.destination,
      vehicleType: formData.vehicleType,
      date: formData.date,
      passengers: passengers.map((passenger) => ({
        name: passenger.name,
        age: passenger.age,
        gender: passenger.gender,
      })),
    };

    try {
      // Make the POST request to confirm the booking
      const response = await axios.post("http://localhost:8080/booking/add", bookingData);

      if (response.status === 200 && response.data.bookingId) {
        const bookingId = response.data.bookingId; // Extract bookingId from the response
        alert("Booking details has been submitted successfully!. Please make payment to confirm your booking");

        console.log("Booking details: ",response.data)
        // Navigate to payment page and pass booking details along with bookingId
        navigate("/payment-details", {
          state: { bookingDetails, bookingId },
        });
      } else {
        alert("Booking confirmed but booking ID is missing in the response.");
      }
    } catch (error) {
      alert("Booking failed. Please try again.");
      console.error("Error confirming booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div
        className="card"
        style={{
          boxShadow: "0 8px 16px rgba(0, 123, 255, 0.3)",
          transition: "all 0.3s ease",
          borderRadius: "10px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 123, 255, 0.4)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 123, 255, 0.3)")}
      >
        <div className="card-header" style={{ backgroundColor: "#f7f7f7", borderRadius: "10px 10px 0 0" }}>
          <h3 className="card-title" style={{ fontWeight: "bold", fontSize: "24px" }}>
            Confirm Booking
          </h3>
        </div>
        <div className="card-body" style={{ backgroundColor: "#ffffff", borderRadius: "0 0 10px 10px" }}>
          <form onSubmit={handleBookingSubmit}>
            {/* Display route details in table */}
            <div className="mb-3">
              <h5>Route Details</h5>
              <table className="table table-striped" style={{ borderRadius: "8px" }}>
                <tbody>
                  <tr>
                    <td><strong>Source:</strong></td>
                    <td>{formData.source}</td>
                  </tr>
                  <tr>
                    <td><strong>Destination:</strong></td>
                    <td>{formData.destination}</td>
                  </tr>
                  <tr>
                    <td><strong>Vehicle Type:</strong></td>
                    <td>{formData.vehicleType}</td>
                  </tr>
                  <tr>
                    <td><strong>Travel Date:</strong></td>
                    <td>{formData.date}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Display passenger details in table */}
            <div className="mb-3">
              <h5>Passenger Details</h5>
              <table className="table table-striped" style={{ borderRadius: "8px" }}>
                <thead>
                  <tr>
                    <th>Passenger</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {passengers.map((passenger, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{passenger.name}</td>
                      <td>{passenger.age}</td>
                      <td>{passenger.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit button */}
            <div className="d-flex justify-content-between mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#007bff",
                  border: "none",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
              >
                {loading ? "Processing Booking..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
