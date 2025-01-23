import React from 'react';

function AdminDashboard_G() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <h1
        style={{
          fontSize: '5rem', // Increased text size
          color: '#87CEEB', // Sky blue color
          fontFamily: "'Arial', sans-serif", // Modern font
          fontWeight: '700', // Bold font for emphasis
          textAlign: 'center', // Centered text
          letterSpacing: '2px', // Add some space between letters for elegance
          textShadow: '2px 2px 10px rgba(135, 206, 235, 0.6)', // Soft shadow for depth
          padding: '20px', // Padding to avoid text touching the edges
          borderRadius: '15px', // Rounded corners for smooth edges
          boxShadow: '0px 4px 15px rgba(135, 206, 235, 0.5)', // Subtle shadow to lift the text
        }}
      >
        Welcome To GoGround
      </h1>
    </div>
  );
}

export default AdminDashboard_G;
