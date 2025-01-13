import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

const PaymentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the passed booking details and bookingId from location.state
  const { bookingDetails, bookingId } = location.state as {
    bookingDetails: BookingDetails;
    bookingId: number;
  };

  const { formData, passengers } = bookingDetails;

  const [fare, setFare] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // Track selected payment method

  // Fetch fare on component mount
  useEffect(() => {
    const fetchFare = async () => {
      console.log("Fetching fare for booking details:", bookingDetails);
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post("http://localhost:8080/payment/getFare", {
          source: formData.source,
          destination: formData.destination,
          vehicleType: formData.vehicleType,
          date: formData.date,
          passengers,
        });

        console.log("Fare fetched successfully:", response.data);
        setFare(response.data); // Store the fare in state
      } catch (err) {
        console.error("Error fetching fare:", err);
        setError("Failed to fetch fare. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFare();
  }, [formData.source, formData.destination, formData.vehicleType, formData.date, passengers]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    console.log("Processing payment with method:", paymentMethod);
    setLoading(true);
    try {
      console.log({
        paymentMethod,
        amount: fare,
        bookingId,
      });

      const response = await axios.post("http://localhost:8080/payment/create", {
        paymentMethod,
        amount: fare,
        bookingId, // Pass the bookingId received earlier
      });

      console.log("Payment response:", response);

      try {
        console.log("Sending booking confirmation mail for booking ID:", bookingId);
        const sendMail = await axios.post(`http://localhost:8080/mail/${bookingId}`);
        console.log("Mail sent successfully:", sendMail);
      } catch (mailError) {
        console.error("Error sending mail:", mailError);
      }

      if (response.status === 200) {
        alert("Payment successful! Your booking is confirmed.");
        navigate("/BookingHistory"); // Redirect to a success page
      }
    } catch (error) {
      console.error("Error making payment:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Payment Details</h3>
        </div>
        <div className="card-body">
          <h5>Route Details:</h5>
          <p>
            <strong>Source:</strong> {formData.source} <br />
            <strong>Destination:</strong> {formData.destination} <br />
            <strong>Vehicle Type:</strong> {formData.vehicleType} <br />
            <strong>Travel Date:</strong> {formData.date}
          </p>

          <h5>Passenger Details:</h5>
          {passengers.map((passenger, index) => (
            <div key={index}>
              <p>
                <strong>Passenger {index + 1}:</strong> {passenger.name}, Age: {passenger.age}, Gender: {passenger.gender}
              </p>
            </div>
          ))}

          <h5>
            {loading ? (
              <span>Loading fare...</span>
            ) : error ? (
              <span className="text-danger">{error}</span>
            ) : fare !== null ? (
              <span>
                <strong>Fare: </strong> ₹{fare}
              </span>
            ) : (
              <span>Calculating fare...</span>
            )}
          </h5>

          <h5>Select Payment Method:</h5>
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="upi"
                value="UPI"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="upi">
                UPI
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="creditCard"
                value="Credit Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="creditCard">
                Credit/Debit Card
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="netBanking"
                value="Net Banking"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="netBanking">
                Net Banking
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button
              onClick={handlePayment}
              className="btn btn-success"
              disabled={loading || !fare}
            >
              {loading ? "Processing Payment..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
