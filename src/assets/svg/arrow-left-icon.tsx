import type { IconProps } from "./types";

const ArrowLeftIcon = ({ w = "24", h = "24" }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M15.778 5.707a1 1 0 0 0-1.414 0l-5.651 5.651a1 1 0 0 0-.006 1.42l5.657 5.657a1 1 0 0 0 1.414-1.414l-4.95-4.95 4.95-4.95a1 1 0 0 0 0-1.414Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
