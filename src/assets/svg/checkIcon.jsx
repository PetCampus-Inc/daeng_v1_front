const CheckIcon = ({ className = "", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="9"
      viewBox="0 0 13 9"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M1.43359 3.36984L5.16279 7.35929L11.5539 1.28711"
        stroke="currentColor"
        strokeWidth="2.02406"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
