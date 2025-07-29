// src/components/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
