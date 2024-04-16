import styled from "styled-components";

export const PageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["pt", "imageUrl"].includes(prop)
})<{
  pt?: string;
  imageUrl?: string;
}>`
  padding-top: ${({ pt }) => (pt ? `calc(5vh + ${pt}rem)` : "calc(5vh)")};
  background: ${({ imageUrl, theme }) =>
    imageUrl
      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${imageUrl}) lightgray 50% / cover no-repeat`
      : theme.colors.br_2};
  width: 100vw;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;
