import { useId } from "react";
import { themeConfig } from "styles/themeConfig";

import type { IconProps } from "./types";

interface Props extends Omit<IconProps, "color"> {
  colorScheme?: "primary" | "yellow" | "gray";
}

const DogCircleIcon = ({ w = 80, h = 80, colorScheme = "primary" }: Props) => {
  const colorMap = new Map<string, [string, { r: number; g: number; b: number; a: number }]>([
    ["primary", [themeConfig.colors.primaryColor, { r: 136, g: 99, b: 66, a: 0.3 }]],
    ["yellow", [themeConfig.colors.yellow_3, { r: 235, g: 208, b: 135, a: 0.3 }]],
    ["gray", [themeConfig.colors.gray_5, { r: 0, g: 0, b: 0, a: 0 }]]
  ]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [fillColor, shadowColor] = colorMap.get(colorScheme) ?? colorMap.get("primary")!;

  const baseId = useId();
  const filterId = `filter_${baseId}`;
  const clipPathId = `clip_${baseId}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} fill="none" viewBox="0 0 80 80">
      <g clipPath={`url(#${clipPathId})`}>
        <rect width={80} height={80} y={0.458} fill={fillColor} rx={40} />
        <g filter={`url(#${filterId})`}>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M18.536 53.334a8.418 8.418 0 0 1-4.983-1.115c-4.057-2.355-5.452-7.563-3.117-11.632l2.77-4.825a9.464 9.464 0 0 1 6.317-10.079c1.777-3.48 5.364-5.891 9.511-5.94a21.018 21.018 0 0 1 10.052-2.541c3.64 0 7.065.921 10.055 2.543.077-.002.155-.002.233-.002 4.227 0 7.888 2.454 9.67 6.005a9.465 9.465 0 0 1 6.133 10.014l2.77 4.825c2.335 4.069.94 9.277-3.117 11.632a8.418 8.418 0 0 1-5.185 1.095c-1.436 4.313-5.492 7.45-10.272 7.45-1.172 0-2.3-.189-3.358-.537a10.839 10.839 0 0 1-5.728 1.626h-3.481a10.84 10.84 0 0 1-5.373-1.415c-.843.213-1.724.326-2.632.326-4.772 0-8.823-3.128-10.265-7.43Z"
            clipRule="evenodd"
          />
          <path
            fill="#525252"
            d="M36.68 44.137c0-.955.773-1.729 1.728-1.729h.864c.955 0 1.729.774 1.729 1.729 0 .636-.516 1.152-1.152 1.152h-2.017a1.152 1.152 0 0 1-1.152-1.152Z"
          />
          <rect width={3.601} height={3.601} x={31.273} y={39.527} fill="#525252" rx={1.8} />
          <rect width={9.722} height={9.722} x={24.07} y={43.128} fill="#EED5CD" rx={4.861} />
          <rect width={9.722} height={9.722} x={43.875} y={43.128} fill="#EED5CD" rx={4.861} />
          <rect width={3.601} height={3.601} x={42.797} y={39.527} fill="#525252" rx={1.8} />
        </g>
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect width={80} height={80} y={0.458} fill="#fff" rx={40} />
        </clipPath>
        <filter
          id={filterId}
          width={75.773}
          height={60.651}
          x={5.305}
          y={14.202}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={4} dy={5} />
          <feGaussianBlur stdDeviation={4} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            values={`0 0 0 0 ${shadowColor.r / 255} 0 0 0 0 ${shadowColor.g / 255} 0 0 0 0 ${shadowColor.b / 255} 0 0 0 ${shadowColor.a} 0`}
          />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_4244_129195" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_4244_129195" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default DogCircleIcon;
