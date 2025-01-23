import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const Receipt: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [url,setUrl]=useState<string>("");

  const { bookingId, paymentId, fare, paymentMethod } = location.state as {
    bookingId: number;
    paymentId: number;
    fare: number;
    paymentMethod: string;
  };

  const getDetails = async () => {
    try {
      const bookingResponse = await axios.get(`${API_URL}/booking/get/${bookingId}`);
      const paymentResponse = await axios.get(`${API_URL}/payment/${paymentId}`);

      if (!bookingResponse.data || !paymentResponse.data) {
        throw new Error("Failed to fetch booking or payment details.");
      }

      console.log("booking response is: ", bookingResponse.data);
      console.log("payment response is: ", paymentResponse.data);

      const storedPassengers = localStorage.getItem("passengerDetails");

// Parse the JSON string back into an array of objects
const passengersArray = storedPassengers ? JSON.parse(storedPassengers) : [];


      const payload = {
        booking: {
          bookingId: bookingResponse.data.bookingId,
          source: bookingResponse.data.source,
          destination: bookingResponse.data.destination,
          status: bookingResponse.data.status,
          date: bookingResponse.data.date,
          vehicleName: bookingResponse.data.vehicleName,
          vehicleType: bookingResponse.data.vehicleType,
          driverName: bookingResponse.data.vehicle.driver.name,
          driverContact: bookingResponse.data.vehicle.driver.contactNo,
          passengers: passengersArray
        },
        payment: {
          id: paymentResponse.data.id,
          stripePaymentId: paymentResponse.data.stripePaymentId,
          paymentMethod: paymentResponse.data.paymentMethod,
          paymentStatus: paymentResponse.data.paymentStatus,
          amount: paymentResponse.data.amount,
          bookingId: paymentResponse.data.bookingId,
          timestamp: paymentResponse.data.timestamp,
          transactionId: paymentResponse.data.transactionId,
          currency: paymentResponse.data.currency,
          clientSecret: paymentResponse.data.clientSecret,
        },
      };

      console.log(payload);

      const response = await axios.post(`${API_URL}/api/invoice/generate`, payload);
      if (response.data) {
        console.log("PDF Response is:", response.data);
        console.log("PDF url is: ",response.data.url)
        setUrl(response.data.url)
        window.open(response.data, '_blank'); // Open the PDF URL in a new tab
      } else {
        throw new Error("Failed to generate receipt.");
      }
    } catch (error) {
      console.error("Error in fetching or generating receipt:", error);
    }

  };

  const handleCancel = () => {
    navigate("/BookingHistory"); // Redirect to booking history without downloading invoice
  };

  useEffect(() => {
    if (paymentId && bookingId) {
      getDetails();
    }
  }, [paymentId, bookingId]);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Receipt</h3>
        </div>
        <div className="card-body">
          <h5>Payment Details:</h5>
          <p>
            <strong>Booking ID:</strong> {bookingId} <br />
            <strong>Payment ID:</strong> {paymentId} <br />
            <strong>Fare:</strong> ₹{fare} <br />
            <strong>Payment Method:</strong> {paymentMethod}
          </p>

          {/* <h5>Passenger Details:</h5>
          {passengers.map((passenger, index) => (
            <div key={index}>
              <p>
                <strong>Passenger {index + 1}:</strong> {passenger.name}, Age: {passenger.age}, Gender: {passenger.gender}
              </p>
            </div>
          ))} */}

          <div className="d-flex justify-content-between">
            <a href={url}>
            <button className="btn btn-success">
              Download Receipt
            </button>
            </a>
            <button onClick={handleCancel} className="btn btn-danger">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
