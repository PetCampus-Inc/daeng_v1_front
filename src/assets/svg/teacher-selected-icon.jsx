const TeacherSelectedIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
      <g clipPath="url(#a)">
        <rect width="80" height="80" fill="#956F4C" rx="40" />
        <g filter="url(#b)">
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M18.532 52.876a8.419 8.419 0 0 1-4.983-1.114c-4.056-2.356-5.452-7.564-3.117-11.632l2.77-4.826a9.464 9.464 0 0 1 6.317-10.079c1.777-3.48 5.364-5.89 9.512-5.94a21.018 21.018 0 0 1 10.051-2.54c3.64 0 7.066.92 10.055 2.543.077-.002.155-.003.233-.003 4.227 0 7.888 2.455 9.671 6.006a9.465 9.465 0 0 1 6.132 10.013l2.77 4.826c2.335 4.068.94 9.276-3.117 11.632a8.418 8.418 0 0 1-5.185 1.094c-1.436 4.313-5.492 7.45-10.271 7.45-1.173 0-2.302-.188-3.359-.537a10.84 10.84 0 0 1-5.728 1.626h-3.481a10.84 10.84 0 0 1-5.373-1.415c-.842.213-1.724.327-2.632.327-4.772 0-8.823-3.128-10.265-7.43Z"
            clipRule="evenodd"
          />
          <path
            fill="#525252"
            d="M36.672 43.679c0-.955.774-1.729 1.728-1.729h.864c.955 0 1.729.774 1.729 1.729 0 .636-.516 1.152-1.152 1.152h-2.017a1.152 1.152 0 0 1-1.152-1.152Z"
          />
          <rect
            width="3.601"
            height="3.601"
            x="31.273"
            y="39.069"
            fill="#525252"
            rx="1.8"
          />
          <rect
            width="9.722"
            height="9.722"
            x="24.07"
            y="42.671"
            fill="#EED5CD"
            rx="4.861"
          />
          <rect
            width="9.722"
            height="9.722"
            x="43.875"
            y="42.671"
            fill="#EED5CD"
            rx="4.861"
          />
          <rect
            width="3.601"
            height="3.601"
            x="42.793"
            y="39.069"
            fill="#525252"
            rx="1.8"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <rect width="80" height="80" fill="#fff" rx="40" />
        </clipPath>
        <filter
          id="b"
          width="75.773"
          height="60.651"
          x="5.301"
          y="13.744"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="4" dy="5" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.533936 0 0 0 0 0.38975 0 0 0 0 0.256948 0 0 0 0.3 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4270_48552"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_4270_48552"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default TeacherSelectedIcon;
