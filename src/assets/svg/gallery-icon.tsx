interface GalleryIconProps {
  handleTouch: () => void;
}

const GalleryIcon = ({ handleTouch }: GalleryIconProps) => {
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
          d="M7 4H17C18.6569 4 20 5.34315 20 7V14V16V17C20 18.6569 18.6569 20 17 20H7C5.34314 20 4 18.6569 4 17V16V14V7C4 5.34314 5.34315 4 7 4ZM18 7V14H14.4453L14.4304 13.9837L13.4177 12.8987C13.0403 12.4944 12.4063 12.4732 12.0027 12.8515L11.6104 13.2193L10.3724 11.8044C9.99147 11.3691 9.32174 11.3468 8.9127 11.7558L6.70896 13.9595C6.69567 13.9728 6.68285 13.9863 6.67051 14H6V7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7ZM6 17V16H18V17C18 17.5523 17.5523 18 17 18H7C6.44772 18 6 17.5523 6 17ZM15.1667 9.33333C15.811 9.33333 16.3333 8.811 16.3333 8.16667C16.3333 7.52233 15.811 7 15.1667 7C14.5223 7 14 7.52233 14 8.16667C14 8.811 14.5223 9.33333 15.1667 9.33333Z"
          fill="#292929"
        />
      </svg>
    </button>
  );
};

export default GalleryIcon;
