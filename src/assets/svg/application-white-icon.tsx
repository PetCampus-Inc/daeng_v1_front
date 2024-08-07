export type IconProps = {
  borderStyle?: string;
};

const ApplicationWhiteIcon = ({ borderStyle = "" }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: `${borderStyle}` }}
    >
      <rect width="24" height="24" rx="8" fill="#FFF7E1" />
      <path
        d="M17 3.5C17.8284 3.5 18.5 4.17157 18.5 5L18.5 19C18.5 19.8284 17.8284 20.5 17 20.5L7 20.5C6.17157 20.5 5.5 19.8284 5.5 19L5.5 5C5.5 4.17157 6.17157 3.5 7 3.5L17 3.5Z"
        fill="white"
        stroke="#E4CAB1"
      />
      <rect x="7" y="6.11816" width="8" height="1" fill="#E9E9E9" />
      <rect x="7" y="8.11816" width="6" height="1" fill="#E9E9E9" />
      <rect x="7" y="10" width="6" height="1" fill="#E9E9E9" />
      <path
        d="M15.8579 18.9976C15.6796 19.3064 15.2849 19.4121 14.9762 19.2339L13.8582 18.5884C13.5495 18.4102 13.4437 18.0154 13.6219 17.7067L16.5265 12.6758C16.7048 12.367 17.0995 12.2613 17.4083 12.4395L18.5262 13.085C18.835 13.2632 18.9408 13.658 18.7625 13.9667L15.8579 18.9976Z"
        fill="#956F4C"
      />
      <path
        d="M18.4414 14.5273L16.2054 13.2364L16.8509 12.1184C17.2074 11.501 17.9969 11.2894 18.6144 11.6459C19.2318 12.0024 19.4434 12.7919 19.0869 13.4094L18.4414 14.5273Z"
        fill="#C8A584"
      />
      <path
        d="M17.4727 16.2031L15.2367 14.9122L15.8822 13.7942L18.1181 15.0851L17.4727 16.2031Z"
        fill="#FFF0C8"
      />
      <path d="M14.0187 19.6761L15.5134 19.2813L13.5455 18.1452L14.0187 19.6761Z" fill="#956F4C" />
    </svg>
  );
};

export default ApplicationWhiteIcon;
