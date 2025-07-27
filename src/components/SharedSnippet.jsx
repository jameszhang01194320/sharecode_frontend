// src/components/SharedSnippet.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Alert, Button, Spinner } from "react-bootstrap";
import Editor from "@monaco-editor/react";

const SharedSnippet = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/snippets/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("找不到对应的代码片段");
        return res.json();
      })
      .then((data) => {
        setSnippet(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Share code snippets</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          <p>{error}</p>
          <Link to="/">
            <Button variant="outline-danger">Back to Home Page</Button>
          </Link>
        </Alert>
      )}

      {!loading && snippet && (
        <>
          <Row className="mb-3">
            <Col className="text-center">
              <p>
                <strong>Snippet ID:</strong> {id}
              </p>
              <p>
                <strong>Language:</strong> {snippet.language} | <strong>Theme:</strong> {snippet.theme}
              </p>
            </Col>
          </Row>

          <div className="border rounded">
            <Editor
              height="500px"
              language={snippet.language}
              theme={snippet.theme}
              value={snippet.code}
              options={{ readOnly: true, minimap: { enabled: false } }}
            />
          </div>

          <div className="text-center mt-4">
            <Link to="/">
              <Button variant="primary">✍️ Create Your Own Snippet</Button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default SharedSnippet;
