const GrayAlertIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
      <rect width="16" height="16" fill="#F7F7F7" rx="4" />
      <circle cx="8.001" cy="7.999" r="5.333" fill="#B5B5B5" />
      <path
        fill="#F7F7F7"
        fillRule="evenodd"
        d="M7.999 4.707a.667.667 0 0 0-.667.667V8.04a.667.667 0 0 0 1.333 0V5.374A.667.667 0 0 0 8 4.707Zm0 5.404a.591.591 0 1 0 0 1.183.591.591 0 0 0 0-1.183Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default GrayAlertIcon;
