import React, { useState, useEffect } from "react";
import axios from "axios";
import EditCredentials from "./EditCredentials";

interface User {
  id: number;
  username: string;
  email: string;
}

export const EditCredentialsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get<User>("http://localhost:8080/user/get_user", {
          withCredentials: true,
        });
        // Assume password is not fetched from the backend

      } catch (error) {
        console.error("Error fetching user details:", error);
        setUser(null); // Handle error gracefully
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleUpdate = (username: string, password: string) => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, username, password } : null
    );
  };

  return (
    <div className="card">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">My Credentials</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Manage your credentials
          </span>
        </h3>
      </div>
      <div className="card-body py-3">
        {user ? (
          <div>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button
              className="btn btn-light-primary btn-sm"
              onClick={handleEditClick}
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
