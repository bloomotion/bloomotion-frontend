import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Emotion from "../components/Emotion/Emotion";

describe("logout", () => {
  test("'logout' 버튼을 누르면 로컬의 토큰이 사라지고 로그아웃 된다.", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Emotion />
      </BrowserRouter>,
    );

    const logoutButton = getByText("logout");

    fireEvent.click(logoutButton);

    expect(localStorage.getItem("accessToken")).toBe(null);
  });
});
