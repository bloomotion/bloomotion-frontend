import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import DailyPhoto from "./components/DailyPhoto/DailyPhoto";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/users/:id/photo" element={<DailyPhoto />} />
      <Route path="*" element={<div>Error</div>} />
    </Routes>
  );
}

export default App;
