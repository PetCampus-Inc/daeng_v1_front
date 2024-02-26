import { styled } from "styled-components";

export const Menu = styled.div<{
  isopen: string;
  height?: string;
  bottom?: string;
}>`
  display: ${({ isopen }) => (isopen ? "block" : "none")};
  position: absolute;
  background-color: white;
  border: solid 1px ${(props) => props.theme.colors.gray_4};
  box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.13);
  border-radius: 0.4rem;
  width: 105%;
  height: ${(props) => (props.height ? props.height : "8rem")};
  overflow: hidden;
  left: 0;
  bottom: ${(props) => (props.bottom ? props.bottom : "-5.5rem")};
  z-index: 9999;
`;

export const ButtonWrapper = styled.div<{ height?: string }>`
  padding-left: 0.8rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray_4};
  width: 100%;
  height: ${(props) => (props.height ? props.height : "34%")};
`;

export const MenuItem = styled.button``;
