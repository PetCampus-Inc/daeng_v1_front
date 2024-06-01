import Button from "components/common/Button";
import { Flex } from "components/common/Flex";
import { css, styled } from "styled-components";

export const RoleEditeButton = styled(Button)`
  max-width: 112px;
  min-height: 49px;
`;

export const RoleSelectButton = styled(Button)`
  max-width: 112px;
  min-height: 49px;
`;

export const RoleEditeContainer = styled.div`
  position: relative;
  flex: 1;
`;

export const RoleSelectWrapper = styled(Flex)`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  gap: 6px;
  width: 100%;
`;

export const UploadProfileButton = styled(Flex)`
  border-radius: 40px;
  height: 160px;
  width: 100%;
  max-width: 160px;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  position: relative;
`;

export const UploadImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  object-fit: cover;
`;

export const StyledHiddenUpload = styled.input`
  display: none;
`;

const ImgStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 90px;
  height: 90px;
  aspect-ratio: 1/1;

  border-radius: 8px;

  flex-shrink: 0; // flex item이 shrink되지 않도록 설정
`;
