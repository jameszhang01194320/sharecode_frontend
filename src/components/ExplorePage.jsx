// src/components/ExplorePage.jsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const [snippets, setSnippets] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const BACKEND_URL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000"
      : "https://sharecode-backend-vrjn.onrender.com";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/snippets/`)
      .then((res) => res.json())
      .then((data) => setSnippets(data));
  }, []);

  const filteredSnippets = showFavorites
    ? snippets.filter((s) => s.is_favorite)
    : snippets;

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Explore Snippets</h2>
      <div className="text-center mb-4">
        <Button
          variant={showFavorites ? "success" : "outline-success"}
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          {showFavorites ? "✅ 显示全部" : "🌟 只看收藏"}
        </Button>
      </div>
      <Row>
        {filteredSnippets.map((snippet) => (
          <Col md={6} lg={4} className="mb-4" key={snippet.id}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {snippet.language.toUpperCase()}{" "}
                  {snippet.is_favorite && <Badge bg="warning">★ 收藏</Badge>}
                </Card.Title>
                <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                  {snippet.code.substring(0, 100)}...
                </Card.Text>
                <Link
                  to={`/share/${snippet.id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  查看
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExplorePage;
