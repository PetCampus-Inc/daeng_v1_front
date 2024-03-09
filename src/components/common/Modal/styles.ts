import styled from "styled-components";
export { BackDrop } from "styles/StyleModule";

export const StyledModal = styled.div<{
  width: string;
  height: string;
}>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 16px;
`;

export const StyledModalContent = styled.div`
  width: 100%;
  height: 100%;
`;

export const StyledCloseImage = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 12px;
  margin-top: 12px;
  cursor: pointer;
  background: url("data:image/svg+xml,%3Csvg width='16px' height='16px' viewBox='0 0 16 16' class='bi bi-x' fill='currentColor' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")
    no-repeat right top;
  background-size: 36px;
  width: 36px;
  height: 36px;
`;
