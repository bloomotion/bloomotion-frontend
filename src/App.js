import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import DailyPhoto from "./components/DailyPhoto/DailyPhoto";
import Loading from "./components/Loading/Loading";
import Happy from "./components/Emotion/Happy";
import Angry from "./components/Emotion/Angry";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/users/:id/photo" element={<DailyPhoto />} />
      <Route path="/users/:id/emotion/happy" element={<Happy />} />
      <Route path="/users/:id/emotion/angry" element={<Angry />} />
      <Route path="*" element={<Loading />} />
    </Routes>
  );
}

export default App;
