interface Props {
  isGray?: boolean;
}

const BasicPhoneIcon = ({ isGray = false }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none">
      <rect width="24" height="24" y=".5" fill={isGray ? "#F6F6F6" : "#FFF7E1"} rx="8" />
      <path
        fill={isGray ? "#858585" : "#956F4C"}
        fillRule="evenodd"
        d="M6.54 5.8a.795.795 0 0 1 .178-.05l1.553-.24a.783.783 0 0 1 .882.58L9.84 8.86a.768.768 0 0 1-.344.837l-1.295.803c.282.916.672 1.856 1.195 2.747.786 1.34 1.87 2.566 3.348 3.443a.767.767 0 0 1 .214-.306l1.235-1.08a.792.792 0 0 1 .911-.091l2.505 1.426c.353.201.49.635.317.999l-.67 1.402a.772.772 0 0 1-.262.306.789.789 0 0 1-.561.147c-4.205-.497-6.837-2.82-8.393-5.472C6.499 11.4 6 8.442 6 6.534c0-.343.227-.634.54-.734Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default BasicPhoneIcon;
