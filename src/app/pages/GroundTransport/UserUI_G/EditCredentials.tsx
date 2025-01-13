import React, { useState } from "react";

interface EditCredentialsProps {
  onClose: () => void;
  onUpdate: (username: string, password: string) => void;
  user: { username: string; password: string };
}

const EditCredentials: React.FC<EditCredentialsProps> = ({ onClose, onUpdate, user }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);

  const handleSubmit = () => {
    onUpdate(username, password);
    onClose(); // Close the modal after the update
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Edit Credentials</h4>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditCredentials;
