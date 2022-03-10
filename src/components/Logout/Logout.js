import React from "react";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { authentication } from "../../api/firebase-config";
import { ACCESS_TOKEN } from "../../constants/auth";

const LogoutButton = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 18px;
  z-index: 1;
  cursor: pointer;

  .logout {
    margin-top: 3px;
    margin-right: 5px;
    font-size: 16px;
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

  return (
    <LogoutButton onClick={handleLogout}>
      <p className="logout">Logout</p>
      <i className="fa-solid fa-right-from-bracket logoutIcon"></i>
    </LogoutButton>
  );
}

export default Logout;
