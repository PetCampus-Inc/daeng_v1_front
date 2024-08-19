import type { IconProps } from "./types";

interface Props extends IconProps {
  rx?: number | string;
  isGray?: boolean;
}

const CalendarIcon = ({ className = "", w = "16", h = "17", rx = "4", isGray = false }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox={`0 0 16 17`}
      fill="none"
      className={className}
    >
      <rect width={16} height={17} rx={rx} fill={isGray ? "#F6F6F6" : "#FFF7E1"} />
      <path
        d="M3.33203 5.1684C3.33203 4.52419 3.85427 4.00195 4.49848 4.00195H11.4972C12.1414 4.00195 12.6636 4.52419 12.6636 5.1684V12.1671C12.6636 12.8113 12.1414 13.3335 11.4972 13.3335H4.49848C3.85427 13.3335 3.33203 12.8113 3.33203 12.1671V5.1684Z"
        fill="white"
      />
      <path
        d="M3.33203 5.1684C3.33203 4.52419 3.85427 4.00195 4.49848 4.00195H11.4972C12.1414 4.00195 12.6636 4.52419 12.6636 5.1684V6.33485H3.33203V5.1684Z"
        fill={isGray ? "#858585" : "#956F4C"}
      />
      <path
        d="M4.5 3.41916C4.5 3.09706 4.76112 2.83594 5.08322 2.83594C5.40533 2.83594 5.66645 3.09706 5.66645 3.41916V4.58561C5.66645 4.90771 5.40533 5.16883 5.08322 5.16883C4.76112 5.16883 4.5 4.90771 4.5 4.58561V3.41916Z"
        fill="#525252"
      />
      <path
        d="M4.5 8.08518C4.5 7.76307 4.76112 7.50195 5.08322 7.50195H8.58257C8.90467 7.50195 9.16579 7.76307 9.16579 8.08518C9.16579 8.40728 8.90467 8.6684 8.58257 8.6684H5.08322C4.76112 8.6684 4.5 8.40728 4.5 8.08518Z"
        fill={isGray ? "#B5B5B5" : "#E4CAB1"}
      />
      <path
        d="M4.5 10.4172C4.5 10.0951 4.76112 9.83398 5.08322 9.83398H10.9155C11.2376 9.83398 11.4987 10.0951 11.4987 10.4172C11.4987 10.7393 11.2376 11.0004 10.9155 11.0004H5.08322C4.76112 11.0004 4.5 10.7393 4.5 10.4172Z"
        fill={isGray ? "#B5B5B5" : "#E4CAB1"}
      />
      <path
        d="M10.332 3.41916C10.332 3.09706 10.5931 2.83594 10.9153 2.83594C11.2374 2.83594 11.4985 3.09706 11.4985 3.41916V4.58561C11.4985 4.90771 11.2374 5.16883 10.9153 5.16883C10.5931 5.16883 10.332 4.90771 10.332 4.58561V3.41916Z"
        fill="#525252"
      />
    </svg>
  );
};

export default CalendarIcon;
