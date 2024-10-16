interface Props {
  w?: string;
  h?: string;
  bg?: boolean;
  colorScheme?: "gray" | "yellow";
}

const PhotoIcon = ({ w = "24", h = "24", bg = false, colorScheme = "yellow" }: Props) => {
  const colorMap = new Map<string, string>([
    ["gray", "#E9E9E9"],
    ["yellow", "#FFF7E1"]
  ]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none">
      {bg && <rect width="40" height="40" rx="20" fill={colorMap.get(colorScheme)} />}
      <rect x="0.332031" y="0.333984" width="23.3333" height="23.3333" rx="1" fill="#C8A584" />
      <rect x="2.27734" y="2.2793" width="19.4444" height="15.5556" rx="1" fill="#E4CAB1" />
      <path
        d="M9.2993 10.8125L3.98445 16.1273C3.35449 16.7573 3.80065 17.8344 4.69156 17.8344H14.6569C15.5161 17.8344 15.9752 16.8225 15.4095 16.1759L10.759 10.8611C10.3781 10.4257 9.70834 10.4034 9.2993 10.8125Z"
        fill="white"
      />
      <path
        d="M15.5458 12.6855L11.8995 16.1038C11.2382 16.7238 11.6769 17.8333 12.5835 17.8333H19.4201C20.2945 17.8333 20.7478 16.7902 20.1512 16.151L16.9607 12.7327C16.5833 12.3283 15.9493 12.3071 15.5458 12.6855Z"
        fill="white"
      />
      <ellipse cx="17.8312" cy="6.1671" rx="1.94444" ry="1.94444" fill="white" />
    </svg>
  );
};

export default PhotoIcon;
