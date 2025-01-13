// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";
// // //
// // // const BusBooking = () => {
// // //   const navigate = useNavigate();
// // //
// // //   const handleSearch = () => {
// // //     navigate("/BusSearch");
// // //   };
// // //
// // //   return (
// // //     <div className="container mt-4">
// // //       <div className="card">
// // //         <div className="card-header">
// // //           <h1> This is Ground User Homepage</h1>
// // //           <h3 className="card-title">Bus Booking Form</h3>
// // //         </div>
// // //         <div className="card-body">
// // //           <div className="row align-items-end">
// // //             {/* Source */}
// // //             <div className="col-md-2">
// // //               <label htmlFor="source" className="form-label">
// // //                 Source
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="source"
// // //                 className="form-control"
// // //                 placeholder="Enter Source"
// // //               />
// // //             </div>
// // //
// // //             {/* Destination */}
// // //             <div className="col-md-2">
// // //               <label htmlFor="destination" className="form-label">
// // //                 Destination
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="destination"
// // //                 className="form-control"
// // //                 placeholder="Enter Destination"
// // //               />
// // //             </div>
// // //
// // //             {/* Date From */}
// // //             <div className="col-md-2">
// // //               <label htmlFor="dateFrom" className="form-label">
// // //                 Date From
// // //               </label>
// // //               <input type="date" id="dateFrom" className="form-control" />
// // //             </div>
// // //
// // //             {/* Date To */}
// // //             <div className="col-md-2">
// // //               <label htmlFor="dateTo" className="form-label">
// // //                 Date To
// // //               </label>
// // //               <input type="date" id="dateTo" className="form-control" />
// // //             </div>
// // //
// // //             {/* Number of Travelers */}
// // //             <div className="col-md-2">
// // //               <label htmlFor="numTravelers" className="form-label">
// // //                 Travelers
// // //               </label>
// // //               <input
// // //                 type="number"
// // //                 id="numTravelers"
// // //                 className="form-control"
// // //                 placeholder="Travelers"
// // //               />
// // //             </div>
// // //
// // //             {/* Bus Type */}
// // //             <div className="col-md-2">
// // //               <label htmlFor="busType" className="form-label">
// // //                 Bus Type
// // //               </label>
// // //               <select id="busType" className="form-select">
// // //                 <option value="standard">Standard</option>
// // //                 <option value="luxury">Luxury</option>
// // //                 <option value="express">Express</option>
// // //               </select>
// // //             </div>
// // //
// // //             {/* Search Button */}
// // //             <div className="col-md-12 mt-12 d-flex justify-content-end">
// // //               <button
// // //                 className="btn btn-primary"
// // //                 onClick={() => navigate("/Ground/Search")}
// // //               >
// // //                 Search
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //
// // //         {/* Offers */}
// // //         <div className="card mt-4">
// // //           <h1> Special Discounts for You</h1>
// // //           <div className="row">
// // //             {/* First Card */}
// // //             <div className="col-md-4 mb-4">
// // //               <div
// // //                 className="bg-light-danger px-6 py-8 rounded-2 me-7"
// // //                 style={{ width: "200px" }}
// // //               >
// // //                 <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
// // //                   <span className="path1"></span>
// // //                   <span className="path2"></span>
// // //                 </i>
// // //                 <a href="#" className="text-danger fw-semibold fs-6 mt-2">
// // //                   10% off on Bus Booking
// // //                 </a>
// // //               </div>
// // //             </div>
// // //
// // //             {/* Second Card */}
// // //             <div className="col-md-4 mb-4">
// // //               <div
// // //                 className="bg-light-danger px-6 py-8 rounded-2 me-7"
// // //                 style={{ width: "200px" }}
// // //               >
// // //                 <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
// // //                   <span className="path1"></span>
// // //                   <span className="path2"></span>
// // //                 </i>
// // //                 <a href="#" className="text-danger fw-semibold fs-6 mt-2">
// // //                   15% off for Early Bookings
// // //                 </a>
// // //               </div>
// // //             </div>
// // //
// // //             {/* Third Card */}
// // //             <div className="col-md-4 mb-4">
// // //               <div
// // //                 className="bg-light-danger px-6 py-8 rounded-2 me-7"
// // //                 style={{ width: "200px" }}
// // //               >
// // //                 <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
// // //                   <span className="path1"></span>
// // //                   <span className="path2"></span>
// // //                 </i>
// // //                 <a href="#" className="text-danger fw-semibold fs-6 mt-2">
// // //                   20% off on Round Trips
// // //                 </a>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };
// // //
// // // export default BusBooking;
// //
// //
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// //
// // const BusBooking = () => {
// //   const navigate = useNavigate();
// //
// //   const [source, setSource] = useState("");
// //   const [destination, setDestination] = useState("");
// //   const [dateFrom, setDateFrom] = useState("");
// //   const [dateTo, setDateTo] = useState("");
// //   const [numTravelers, setNumTravelers] = useState(1);
// //   const [busType, setBusType] = useState("standard");
// //   const [passengers, setPassengers] = useState([{ name: "", age: 0, gender: "" }]);
// //
// //   const handleTravelerChange = (index: number, field: string, value: string | number) => {
// //     const updatedPassengers = [...passengers];
// //     updatedPassengers[index][field] = value;
// //     setPassengers(updatedPassengers);
// //   };
// //
// //   const handleAddTraveler = () => {
// //     setPassengers([...passengers, { name: "", age: 0, gender: "" }]);
// //   };
// //
// //   const handleRemoveTraveler = (index: number) => {
// //     const updatedPassengers = passengers.filter((_, i) => i !== index);
// //     setPassengers(updatedPassengers);
// //   };
// //
// //   const handleBooking = async () => {
// //     const bookingData = {
// //       source,
// //       destination,
// //       vehicleType: busType,
// //       date: dateFrom,
// //       passengers,
// //     };
// //
// //     console.log("Booking Data:", bookingData);
// //     try {
// //       const response = await axios.post("http://localhost:8080/booking/add", bookingData);
// //       if (response.status === 200) {
// //         alert("Booking successful!");
// //         navigate("/BookingConfirmation"); // Navigate to booking confirmation page
// //       }
// //     } catch (error) {
// //       console.error("Error during booking:", error);
// //       alert("Error during booking. Please try again.");
// //     }
// //   };
// //
// //   return (
// //     <div className="container mt-4">
// //       <div className="card">
// //         <div className="card-header">
// //           <h1> This is Ground User Homepage</h1>
// //           <h3 className="card-title">Bus Booking Form</h3>
// //         </div>
// //         <div className="card-body">
// //           <div className="row align-items-end">
// //             {/* Source */}
// //             <div className="col-md-2">
// //               <label htmlFor="source" className="form-label">
// //                 Source
// //               </label>
// //               <input
// //                 type="text"
// //                 id="source"
// //                 className="form-control"
// //                 value={source}
// //                 onChange={(e) => setSource(e.target.value)}
// //                 placeholder="Enter Source"
// //               />
// //             </div>
// //
// //             {/* Destination */}
// //             <div className="col-md-2">
// //               <label htmlFor="destination" className="form-label">
// //                 Destination
// //               </label>
// //               <input
// //                 type="text"
// //                 id="destination"
// //                 className="form-control"
// //                 value={destination}
// //                 onChange={(e) => setDestination(e.target.value)}
// //                 placeholder="Enter Destination"
// //               />
// //             </div>
// //
// //             {/* Date From */}
// //             <div className="col-md-2">
// //               <label htmlFor="dateFrom" className="form-label">
// //                 Date From
// //               </label>
// //               <input
// //                 type="date"
// //                 id="dateFrom"
// //                 className="form-control"
// //                 value={dateFrom}
// //                 onChange={(e) => setDateFrom(e.target.value)}
// //               />
// //             </div>
// //
// //             {/* Date To */}
// //             <div className="col-md-2">
// //               <label htmlFor="dateTo" className="form-label">
// //                 Date To
// //               </label>
// //               <input
// //                 type="date"
// //                 id="dateTo"
// //                 className="form-control"
// //                 value={dateTo}
// //                 onChange={(e) => setDateTo(e.target.value)}
// //               />
// //             </div>
// //
// //             {/* Number of Travelers */}
// //             <div className="col-md-2">
// //               <label htmlFor="numTravelers" className="form-label">
// //                 Travelers
// //               </label>
// //               <input
// //                 type="number"
// //                 id="numTravelers"
// //                 className="form-control"
// //                 value={numTravelers}
// //                 onChange={(e) => setNumTravelers(Number(e.target.value))}
// //                 placeholder="Travelers"
// //               />
// //             </div>
// //
// //             {/* Bus Type */}
// //             <div className="col-md-2">
// //               <label htmlFor="busType" className="form-label">
// //                 Bus Type
// //               </label>
// //               <select
// //                 id="busType"
// //                 className="form-select"
// //                 value={busType}
// //                 onChange={(e) => setBusType(e.target.value)}
// //               >
// //                 <option value="standard">Standard</option>
// //                 <option value="luxury">Luxury</option>
// //                 <option value="express">Express</option>
// //               </select>
// //             </div>
// //           </div>
// //
// //           {/* Traveler Details */}
// //           <div className="mt-4">
// //             <h4>Traveler Details</h4>
// //             {passengers.map((passenger, index) => (
// //               <div key={index} className="row mb-2">
// //                 <div className="col-md-3">
// //                   <input
// //                     type="text"
// //                     className="form-control"
// //                     placeholder="Name"
// //                     value={passenger.name}
// //                     onChange={(e) => handleTravelerChange(index, "name", e.target.value)}
// //                   />
// //                 </div>
// //                 <div className="col-md-2">
// //                   <input
// //                     type="number"
// //                     className="form-control"
// //                     placeholder="Age"
// //                     value={passenger.age}
// //                     onChange={(e) => handleTravelerChange(index, "age", Number(e.target.value))}
// //                   />
// //                 </div>
// //                 <div className="col-md-2">
// //                   <select
// //                     className="form-select"
// //                     value={passenger.gender}
// //                     onChange={(e) => handleTravelerChange(index, "gender", e.target.value)}
// //                   >
// //                     <option value="">Gender</option>
// //                     <option value="male">Male</option>
// //                     <option value="female">Female</option>
// //                     <option value="other">Other</option>
// //                   </select>
// //                 </div>
// //                 <div className="col-md-2">
// //                   <button
// //                     type="button"
// //                     className="btn btn-danger"
// //                     onClick={() => handleRemoveTraveler(index)}
// //                   >
// //                     Remove
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //             <button type="button" className="btn btn-success" onClick={handleAddTraveler}>
// //               Add Traveler
// //             </button>
// //           </div>
// //         </div>
// //
// //         {/* Submit Button */}
// //         <div className="card-footer text-center mt-4">
// //           <button className="btn btn-primary" onClick={handleBooking}>
// //             Book Now
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// //
// // export default BusBooking;
//
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
//
// const BusBooking = () => {
//   const navigate = useNavigate();
//   const [sources, setSources] = useState([]);
//   const [destinations, setDestinations] = useState([]);
//   const [bookingDetails, setBookingDetails] = useState({
//     source: "",
//     destination: "",
//     vehicleType: "standard",
//     date: "",
//     passengers: [{ name: "", age: 0, gender: "" }],
//   });
//
//   useEffect(() => {
//     // Fetch sources from backend
//     axios.get("/admin/routes/sources")
//       .then(response => setSources(response.data))
//       .catch(error => console.error("Error fetching sources:", error));
//   }, []);
//
//   useEffect(() => {
//     // Fetch destinations when source is selected
//     if (bookingDetails.source) {
//       axios.get(`/admin/routes/destinations/${bookingDetails.source}`)
//         .then(response => setDestinations(response.data))
//         .catch(error => console.error("Error fetching destinations:", error));
//     }
//   }, [bookingDetails.source]);
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBookingDetails({
//       ...bookingDetails,
//       [name]: value,
//     });
//   };
//
//   const handlePassengerChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedPassengers = [...bookingDetails.passengers];
//     updatedPassengers[index][name] = value;
//     setBookingDetails({ ...bookingDetails, passengers: updatedPassengers });
//   };
//
//   const handleSearch = () => {
//     navigate("/BusSearch");
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//
//     // Validate the route before submitting
//     try {
//       const response = await axios.get("/admin/routes/validate", {
//         params: {
//           source: bookingDetails.source,
//           destination: bookingDetails.destination
//         }
//       });
//       if (response.status === 200) {
//         console.log("Route is valid. Proceeding with booking...");
//         // Proceed with the booking API call
//         const bookingResponse = await axios.post("your-api-endpoint", bookingDetails);
//         console.log("Booking Response:", bookingResponse.data);
//       }
//     } catch (error) {
//       console.error("Invalid route:", error.response?.data || error.message);
//     }
//   };
//
//   return (
//     <div className="container mt-4">
//       <div className="card">
//         <div className="card-header">
//           <h1> This is Ground User Homepage</h1>
//           <h3 className="card-title">Bus Booking Form</h3>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="row align-items-end">
//               {/* Source */}
//               <div className="col-md-2">
//                 <label htmlFor="source" className="form-label">
//                   Source
//                 </label>
//                 <select
//                   name="source"
//                   id="source"
//                   className="form-select"
//                   value={bookingDetails.source}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Source</option>
//                   {sources.map((source, index) => (
//                     <option key={index} value={source}>{source}</option>
//                   ))}
//                 </select>
//               </div>
//
//               {/* Destination */}
//               <div className="col-md-2">
//                 <label htmlFor="destination" className="form-label">
//                   Destination
//                 </label>
//                 <select
//                   name="destination"
//                   id="destination"
//                   className="form-select"
//                   value={bookingDetails.destination}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Destination</option>
//                   {destinations.map((destination, index) => (
//                     <option key={index} value={destination}>{destination}</option>
//                   ))}
//                 </select>
//               </div>
//
//               {/* Date */}
//               <div className="col-md-2">
//                 <label htmlFor="date" className="form-label">
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   name="date"
//                   id="date"
//                   className="form-control"
//                   value={bookingDetails.date}
//                   onChange={handleChange}
//                 />
//               </div>
//
//               {/* Vehicle Type */}
//               <div className="col-md-2">
//                 <label htmlFor="vehicleType" className="form-label">
//                   Vehicle Type
//                 </label>
//                 <select
//                   name="vehicleType"
//                   id="vehicleType"
//                   className="form-select"
//                   value={bookingDetails.vehicleType}
//                   onChange={handleChange}
//                 >
//                   <option value="standard">Standard</option>
//                   <option value="luxury">Luxury</option>
//                   <option value="express">Express</option>
//                 </select>
//               </div>
//             </div>
//
//             {/* Passengers */}
//             {bookingDetails.passengers.map((passenger, index) => (
//               <div key={index} className="row">
//                 <div className="col-md-4">
//                   <label htmlFor={`passengerName-${index}`} className="form-label">
//                     Passenger Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     id={`passengerName-${index}`}
//                     className="form-control"
//                     placeholder="Enter Name"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, e)}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label htmlFor={`passengerAge-${index}`} className="form-label">
//                     Age
//                   </label>
//                   <input
//                     type="number"
//                     name="age"
//                     id={`passengerAge-${index}`}
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, e)}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label htmlFor={`passengerGender-${index}`} className="form-label">
//                     Gender
//                   </label>
//                   <input
//                     type="text"
//                     name="gender"
//                     id={`passengerGender-${index}`}
//                     className="form-control"
//                     placeholder="Enter Gender"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, e)}
//                   />
//                 </div>
//               </div>
//             ))}
//
//             <div className="col-md-12 mt-4">
//               <button type="submit" className="btn btn-primary">
//                 Book Now
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default BusBooking;
//


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Step 1: Define the Route interface
interface Route {
  routeId: number;
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
    navigate(`/passenger-details/${routeId}`);
  };

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
          <ul>
            {availableRoutes.length === 0 && !loading && (
              <p>No routes available.</p>
            )}
            {Array.isArray(availableRoutes) &&
              availableRoutes.map((route) => (
                <li key={route.routeId}>
                  <div>
                    <strong>
                      {route.source} → {route.destination}
                    </strong>
                  </div>
                  <div>
                    <p>Date: {route.date}</p>
                    <p>Vehicle Type: {route.vehicleType}</p>
                    <p>Distance: {route.distance} km</p>
                    <button
                      onClick={() => handleBook(route.routeId)}
                      className="btn btn-success"
                    >
                      Book
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusBooking;
