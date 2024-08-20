import type { IconProps } from "./types";

const BoyIcon = ({ w = 24, h = 24 }: IconProps) => {
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={24} height={24} y={0.5} fill="#FFF7E1" rx={12} />
      <path
        fill="#956F4C"
        fillRule="evenodd"
        d="M13.866 7.371a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V8.818l-2.353 2.354a6 6 0 1 1-1.372-1.456l2.344-2.345h-1.619ZM13.52 14.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default BoyIcon;
