// src/components/SharedSnippet.jsx

import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams, Link, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";

const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://sharecode-backend-vrjn.onrender.com";

const SharedSnippet = () => {
  const { id } = useParams();
  const location = useLocation();
  const backTo = location.state?.from || "/";

  const [snippet, setSnippet] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/snippets/${id}/`)
      .then((res) => res.json())
      .then((data) => setSnippet(data));
  }, [id]);

  if (!snippet) return <Container>加载中...</Container>;

  return (
    <Container className="py-4">
      <h2 className="mb-3">Share code snippets</h2>
      <p><strong>Snippet ID:</strong> {snippet.id}</p>
      <p>
        <strong>Language:</strong> {snippet.language} |{" "}
        <strong>Theme:</strong> {snippet.theme}
      </p>

      <div className="border rounded mb-4" style={{ overflow: "hidden" }}>
        <Editor
          height="400px"
          language={snippet.language}
          theme={snippet.theme}
          value={snippet.code}
          options={{
            readOnly: true,
            minimap: { enabled: false },
          }}
        />
      </div>

      <div className="text-center">
        <Link to={backTo}>
          <Button variant="outline-secondary">🔙 返回</Button>
        </Link>
      </div>
    </Container>
  );
};

export default SharedSnippet;
