import React from "react";
import { Routes, Route } from "react-router-dom";

import GlobalStyle from "./components/GlobalStyles/GlobalStyles";
import Login from "./components/Login/Login";
import DailyPhoto from "./components/DailyPhoto/DailyPhoto";
import Emotion from "./components/Emotion/Emotion";
import Error from "./components/Error/Error";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users/:id/photo" element={<DailyPhoto />} />
        <Route path="/users/:id/emotion/:type/:degree" element={<Emotion />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
