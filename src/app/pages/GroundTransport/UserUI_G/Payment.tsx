import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// Interface for Passenger
interface Passenger {
  name: string;
  age: number;
  gender: string;
}

// Interface for Route details that will be passed from the BusBooking component
interface RouteDetails {
  source: string;
  destination: string;
  date: string;
  vehicleType: string;
}

const Payment = () => {
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);  // Track submission state

  // Destructure state values from location
  const { passengers, source, destination, date, vehicleType } = location.state as {
    passengers: Passenger[];
    source: string;
    destination: string;
    date: string;
    vehicleType: string;
  };

  useEffect(() => {
    // Log all the passed data to the console
    console.log('Passengers:', passengers);
    console.log('Route Details:', {
      source,
      destination,
      date,
      vehicleType,
    });
  }, [passengers, source, destination, date, vehicleType]);

  // Function to handle the submission to the backend
  const handlePayment = async () => {
    try {
        setIsProcessing(true);

        const bookingData = {
            passengers,
            source,
            destination,
            date,
            vehicleType,
        };

        console.log(bookingData);

        const response = await axios.post('http://localhost:8080/booking/add', bookingData, {
            headers: {
                'Content-Type': 'application/json', // Ensure the backend expects JSON
            }
        });

        if (response.status === 200) {
            console.log('Booking successful:', response.data);
            alert('Booking successful!');
        } else {
            alert('Something went wrong! Please try again later.');
        }
    } catch (error) {
        console.error('Error submitting booking:', error);
        alert('Error submitting booking. Please try again.');
    } finally {
        setIsProcessing(false);
    }
};


  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Payment Page</h1>
      <h2>Route Details</h2>
      <p><strong>Source:</strong> {source}</p>
      <p><strong>Destination:</strong> {destination}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Vehicle Type:</strong> {vehicleType}</p>

      <h2>Passenger Details</h2>
      {passengers.length > 0 ? (
        passengers.map((passenger, index) => (
          <div key={index}>
            <p><strong>Name:</strong> {passenger.name}</p>
            <p><strong>Age:</strong> {passenger.age}</p>
            <p><strong>Gender:</strong> {passenger.gender}</p>
          </div>
        ))
      ) : (
        <p>No passengers added.</p>
      )}

      {/* Button to submit data to backend */}
      <button
        onClick={handlePayment}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={isProcessing}  // Disable button while processing
      >
        {isProcessing ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </div>
  );
};

export default Payment;
