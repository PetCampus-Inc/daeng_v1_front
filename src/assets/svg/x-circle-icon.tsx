interface IconProps {
  className?: string;
  colorScheme?: TColorScheme;
  opacity?: number;
  w?: number | string;
  h?: number | string;
}
type TColorScheme = "gray" | "brown" | "black";

const XCircleIcon = ({
  className = "",
  colorScheme = "gray",
  opacity = 1,
  w = 25,
  h = 25
}: IconProps) => {
  const colorMap = new Map<string, string[]>([
    ["gray", ["#B5B5B5", "#E9E9E9"]],
    ["brown", ["#956F4C", "#EEE3D9"]],
    ["black", ["#292929", "#E9E9E9"]]
  ]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${w}`}
      height={`${h}`}
      fill="none"
      viewBox="0 0 25 25"
      className={className}
    >
      <circle
        className="icon-circle"
        cx="12.311"
        cy="12.365"
        r="8.096"
        fill={colorMap.get(colorScheme)?.[0]}
        opacity={opacity}
      />
      <path
        fill={colorMap.get(colorScheme)?.[1]}
        fillRule="evenodd"
        d="M8.94 8.992a.954.954 0 0 0 0 1.35l2.024 2.024L8.94 14.39a.954.954 0 0 0 1.349 1.35l2.024-2.025 2.025 2.024a.954.954 0 1 0 1.349-1.35l-2.024-2.023 2.023-2.024a.954.954 0 0 0-1.349-1.35l-2.024 2.024-2.023-2.024a.954.954 0 0 0-1.35 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default XCircleIcon;
