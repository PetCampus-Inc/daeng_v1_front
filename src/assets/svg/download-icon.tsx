interface IconProps {
  colorScheme?: ColorKeysScheme;
  opacity?: number;
  w?: number | string;
  h?: number | string;
  hasRect?: boolean;
}

type ColorKeysScheme = "gray" | "brown" | "black";

const DownloadIcon = ({
  w = 24,
  h = 24,
  colorScheme = "brown",
  opacity = 1,
  hasRect = false
}: IconProps) => {
  const colorMap = new Map<string, string[]>([
    ["brown", ["#956F4C", "#C8A584", "none"]],
    ["black", ["#E9E9E9", "#E9E9E9", "#292929"]]
  ]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${w}`}
      height={`${h}`}
      viewBox="0 0 20 20"
      fill="none"
    >
      {hasRect && (
        <rect
          width="20"
          height="20"
          rx="10"
          fill={colorMap.get(colorScheme)?.[2]}
          fillOpacity={opacity}
        />
      )}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3322 12.5454C10.1533 12.7551 9.84732 12.7551 9.66842 12.5454L6.78783 9.16761C6.52049 8.85413 6.72575 8.34606 7.11973 8.34606H7.77667C7.75344 8.24829 7.74108 8.14579 7.74108 8.04016L7.74108 5.59296C7.74108 4.91719 8.24683 4.36936 8.8707 4.36936H11.1299C11.7538 4.36936 12.2596 4.91719 12.2596 5.59296L12.2596 8.04016C12.2596 8.14579 12.2472 8.24829 12.224 8.34606H12.8809C13.2749 8.34606 13.4802 8.85413 13.2128 9.16761L10.3322 12.5454Z"
        fill={colorMap.get(colorScheme)?.[0]}
      />
      <path
        d="M3 14.9688C3 14.4165 3.44772 13.9688 4 13.9688L16 13.9688C16.5523 13.9688 17 14.4165 17 14.9688C17 15.5211 16.5523 15.9688 16 15.9688L4 15.9688C3.44772 15.9688 3 15.5211 3 14.9688Z"
        fill={colorMap.get(colorScheme)?.[1]}
      />
    </svg>
  );
};

export default DownloadIcon;
