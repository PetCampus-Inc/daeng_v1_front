import styled from "styled-components";

import { ImageWrapper } from "../AttendanceCard/styles";
export { Image } from "../AttendanceCard/styles";

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;

  & > svg {
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;

export const Name = styled.span`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.darkBlack};

  width: 56px; /* 아바타 크기와 동일 */

  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
`;

export const Avatar = styled.div`
  width: auto !important;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarImgWrapper = styled(ImageWrapper)`
  width: 56px;
  height: 56px;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;

  z-index: 1;

  & > svg {
    .icon-circle {
      color: ${({ theme }) => theme.colors.white};
    }

    .icon-path {
      color: ${({ theme }) => theme.colors.br_3};
    }
  }
`;
