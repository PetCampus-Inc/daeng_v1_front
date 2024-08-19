import type { IconSize } from "./types";

export type IconProps = {
  borderStyle?: string;
} & IconSize;

const CalendarExpireIcon = ({ w = "24", h = "24", borderStyle = "" }: IconProps) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: `${borderStyle}` }}
    >
      <rect width="24" height="24" rx="8" fill="#FFF7E1" />
      <path
        d="M5 6.75C5 5.7835 5.7835 5 6.75 5H17.25C18.2165 5 19 5.7835 19 6.75V17.25C19 18.2165 18.2165 19 17.25 19H6.75C5.7835 19 5 18.2165 5 17.25V6.75Z"
        fill="#EEE3D9"
      />
      <path
        d="M5 6.5C5 5.67157 5.7835 5 6.75 5H17.25C18.2165 5 19 5.67157 19 6.5V8H5V6.5Z"
        fill="#956F4C"
      />
      <path
        d="M7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6V4Z"
        fill="#525252"
      />
      <path
        d="M15 4C15 3.44772 15.4477 3 16 3C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6V4Z"
        fill="#525252"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9987 9.69141C11.6305 9.69141 11.332 9.98988 11.332 10.3581V13.0247C11.332 13.3929 11.6305 13.6914 11.9987 13.6914C12.3669 13.6914 12.6654 13.3929 12.6654 13.0247V10.3581C12.6654 9.98988 12.3669 9.69141 11.9987 9.69141ZM12.0013 15.0957C11.6748 15.0957 11.4102 15.3604 11.4102 15.6868C11.4102 16.0133 11.6748 16.2779 12.0013 16.2779C12.3277 16.2779 12.5924 16.0133 12.5924 15.6868C12.5924 15.3604 12.3277 15.0957 12.0013 15.0957Z"
        fill="#956F4C"
      />
    </svg>
  );
};

export default CalendarExpireIcon;
