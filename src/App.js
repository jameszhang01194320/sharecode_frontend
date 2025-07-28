// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CodeEditor from "./components/CodeEditor";
// import SharedSnippet from "./components/SharedSnippet";
// import NotFoundPage from "./components/NotFoundPage";

// function App() {
//   return (
//     <Router>
//       {/* <h1 style={{ fontSize: "24px", fontWeight: "bold", padding: "10px" }}>
//         NoteCode - Code Sharing App
//       </h1> */}
//       <Routes>
//         <Route path="/" element={<CodeEditor />} />
//         <Route path="/share/:id" element={<SharedSnippet />} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeEditor from "./components/CodeEditor.jsx";
import SharedSnippet from "./components/SharedSnippet.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import ExplorePage from "./components/ExplorePage.jsx"; // ✅ new

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodeEditor />} />
        <Route path="/share/:id" element={<SharedSnippet />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
