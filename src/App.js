import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import DailyPhoto from "./components/DailyPhoto/DailyPhoto";
import Emotion from "./components/Emotion/Emotion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users/:id/photo" element={<DailyPhoto />} />
      <Route path="/users/:id/emotion/:state" element={<Emotion />} />
      <Route path="*" element={<div>wrong page</div>} />
    </Routes>
  );
}

export default App;
