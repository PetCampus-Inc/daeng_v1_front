import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 40%;
  padding-left: 5%;
  padding-right: 5%;
  background-color: white;
  justify-content: space-evenly;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTitleText = styled.text`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 5px;
`;

export const ButtonWrapper = styled.div`
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const KakaoButton = styled.button`
  width: 100%;
  height: 10%;
  margin-bottom: 10px;
  border-radius: 7px;
  border-style: none;
  background-color: #fee500;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const GoogleButton = styled.button`
  width: 100%;
  height: 10%;
  margin-bottom: 10px;
  border: solid 1px #cccccc;
  border-radius: 7px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AppleButton = styled.button`
  width: 100%;
  height: 10%;
  margin-bottom: 10px;
  border-radius: 7px;
  border-style: none;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TryButton = styled.button`
  width: 100%;
  height: 10%;
  border-style: none;
  background-color: white;
  color: #525252;
`;
