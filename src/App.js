import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/users/:id" element={<div>userId</div>} />
      <Route path="*" element={<div>Error</div>} />
    </Routes>
  );
}

export default App;
