import React, { useState, useEffect } from "react";
import axios from "axios";
import EditCredentials from "./EditCredentials";

interface User {
  username: string;
  email: string;
}

export const EditCredentialsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get<User>("http://localhost:8080/user/get_user", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null); // Graceful error handling
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Handle credential update
  const handleUpdate = async (username: string, password?: string) => {
    try {
      await axios.put(
        "http://localhost:8080/user/update",
        { username, password },
        { withCredentials: true }
      );

      // Update local state to reflect the changes
      setUser((prevUser) => (prevUser ? { ...prevUser, username } : null));
    } catch (error) {
      console.error("Error updating credentials:", error);
    }
  };

  return (
    <div className="card shadow-lg rounded-lg overflow-hidden bg-white bg-opacity-90 max-w-sm mx-auto mt-10">
      <div className="card-header border-0 pt-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white">
        <h3 className="card-title font-bold text-4xl mb-2">My Credentials</h3>
        <span className="text-lg text-gray-800">Manage your credentials</span>
      </div>
      <div className="card-body py-6 px-8">
        {user ? (
          <div>
            <p className="text-xl text-gray-1000 mb-4">
              <strong className="font-semibold text-2xl">Username:</strong> {user.username}
            </p>
            <p className="text-xl text-gray-800 mb-6">
              <strong className="font-semibold text-2xl">Email:</strong> {user.email}
            </p>
            <button
              className="btn btn-light-primary btn-sm px-4 py-2 bg-blue-1200 text-grey"
              onClick={() => setShowEditModal(true)}
            >
              Edit Credentials
            </button>
          </div>
        ) : (
          <p className="text-muted">Unable to fetch user details. Please try again later.</p>
        )}
      </div>

      {showEditModal && user && (
        <EditCredentials
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
          user={user}
        />
      )}
    </div>
  );
};

export default EditCredentialsPage;
