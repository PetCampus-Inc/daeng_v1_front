import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin-top: 5vh;
  position: relative;
`;

export const StyledHeadWrapper = styled.div`
  height: 20%;
`;

export const StyledMainWrapper = styled.div`
  display: flex;
  height: 65%;
  height: 65%;
  width: 100%;
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
  marginright?: string;
  marginleft?: string;
}>`
  margin-right: ${(props) => (props.marginright ? props.marginright : "3%")};
  margin-left: ${(props) => (props.marginleft ? props.marginleft : "")};
  margin-right: ${(props) => (props.marginright ? props.marginright : "3%")};
  margin-left: ${(props) => (props.marginleft ? props.marginleft : "")};
`;

export const StyledListWrapper = styled.div`
  width: 100%;
  height: 75%;
  padding-bottom: 5%;
  padding-left: 4%;
  padding-right: 2%;
  overflow-y: auto;
  position: relative;
`;

export const StyledBlur = styled.div<{ display: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 1;
  pointer-events: none;
  display: ${(props) => props.display};
  overflow: hidden;
`;

export const StyledCardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-right: 2%;
  gap: 4%;
`;

export const StyledTextWrapper = styled.div`
  margin: 40% auto 0;
`;
