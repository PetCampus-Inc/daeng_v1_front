import type { IconProps } from "./types";

interface AlertIconProps extends Omit<IconProps, "color"> {
  color: "red" | "gray" | "brown" | "orange" | "darkgray";
}

const AlertSmallIcon = ({ color, w = "16", h = "16" }: AlertIconProps) => {
  const colorMap = new Map<string, string[]>([
    ["red", ["#FAE7E3", "#DD5435", "#FAE7E3"]],
    ["gray", ["#F7F7F7", "#B5B5B5", "#F7F7F7"]],
    ["brown", ["#FFF7E1", "#956F4C", "#EEE3D9"]],
    ["orange", ["#FFFFFF", "#EE7821", "#F7F7F7"]],
    ["darkgray", ["#E9E9E9", "#B5B5B5", "#F7F7F7"]]
  ]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} fill="none" viewBox="0 0 16 16">
      <rect width="16" height="16" fill={colorMap.get(color)?.[0]} rx="4" />
      <circle cx="8.001" cy="7.999" r="5.333" fill={colorMap.get(color)?.[1]} />
      <path
        fill={colorMap.get(color)?.[2]}
        fillRule="evenodd"
        d="M7.999 4.707a.667.667 0 0 0-.667.667V8.04a.667.667 0 0 0 1.333 0V5.374A.667.667 0 0 0 8 4.707Zm0 5.404a.591.591 0 1 0 0 1.183.591.591 0 0 0 0-1.183Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default AlertSmallIcon;
