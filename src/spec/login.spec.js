import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import axios from "axios";
import Login from "../components/Login/Login";
import { getLoggedInUser } from "../api/auth";

jest.mock("axios");

describe("login", () => {
  test("로컬에 토큰이 존재할 경우 'getLoggedInUser' 를 실행시키면 유저의 id를 반환한다.", async () => {
    axios.get.mockResolvedValue({
      data: {
        result: {
          id: "userId",
        },
      },
    });

    localStorage.setItem("accessToken", "accessToken");

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    let response;

    await act(async () => {
      response = await getLoggedInUser();
    });

    expect(response).toEqual("userId");
  });

  test("로컬에 저장된 토큰이 없는 경우 'getLoggedInUser' 는 undefined 를 반환한다.", async () => {
    localStorage.removeItem("accessToken");

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const response = await getLoggedInUser();

    expect(response).toEqual(undefined);
  });
});
