import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <StyledBackground>
      <StyledWrapper>
        <StyledTitle>NOT FOUND :(</StyledTitle>
        <StyledButton onClick={() => navigate(-1)}>돌아가기</StyledButton>
      </StyledWrapper>
    </StyledBackground>
  );
};

export default NotFoundPage;

const StyledBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  background-color: white;
  z-index: 99999;
`;

const StyledWrapper = styled.div`
  width: 500px;
  height: 500px;
  padding: 64px;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  align-items: center;
  flex-direction: column;
  border: 3px solid #e83845;
  border-radius: 5px;
`;

const StyledTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #e83845;
`;

const StyledButton = styled.button`
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.75rem;
  color: white;
  background-color: #e83845;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 194px;
  height: 56px;
  cursor: pointer;
`;
