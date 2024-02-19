interface PencilIconProps {
  handleTouch: () => void;
}

const PencilIcon = ({ handleTouch }: PencilIconProps) => {
  return (
    <button onClick={handleTouch}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.9948 18.9849L19 19.3333C18.9888 19.7047 18.6845 20 18.3129 20H5.68705C5.31549 20 5.01119 19.7047 5 19.3333L5.00525 18.9849C5.01348 18.4386 5.45872 18 6.00513 18H17.9949C18.5413 18 18.9865 18.4386 18.9948 18.9849Z"
          fill="#292929"
        />
        <mask id="path-3-inside-1_4260_124527" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.6999 7.44878L11.6996 7.44858L12.7129 5.69339C13.2726 4.72402 14.5121 4.39189 15.4815 4.95156C16.4509 5.51122 16.783 6.75075 16.2233 7.72011L15.7319 8.57122C15.7275 8.57946 15.7229 8.58766 15.7182 8.59582L14.7051 10.3505L14.7077 10.352L13.6943 12.1071L13.6918 12.1057L11.158 16.4942C10.9966 16.7739 10.7219 16.9475 10.4253 16.9905L8.27018 17.5598L7.59597 15.3785C7.56622 15.31 7.54412 15.2384 7.53003 15.1651L7.52728 15.1563L7.52849 15.1569C7.48647 14.9285 7.52239 14.6844 7.64765 14.4675L11.6999 7.44878Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.6999 7.44878L11.6996 7.44858L12.7129 5.69339C13.2726 4.72402 14.5121 4.39189 15.4815 4.95156C16.4509 5.51122 16.783 6.75075 16.2233 7.72011L15.7319 8.57122C15.7275 8.57946 15.7229 8.58766 15.7182 8.59582L14.7051 10.3505L14.7077 10.352L13.6943 12.1071L13.6918 12.1057L11.158 16.4942C10.9966 16.7739 10.7219 16.9475 10.4253 16.9905L8.27018 17.5598L7.59597 15.3785C7.56622 15.31 7.54412 15.2384 7.53003 15.1651L7.52728 15.1563L7.52849 15.1569C7.48647 14.9285 7.52239 14.6844 7.64765 14.4675L11.6999 7.44878Z"
          fill="#292929"
        />
        <path
          d="M11.6996 7.44858L10.8335 6.94858L10.3335 7.81467L11.1996 8.31465L11.6996 7.44858ZM11.6999 7.44878L12.5659 7.94878L13.066 7.08269L12.1998 6.58271L11.6999 7.44878ZM12.7129 5.69339L13.579 6.19339V6.19339L12.7129 5.69339ZM15.4815 4.95156L15.9815 4.08553L15.9815 4.08553L15.4815 4.95156ZM16.2233 7.72011L17.0893 8.22011L16.2233 7.72011ZM15.7319 8.57122L14.8659 8.07122L14.8591 8.08302L14.8526 8.09501L15.7319 8.57122ZM15.7182 8.59582L16.5842 9.09582L16.5842 9.09581L15.7182 8.59582ZM14.7051 10.3505L13.8391 9.85047L13.3391 10.7165L14.2052 11.2165L14.7051 10.3505ZM14.7077 10.352L15.5737 10.852L16.0738 9.98587L15.2076 9.48589L14.7077 10.352ZM13.6943 12.1071L13.1943 12.9732L14.0603 13.4732L14.5604 12.6071L13.6943 12.1071ZM13.6918 12.1057L14.1918 11.2396L13.3257 10.7396L12.8257 11.6057L13.6918 12.1057ZM11.158 16.4942L10.292 15.9942H10.292L11.158 16.4942ZM10.4253 16.9905L10.2817 16.0009L10.2252 16.0091L10.17 16.0237L10.4253 16.9905ZM8.27018 17.5598L7.31478 17.8551L7.59807 18.7716L8.52556 18.5266L8.27018 17.5598ZM7.59597 15.3785L8.55137 15.0832L8.53514 15.0306L8.51325 14.9802L7.59597 15.3785ZM7.53003 15.1651L8.51203 14.9762L8.50165 14.9223L8.48543 14.8698L7.53003 15.1651ZM7.52728 15.1563L8.02751 14.2904L5.81851 13.0142L6.57188 15.4516L7.52728 15.1563ZM7.52849 15.1569L7.02826 16.0228L8.90372 17.1063L8.512 14.9761L7.52849 15.1569ZM7.64765 14.4675L6.78163 13.9675L6.78163 13.9675L7.64765 14.4675ZM11.1996 8.31465L11.2 8.31484L12.1998 6.58271L12.1995 6.58252L11.1996 8.31465ZM11.8469 5.19339L10.8335 6.94858L12.5656 7.94858L13.579 6.19339L11.8469 5.19339ZM15.9815 4.08553C14.5338 3.24972 12.6827 3.74573 11.8469 5.19339L13.579 6.19339C13.8625 5.70231 14.4904 5.53406 14.9815 5.81758L15.9815 4.08553ZM17.0893 8.22011C17.9252 6.77245 17.4291 4.92134 15.9815 4.08553L14.9815 5.81758C15.4726 6.1011 15.6408 6.72904 15.3573 7.22011L17.0893 8.22011ZM16.598 9.07122L17.0893 8.22011L15.3573 7.22011L14.8659 8.07122L16.598 9.07122ZM16.5842 9.09581C16.5935 9.07975 16.6025 9.06362 16.6113 9.04743L14.8526 8.09501C14.8524 8.09529 14.8523 8.09556 14.8521 8.09582L16.5842 9.09581ZM15.5712 10.8505L16.5842 9.09582L14.8522 8.09582L13.8391 9.85047L15.5712 10.8505ZM15.2076 9.48589L15.2051 9.48441L14.2052 11.2165L14.2078 11.218L15.2076 9.48589ZM14.5604 12.6071L15.5737 10.852L13.8417 9.85195L12.8283 11.6071L14.5604 12.6071ZM13.1918 12.9717L13.1943 12.9732L14.1943 11.2411L14.1918 11.2396L13.1918 12.9717ZM12.0241 16.9942L14.5578 12.6057L12.8257 11.6057L10.292 15.9942L12.0241 16.9942ZM10.569 17.9801C11.1556 17.895 11.703 17.5503 12.0241 16.9942L10.292 15.9942C10.2908 15.9964 10.2899 15.9973 10.2897 15.9975C10.2895 15.9978 10.2892 15.998 10.2886 15.9984C10.2872 15.9993 10.2847 16.0004 10.2817 16.0009L10.569 17.9801ZM8.52556 18.5266L10.6807 17.9574L10.17 16.0237L8.01481 16.5929L8.52556 18.5266ZM6.64056 15.6738L7.31478 17.8551L9.22559 17.2645L8.55137 15.0832L6.64056 15.6738ZM6.54804 15.354C6.57594 15.4991 6.61971 15.6409 6.67868 15.7767L8.51325 14.9802C8.51274 14.979 8.5123 14.9777 8.51203 14.9762L6.54804 15.354ZM6.57188 15.4516L6.57463 15.4605L8.48543 14.8698L8.48269 14.8609L6.57188 15.4516ZM8.02872 14.2911L8.02751 14.2904L7.02706 16.0221L7.02826 16.0228L8.02872 14.2911ZM6.78163 13.9675C6.53315 14.3978 6.46161 14.8844 6.54498 15.3378L8.512 14.9761C8.51159 14.9739 8.51172 14.9724 8.51182 14.9718C8.51184 14.9716 8.51194 14.9705 8.51368 14.9675L6.78163 13.9675ZM10.8339 6.94878L6.78163 13.9675L8.51368 14.9675L12.5659 7.94878L10.8339 6.94878Z"
          fill="#292929"
          mask="url(#path-3-inside-1_4260_124527)"
        />
      </svg>
    </button>
  );
};

export default PencilIcon;
