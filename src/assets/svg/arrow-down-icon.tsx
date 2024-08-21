import type { IconSize } from "./types";

interface IconProps extends IconSize {
  className?: string;
}

const ArrowDownIcon = ({ className = "", w = "16", h = "16" }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.422 5.805c.26.26.26.683 0 .943l-3.768 3.768-.003.004a.667.667 0 0 1-.943 0L3.937 6.748a.667.667 0 1 1 .942-.942l3.3 3.3 3.3-3.3c.26-.26.683-.26.943 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ArrowDownIcon;
