import { type ReactElement } from "react";
import { type CSSProp } from "styled-components";

import type { ColorProps, SpacingProps } from "../../../styles/system";
import type { TypoKeys } from "styles/types";

export type ButtonSizeSet = "xs" | "sm" | "md" | "lg";
export type ButtonColorScheme =
  | "primary"
  | "br_4"
  | "br_5"
  | "yellow_3"
  | "gray_1"
  | "gray_2"
  | "gray_3"
  | "gray_4"
  | "gray_5"
  | "white"
  | "red_1"
  | "red_2";
export type ButtonVariant = "rectangle" | "pill" | number;
export type ButtonWidth = "full" | "auto" | number;

export type ButtonOption = SpacingProps &
  ColorProps & {
    /**
     * 버튼의 변형 타입
     * @default "rectangle"
     */
    variant?: ButtonVariant;
    /**
     * 버튼의 크기 세트
     * @default "lg"
     */
    size?: ButtonSizeSet;
    /**
     * 버튼의 색상 스키마
     * @default "primary"
     */
    colorScheme?: ButtonColorScheme;
    /**
     * 버튼의 너비
     * @default 'auto'
     * @description number는 px 단위로 지정합니다.
     */
    width?: ButtonWidth;
    /**
     * 버튼의 타이포그래피
     * @default "body2_16_B"
     */
    typo?: TypoKeys;
    /**
     * 버튼의 간격
     */
    gap?: number;
    /**
     * 버튼의 왼쪽 추가 요소
     */
    leftAddon?: ReactElement;
    /**
     * 버튼의 오른쪽 추가 요소
     */
    rightAddon?: ReactElement;
    /**
     * 버튼에 적용할 스타일
     */
    css?: CSSProp;
  };
