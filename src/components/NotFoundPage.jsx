// src/components/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>404 - 页面未找到</h2>
      <p>你访问的链接不存在。</p>
      <Link to="/">返回首页</Link>
    </div>
  );
}

export default NotFoundPage;
