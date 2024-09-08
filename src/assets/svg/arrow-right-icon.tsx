import type { IconProps } from "./types";

interface Props extends Omit<IconProps, "color"> {
  colorScheme?:
    | "gray_1"
    | "gray_2"
    | "gray_3"
    | "gray_4"
    | "gray_5"
    | "black"
    | "darkBlack"
    | "none";
}

const ArrowRightIcon = ({ w = "24", h = w, colorScheme = "none" }: Props) => {
  const colorMap = new Map<string, string>([
    ["gray_1", "#525252"],
    ["gray_2", "#858585"],
    ["gray_3", "#B5B5B5"],
    ["gray_4", "#E9E9E9"],
    ["gray_5", "#F6F6F6"],
    ["black", "#000000"],
    ["darkBlack", "#292929"],
    ["none", "currentColor"]
  ]);
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill={colorMap.get(colorScheme)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5353 5.39299C8.92583 5.00247 9.55899 5.00247 9.94952 5.39299L15.6008 11.0443C15.6027 11.0461 15.6046 11.048 15.6065 11.05C15.997 11.4405 15.997 12.0736 15.6065 12.4642L9.94967 18.121C9.55914 18.5115 8.92598 18.5115 8.53545 18.121C8.14493 17.7305 8.14493 17.0973 8.53545 16.7068L13.4852 11.7571L8.5353 6.8072C8.14478 6.41668 8.14478 5.78352 8.5353 5.39299Z"
      />
    </svg>
  );
};

export default ArrowRightIcon;
