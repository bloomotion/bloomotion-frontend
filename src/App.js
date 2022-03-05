import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import DailyPhoto from "./components/DailyPhoto/DailyPhoto";
import Happy from "./components/Emotion/Happy";
import Angry from "./components/Emotion/Angry";
import Sad from "./components/Emotion/Sad";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users/:id/photo" element={<DailyPhoto />} />
      <Route path="/users/:id/emotion/happy" element={<Happy />} />
      <Route path="/users/:id/emotion/sad" element={<Sad />} />
      <Route path="/users/:id/emotion/angry" element={<Angry />} />
      <Route path="*" element={<div>wrong url</div>} />
    </Routes>
  );
}

export default App;
