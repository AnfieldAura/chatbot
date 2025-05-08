import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Align from "./pages/Align";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/align" element={<Align />} />
      {/* ...existing routes... */}
    </Routes>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));