// src/components/ExplorePage.jsx
import React, { useEffect, useState } from "react";
import { Container, Button, Badge, Table } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ExplorePage = () => {
  const [snippets, setSnippets] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const BACKEND_URL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000"
      : "https://sharecode-backend-vrjn.onrender.com";

  const navigate = useNavigate();
  const location = useLocation();

  // Restore scroll position
  useEffect(() => {
    if (location.state?.scrollY !== undefined) {
      setTimeout(() => {
        window.scrollTo({ top: location.state.scrollY, behavior: "instant" });
      }, 0);
    }
  }, [location.state]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/snippets/`)
      .then((res) => res.json())
      .then((data) => setSnippets(data));
  }, []);

  const filteredSnippets = showFavorites
    ? snippets.filter((s) => s.is_favorite)
    : snippets;

  const handleToggleFavorite = async (snippet) => {
    const res = await fetch(`${BACKEND_URL}/api/snippets/${snippet.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_favorite: !snippet.is_favorite }),
    });

    if (res.ok) {
      setSnippets((prev) =>
        prev.map((s) =>
          s.id === snippet.id ? { ...s, is_favorite: !s.is_favorite } : s
        )
      );
    }
  };

  const handleDelete = async (snippetId) => {
    if (!window.confirm("Are you sure you want to delete this snippet?")) return;

    const res = await fetch(`${BACKEND_URL}/api/snippets/${snippetId}/`, {
      method: "DELETE",
    });

    if (res.ok) {
      setSnippets((prev) => prev.filter((s) => s.id !== snippetId));
    } else {
      alert("Failed to delete snippet.");
    }
  };

  const handleView = (snippetId) => {
    navigate(`/share/${snippetId}`, {
      state: {
        from: "/explore",
        scrollY: window.scrollY,
      },
    });
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Explore Snippets</h2>
        <Link to="/" className="btn btn-secondary">
          ⬅ Back to Home
        </Link>
      </div>

      <div className="text-center mb-4">
        <Button
          variant={showFavorites ? "success" : "outline-success"}
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          {showFavorites ? "✅ Show All" : "🌟 Show Favorites Only"}
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Language</th>
            <th>Preview</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSnippets.map((snippet) => (
            <tr key={snippet.id}>
              <td>
                {snippet.language.toUpperCase()}{" "}
                {snippet.is_favorite && <Badge bg="warning">★ Favorite</Badge>}
              </td>
              <td>
                <code style={{ whiteSpace: "pre-wrap" }}>
                  {snippet.code.substring(0, 80)}...
                </code>
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleView(snippet.id)}
                >
                  View
                </Button>
                <Button
                  variant={snippet.is_favorite ? "danger" : "outline-warning"}
                  size="sm"
                  className="me-2"
                  onClick={() => handleToggleFavorite(snippet)}
                >
                  {snippet.is_favorite ? "Unfavorite" : "🌟 Favorite"}
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(snippet.id)}
                >
                  🗑 Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ExplorePage;
