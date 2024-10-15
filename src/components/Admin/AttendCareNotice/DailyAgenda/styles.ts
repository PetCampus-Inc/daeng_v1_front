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
  box-shadow: ${({ theme }) => theme.shadows.alertCard};
`;

export const NoteSpring = styled.div`
  position: absolute;
  width: 100%;
  min-height: 27px;
  border-radius: 16px 16px 0px 0px;
  padding: 0 1.1rem;

  &::before {
    content: "";
    position: absolute;
    top: 28px;
    left: 16px;
    right: 16px;
    height: 12px;
    background-image: radial-gradient(circle, #f1f1f1 6px, transparent 6px);
    background-size: calc((100% - 12px) / 9) 12px;
    background-position: 6px center;
    background-repeat: repeat-x;
  }
`;

export const NoteInnerContainer = styled.div`
  display: flex;
  gap: 2.75rem;
  flex-direction: column;
  padding: 4.5rem 1.2rem 3.5rem;
`;

export const NoteTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
`;

export const ThinLine = styled.div`
  width: 100%;
  height: 1px;
`;

export const NoteContentFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
