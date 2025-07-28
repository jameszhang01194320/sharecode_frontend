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

  // 恢复滚动位置
  useEffect(() => {
    if (location.state?.scrollY !== undefined) {
        // 延迟以确保 DOM 渲染完成再滚动
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
      <h2 className="text-center mb-4">Explore Snippets</h2>
      <div className="text-center mb-4">
        <Button
          variant={showFavorites ? "success" : "outline-success"}
          onClick={() => setShowFavorites((prev) => !prev)}
        >
          {showFavorites ? "✅ 显示全部" : "🌟 只看收藏"}
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>语言</th>
            <th>预览</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredSnippets.map((snippet) => (
            <tr key={snippet.id}>
              <td>
                {snippet.language.toUpperCase()}{" "}
                {snippet.is_favorite && <Badge bg="warning">★ 收藏</Badge>}
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
                  查看
                </Button>
                <Button
                  variant={snippet.is_favorite ? "danger" : "outline-warning"}
                  size="sm"
                  onClick={() => handleToggleFavorite(snippet)}
                >
                  {snippet.is_favorite ? "取消收藏" : "🌟 收藏"}
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
