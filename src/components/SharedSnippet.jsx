// src/components/SharedSnippet.jsx

import React, { useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";

const SharedSnippet = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const BACKEND_URL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000"
      : "https://sharecode-backend-vrjn.onrender.com";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/snippets/${id}/`)
      .then((res) => res.json())
      .then((data) => setSnippet(data));
  }, [id]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from, {
        state: {
          scrollY: location.state.scrollY || 0,
        },
      });
    } else {
      navigate("/");
    }
  };

  if (!snippet) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="text-center mb-3">📄 查看代码片段</h2>

      <div className="mb-3">
        <strong>语言:</strong> {snippet.language} <br />
        <strong>主题:</strong> {snippet.theme}
      </div>

      <div className="border rounded mb-4" style={{ overflow: "hidden" }}>
        <Editor
          height="400px"
          defaultLanguage={snippet.language}
          defaultTheme={snippet.theme}
          value={snippet.code}
          options={{ readOnly: true, minimap: { enabled: false } }}
        />
      </div>

      <div className="text-center">
        <Button variant="secondary" onClick={handleGoBack}>
          🔙 返回上页
        </Button>
      </div>
    </Container>
  );
};

export default SharedSnippet;
