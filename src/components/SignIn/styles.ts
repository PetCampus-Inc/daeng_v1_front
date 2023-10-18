import styled from "styled-components";

export const Container = styled.div<{ padding_top?: string }>`
  width: 100%;
  height: 100%;
  padding-top: ${(props) => (props.padding_top ? props.padding_top : "40%")};
  padding-left: 5%;
  padding-right: 5%;
  background-color: white;
  justify-content: space-evenly;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 10%;
`;

export const StyledTitleText = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

export const ButtonWrapper = styled.div`
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
}>`
  position: absolute;
  left: 0;
  padding-left: 5%;
`;

export const StyledBottomWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

export const StyledInputBoxWrapper = styled.div`
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const StyledSignInButton = styled.div`
  height: 10%;
  font-size: 0.9rem;
  color: #858585;
  border-bottom: 1px solid #b5b5b5;
  display: flex;
  margin-bottom: 5%;
  padding-bottom: 6%;
  cursor: pointer;
`;

export const StyledSelectRoleWrapper = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
`;
