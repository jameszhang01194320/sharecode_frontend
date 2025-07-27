// src/components/CodeEditor.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Editor from "@monaco-editor/react";

const DEFAULT_CODE = `<html>
  <head><title>Hello</title></head>
  <body><h1>Hello, world!</h1></body>
</html>`;

const CodeEditor = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("html");
  const [theme, setTheme] = useState("light");
  const [sharedLink, setSharedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/snippets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language, theme }),
    });

    if (response.ok) {
      const data = await response.json();
      const fullUrl = `${window.location.origin}/share/${data.id}`;
      setSharedLink(fullUrl);
      setCopied(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sharedLink);
    setCopied(true);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">NoteCode - Code Sharing App</h2>

      <Row className="mb-3">
        <Col md={4} className="mb-2">
          <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="html">HTML</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="css">CSS</option>
          </Form.Select>
        </Col>
        <Col md={4} className="mb-2">
          <Form.Select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="vs-dark">Dark</option>
          </Form.Select>
        </Col>
        <Col md={4} className="mb-2 d-grid">
          <Button variant="primary" onClick={handleShare}>
            Share
          </Button>
        </Col>
      </Row>

      <div className="border rounded mb-4" style={{ overflow: "hidden" }}>
        <Editor
          height="400px"
          language={language}
          theme={theme}
          value={code}
          onChange={(value) => setCode(value)}
          options={{ minimap: { enabled: false } }}
        />
      </div>

      {sharedLink && (
        <>
          <Alert variant="success">
            分享链接已生成：
            <a href={sharedLink} target="_blank" rel="noreferrer">{sharedLink}</a>
          </Alert>
          <Button variant="outline-success" onClick={handleCopy}>
            {copied ? "✅ 已复制链接" : "📋 复制链接"}
          </Button>
        </>
      )}
    </Container>
  );
};

export default CodeEditor;
