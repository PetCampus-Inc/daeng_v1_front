import type { IconProps } from "./add-c-icon";

interface Props extends Omit<IconProps, "colorScheme"> {
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

const ArrowRightIcon = ({ className = "", w = "16", h = w, colorScheme = "none" }: Props) => {
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
      className={className}
      width={w}
      height={h}
      viewBox="0 0 15 17"
      fill={colorMap.get(colorScheme)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.80153 3.80464C6.06188 3.54429 6.48399 3.54429 6.74434 3.80464L10.5118 7.57215C10.5131 7.57341 10.5144 7.57467 10.5157 7.57594C10.776 7.83629 10.776 8.2584 10.5157 8.51875L6.74444 12.29C6.48409 12.5503 6.06198 12.5503 5.80163 12.29C5.54128 12.0296 5.54128 11.6075 5.80163 11.3472L9.10145 8.04736L5.80153 4.74745C5.54118 4.4871 5.54118 4.06499 5.80153 3.80464Z"
        fill={colorMap.get(colorScheme)}
      />
    </svg>
  );
};

export default ArrowRightIcon;
