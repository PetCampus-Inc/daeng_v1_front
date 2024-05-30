import styled from "styled-components";

export const StyledTitleContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

export const StyledTitleButton = styled.button<{ expand?: boolean }>`
  display: flex;
  flex: 1 1 0%;
  justify-content: space-between;
  align-items: center;

  & > svg {
    transform: ${({ expand }) => (expand ? "rotate(180deg)" : "rotate(0deg)")};
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
  }
`;

export const StyledContentContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["expanded", "isClosing"].includes(prop)
})<{
  expanded: boolean;
  isClosing: boolean;
}>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${({ expanded, isClosing }) => (expanded || isClosing ? "normal" : "nowrap")};
`;
