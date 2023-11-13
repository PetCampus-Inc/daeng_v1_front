import styled from "styled-components";

export const Container = styled.div`
  height: 85vh;
  width: 100%;
  display: flex;
  margin-top: 5vh;
  padding-left: 4%;
  padding-right: 4%;
`;

export const StyledHeadWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTitleWrapper = styled.div``;

export const StyledButtonWrapper = styled.div`
  display: flex;
  width: 35%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
}>`
  margin-right: 3%;
`;
