import { Button } from "components/common/Button";
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

export const UploadProfileButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  height: 160px;
  width: 100%;
  max-width: 160px;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  position: relative;

  aspect-ratio: 1/1;

  .GalleryIcon {
    position: relative;
    z-index: 1;
  }

  .active {
    display: none;
  }

  &:focus {
    .active {
      display: block;
    }
  }
`;

export const ActiveBox = styled.div``;

export const BackDropBorder = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 5px solid ${({ theme }) => theme.colors.primary_4};
  border-radius: 40px;
  z-index: 1;
`;

export const BackDrop = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.black};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.3;
`;

export const UploadImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledHiddenUpload = styled.input`
  display: none;
`;

export const SavaProfileButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
