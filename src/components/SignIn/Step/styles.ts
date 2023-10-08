import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 40%;
  background-color: white;
  justify-content: space-evenly;
  position: relative;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 10%;
  margin-bottom: 20%;
  padding-left: 5%;
  padding-right: 5%;
`;

export const InputBoxWrapper = styled.div`
  width: 100%;
  height: 7%;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
`;

export const StyledBottomWrapper = styled.div`
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 2%;
`;

export const StyledSearchResultWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 5%;
`;

export const StyledSearchResult = styled.div<{ radius: string }>`
  width: 100%;
  height: 15%;
  border: 1px solid #b5b5b5;
  border-top: ${(props) => (props.radius !== "first" ? "0px" : undefined)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-right-radius: ${(props) =>
    props.radius === "first" ? "8px" : undefined};
  border-top-left-radius: ${(props) =>
    props.radius === "first" ? "8px" : undefined};
  border-bottom-left-radius: ${(props) =>
    props.radius === "last" ? "8px" : undefined};
  border-bottom-right-radius: ${(props) =>
    props.radius === "last" ? "8px" : undefined};
`;
