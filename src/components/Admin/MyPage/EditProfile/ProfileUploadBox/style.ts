import styled from "styled-components";

export const StyledProfileUploadBox = styled.label`
  position: relative;

  input {
    display: none;
  }
`;

export const Container = styled.div`
  overflow: hidden;

  width: 6.4rem;
  height: 6.4rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.gray_5};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const IconWrap = styled.div`
  position: absolute;
  bottom: -0.4rem;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.75rem;
  height: 1.75rem;
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.br_4};
`;
