import React from "react";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { authentication } from "../../api/firebase-config";
import { ACCESS_TOKEN } from "../../constants/auth";

const LogoutButton = styled.button`
  display: flex;
  position: absolute;
  top: 10px;
  right: 20px;
  width: 60px;
  height: 30px;
  border: 1.5px solid #000000;
  background: none;
  color: #000000;
  font-size: 18px;
  line-height: 1.5;
  z-index: 1;
  cursor: pointer;

  &:hover {
    background-color: #000000;
    color: #ffffff;
    transition: 0.3s ease;
  }
`;

function Logout() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(authentication);

      localStorage.removeItem(ACCESS_TOKEN);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return <LogoutButton onClick={handleLogout}>logout</LogoutButton>;
}

export default Logout;
