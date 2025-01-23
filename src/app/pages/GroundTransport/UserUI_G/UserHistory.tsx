import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import axios from "axios";

// Interfaces (unchanged)
interface Passenger {
  name: string;
  age: number;
  gender: string;
}

interface Booking {
  bookingId: number;
  source: string;
  destination: string;
  status: string;
  date: string;
  vehicleName: string;
  vehicleType: string;
  driverName: string;
  driverContact: string;
  passengers: Passenger[];
}

let alretShown = false;
const fetchAllBookings = async (setBookings: React.Dispatch<React.SetStateAction<Booking[]>>) => {
  try {
    const response = await axios.get<Booking[]>("http://localhost:8080/booking/reports?reportType=user-reports", {
      withCredentials: true,
    });
    alretShown = false;
    console.log("Fetched bookings:", response.data);
    setBookings(response.data); // Update the state with the fetched data
  } catch (error:any) {
    if (error.response && error.response.status === 401 && !alretShown) {
      alretShown = true; // Set the flag to prevent multiple alerts
      alert("Session expired. Please sign in again.");
    } else {
      console.error("Error fetching bookings:", error);
    }
  }
};

export const UserHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter((booking) =>
    booking.vehicleName?.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchAllBookings(setBookings);
  }, []);

  return (
    <div className="card shadow-2xl rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="card-header bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 px-6">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Bus Bookings</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Bookings: {filteredBookings.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary bg-light rounded-md px-3 py-2"
            style={{ width: "15rem" }}
            placeholder="Search Bookings"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-4 px-6">
        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered table-sm">
            <thead className="bg-indigo-600 text-white">
              <tr className="fw-bold fs-6">
                <th>Booking ID</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Date</th>
                <th>Vehicle Type</th>
                <th>Vehicle Name</th>
                <th>Driver Name</th>
                <th>Driver Contact</th>
                <th>Passenger Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredBookings
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((booking) => (
                  <tr key={booking.bookingId} className="hover:bg-indigo-100 transition duration-300 shadow-lg rounded-md">
                    <td>{booking.bookingId}</td>
                    <td>{booking.source}</td>
                    <td>{booking.destination}</td>
                    <td>
                      <span
                        className={`badge ${
                          booking.status === "Confirmed"
                            ? "bg-green-500"
                            : booking.status === "Pending"
                            ? "bg-red-400"
                            : booking.status === "Completed"
                            ? "bg-green-1800" // Stronger Green for "Completed"
                            : "bg-gray-500"
                        } text-white px-3 py-1 rounded-full`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>{booking.date}</td>
                    <td>{booking.vehicleType}</td>
                    <td>{booking.vehicleName}</td>
                    <td>{booking.driverName}</td>
                    <td>{booking.driverContact}</td>
                    <td>
                      <ul className="list-unstyled text-sm">
                        {booking.passengers.map((passenger, index) => (
                          <li key={index} className="mb-2">
                            <strong>Name:</strong> {passenger.name} <br />
                            <strong>Age:</strong> {passenger.age} <br />
                            <strong>Gender:</strong> {passenger.gender}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer d-flex justify-content-between px-6 py-3 bg-indigo-50">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredBookings.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>
    </div>
  );
};
