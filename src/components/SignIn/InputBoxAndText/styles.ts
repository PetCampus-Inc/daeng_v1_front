import styled from "styled-components";

export const StyledMainWrapper = styled.div`
  height: 18%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`;

export const StyledTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledMainText = styled.div`
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  margin-top: 3%;
  margin-bottom: 3%;
`;

export const StyledErrorText = styled.div<{ confirmedId?: boolean }>`
  font-size: 0.8rem;
  font-weight: 400;
  margin-top: 3%;
  margin-bottom: 3%;
  color: ${(props) =>
    props.confirmedId ? props.theme.black : props.theme.red_1};
`;
