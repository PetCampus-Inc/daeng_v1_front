import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import styled, { CSSProperties } from "styled-components";
import { remCalc } from "utils/calculator";

import { WideButton } from "./WideButton";

type BottomButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  position?: CSSProperties["position"];
  wrapPb?: number;
  wrapColor?: "white" | "gray_5" | "primaryColor" | "transparent";
  colorScheme?: "primary" | "gray_4";
  bottom?: number;
};

/**
 * 하단에 위치한 버튼 컴포넌트입니다.
 * @param {BottomButtonProps} props
 * @param {CSSProperties["position"]} [props.position="absolute"] - 버튼 컨테이너의 position 속성
 * @param {"primary" | "gray_4"} [props.colorScheme="primary"] - 버튼의 색상 스키마
 * @param {"white" | "gray_5" | "primaryColor" | "transparent"} [props.wrapColor="white"] - 버튼 래퍼의 배경색
 * @param {number} [props.wrapPb=32] - 버튼 래퍼의 하단 패딩 (단위: px)
 * @default
 * - position: "absolute"
 * - colorScheme: "primary"
 * - wrapColor: "white"
 * - wrapPb: 32
 * - bottom: 0
 */
export const BottomButton = ({
  position = "absolute",
  colorScheme = "primary",
  wrapColor = "white",
  wrapPb = 32,
  bottom,
  children,
  ...props
}: PropsWithChildren<BottomButtonProps>) => {
  const wideButtonProps = {
    colorScheme,
    ...props
  };

  return (
    <RootContainer position={position} bottom={bottom || 0}>
      <ButtonBackground bgColor={wrapColor} pb={wrapPb} className={props.className}>
        <WideButton {...wideButtonProps}>{children}</WideButton>
      </ButtonBackground>
    </RootContainer>
  );
};
const RootContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["position", "bottom"].includes(prop)
})<{ position: CSSProperties["position"]; bottom: number }>`
  position: ${({ position }) => position};
  bottom: ${({ bottom }) => bottom + "px"};
  left: 0;
  right: 0;
`;

const ButtonBackground = styled.div.withConfig({
  shouldForwardProp: (prop) => !["bgColor", "pb"].includes(prop)
})<{ bgColor: "white" | "gray_5" | "primaryColor" | "transparent"; pb: number }>`
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor]};
  padding: 16px 16px ${({ pb }) => remCalc(pb)};
`;
