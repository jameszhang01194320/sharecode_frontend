// src/components/SharedSnippet.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Editor from "@monaco-editor/react";

const SharedSnippet = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);

  const BACKEND_URL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000"
      : "https://sharecode-backend-vrjn.onrender.com";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/snippets/${id}/`)
      .then((res) => res.json())
      .then((data) => setSnippet(data));
  }, [id]);

  if (!snippet) return <p className="text-center mt-4">⏳ 正在加载片段...</p>;

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Share code snippets</h2>
      <p>
        <strong>Snippet ID:</strong> {snippet.id}
        <br />
        <strong>Language:</strong> {snippet.language} |{" "}
        <strong>Theme:</strong> {snippet.theme}
      </p>
      <div className="border rounded" style={{ overflow: "hidden" }}>
        <Editor
          height="400px"
          language={snippet.language}
          theme={snippet.theme}
          value={snippet.code}
          options={{ readOnly: true, minimap: { enabled: false } }}
        />
      </div>
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-outline-secondary">
          ⬅ 返回首页
        </Link>
      </div>
    </Container>
  );
};

export default SharedSnippet;
