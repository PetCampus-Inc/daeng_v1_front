import Button from "components/common/Button";
import { Flex } from "components/common/Flex";
import { styled } from "styled-components";

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
`;
