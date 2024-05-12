import styled from "styled-components";

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TimeAndPhotoContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  color: ${({ theme }) => theme.colors.gray_2};
  text-align: start;
  ${({ theme }) => theme.typo.body2_16_R};
`;

export const ImageFlexWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-grow: 1;
`;

export const ImageBlock = styled.button`
  border-radius: 8px;
`;
