export type IconProps = {
  className?: string;
  colorScheme?: "gray";
  w?: string;
  h?: string;
};

const AddCIcon = ({ className = "", w = "36", h = w, colorScheme = "gray" }: IconProps) => {
  const colorMap = new Map([["gray", ["#B5B5B5", "#F6F6F6"]]]);
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="17.9961" cy="18.002" r="12" fill={colorMap.get(colorScheme)?.[0]} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9306 17.9989C10.9306 18.7799 11.5638 19.4131 12.3448 19.4131H16.5866L16.5866 23.657C16.5866 24.4381 17.2197 25.0712 18.0008 25.0712C18.7818 25.0712 19.415 24.4381 19.415 23.657V19.4131L23.6585 19.4131C24.4395 19.4131 25.0727 18.7799 25.0727 17.9989C25.0727 17.2179 24.4395 16.5847 23.6585 16.5847H19.415V12.3434C19.415 11.5624 18.7818 10.9292 18.0008 10.9292C17.2197 10.9292 16.5866 11.5624 16.5866 12.3434L16.5866 16.5847H12.3448C11.5638 16.5847 10.9306 17.2179 10.9306 17.9989Z"
        fill={colorMap.get(colorScheme)?.[1]}
      />
    </svg>
  );
};

export default AddCIcon;
