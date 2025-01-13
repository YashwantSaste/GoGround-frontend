import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

// Interface for Passenger
interface Passenger {
  id: number;
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

const PassengerDetails = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [newPassenger, setNewPassenger] = useState<Passenger>({
    id: Date.now(),
    name: '',
    age: 0,
    gender: '',
  });

  const navigate = useNavigate();

  // Access location state passed from navigate
  const location = useLocation();
  const { routeId } = useParams();

  // Destructure state values from location
  const { source, destination, date, vehicleType } = location.state as RouteDetails;

  // Log the route details on component mount
  useEffect(() => {
    console.log('Route Details:', { source, destination, date, vehicleType });
  }, [source, destination, date, vehicleType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPassenger((prev) => ({ ...prev, [name]: name === 'age' ? +value : value }));
  };

  const addPassenger = () => {
    if (newPassenger.name && newPassenger.age > 0 && newPassenger.gender) {
      setPassengers([...passengers, { ...newPassenger, id: Date.now() }]);
      setNewPassenger({ id: Date.now(), name: '', age: 0, gender: '' });
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  const removePassenger = (id: number) => {
    setPassengers(passengers.filter((p) => p.id !== id));
  };

  const editPassenger = (id: number, key: string, value: string | number) => {
    setPassengers(
      passengers.map((p) =>
        p.id === id ? { ...p, [key]: key === 'age' ? +value : value } : p
      )
    );
  };

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: isDarkMode ? '#333' : '#ffffff',
    color: isDarkMode ? '#f4f4f4' : '#333',
    border: `1px solid ${isDarkMode ? '#555' : '#cccccc'}`,
  };

  const inputStyle = {
    flex: '1',
    padding: '8px',
    border: `1px solid ${isDarkMode ? '#555' : '#cccccc'}`,
    borderRadius: '4px',
    backgroundColor: isDarkMode ? '#444' : '#f4f4f4',
    color: isDarkMode ? '#f4f4f4' : '#333',
  };

  const buttonStyle = {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDarkMode ? '#007bff' : '#007bff',
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDarkMode ? '#dc3545' : '#dc3545',
  };

  const toggleButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDarkMode ? '#555' : '#cccccc',
    marginBottom: '20px',
  };

  // Function to handle submission and redirect to the Payment page
  const handleSubmit = () => {
    console.log('Navigating with data:', {
 
      passengers,
      source,
      destination,
      date,
      vehicleType,
    });
  
    navigate('/Ground/payment', {
      state: {
        passengers,
        source,
        destination,
        date,
        vehicleType,
      },
    });
  };
  

  return (
    <div>
      <p>This is the passenger details page</p>
      <h1>The route ID is: {routeId}</h1>
      <h2>
        Source: {source} | Destination: {destination} | Date: {date} | Vehicle Type: {vehicleType}
      </h2>
      <div style={containerStyle}>
        <button onClick={toggleMode} style={toggleButtonStyle}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Passengers</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <input
            type="text"
            name="name"
            placeholder="Passenger Name"
            value={newPassenger.name}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newPassenger.age || ''}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <select
            name="gender"
            value={newPassenger.gender}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button onClick={addPassenger} style={primaryButtonStyle}>
            Add Passenger
          </button>
        </div>
        <div>
          {passengers.length > 0 ? (
            passengers.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '4px',
                  backgroundColor: isDarkMode ? '#444' : '#f9f9f9',
                  color: isDarkMode ? '#f4f4f4' : '#333',
                }}
              >
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => editPassenger(p.id, 'name', e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="number"
                  value={p.age}
                  onChange={(e) => editPassenger(p.id, 'age', +e.target.value)}
                  style={inputStyle}
                />
                <select
                  value={p.gender}
                  onChange={(e) => editPassenger(p.id, 'gender', e.target.value)}
                  style={inputStyle}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <button onClick={() => removePassenger(p.id)} style={dangerButtonStyle}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: isDarkMode ? '#aaa' : 'gray' }}>
              No passengers added yet.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={handleSubmit} style={primaryButtonStyle}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
