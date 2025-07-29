// src/components/SharedSnippet.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button, Badge } from "react-bootstrap";

function SharedSnippet() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const navigate = useNavigate();

  const BACKEND_URL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000"
      : "https://sharecode-backend-vrjn.onrender.com";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/snippets/${id}/`)
      .then((res) => res.json())
      .then((data) => setSnippet(data));
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (!snippet) return <p>Loading...</p>;

  return (
    <Container className="py-4">
      <h2>
        {snippet.language?.toUpperCase()}{" "}
        {snippet.is_favorite && <Badge bg="warning">★ Favorite</Badge>}
      </h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{snippet.code}</pre>

      <div className="mt-3">
        <Button variant="primary" className="me-2" onClick={handleCopyLink}>
          📋 Copy Link
        </Button>
        <Link to="/" className="btn btn-secondary me-2">
          ⬅ Back to Home
        </Link>
        <Link to="/explore" className="btn btn-success">
          🔍 Explore More
        </Link>
      </div>
    </Container>
  );
}

export default SharedSnippet;
