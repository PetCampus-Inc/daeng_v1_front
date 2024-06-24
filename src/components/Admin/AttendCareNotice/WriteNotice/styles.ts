import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
`;

export const CompleteNoteContainer = styled.div`
  position: relative;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const NoteSpring = styled.div`
  position: absolute;
  width: 100%;
  min-height: 27px;
  top: 20px;

  &:before {
    content: "";
    position: absolute;
    display: block;
    margin: 0 3rem;
    left: 3px;
    right: 0;
    height: 12px;
    background-image: url("/images/gray-circle.svg");
    background-repeat: repeat-x;
    background-position: left center;
    background-size: contain;
  }
`;

export const NoteSpringEllipse = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray_2};
`;

export const NoteInnerContainer = styled.div`
  display: flex;
  gap: 2.75rem;
  flex-direction: column;
  padding: 4.5rem 1rem 2rem;
`;

export const NoteTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
`;

export const NoteText = styled.div`
  &.title {
    ${({ theme }) => theme.typo.label1_16_B};
    &.main {
      color: ${({ theme }) => theme.colors.gray_1};
    }
    &.content {
      display: flex;
      align-items: center;
      gap: 4px;
      color: ${({ theme }) => theme.colors.black};
    }
  }
  &.date {
    ${({ theme }) => theme.typo.label2_14_R};
    color: ${({ theme }) => theme.colors.gray_2};
  }
  &.content {
    ${({ theme }) => theme.typo.label2_14_R};
    color: ${({ theme }) => theme.colors.gray_1};
  }
`;

export const ThinLine = styled.div`
  width: 100%;
  height: 1px;
`;

export const NoteContentFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
