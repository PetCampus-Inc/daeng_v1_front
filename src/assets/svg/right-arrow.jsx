const RightArrow = ({ w = "16", h = "16" }) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.80153 3.80464C6.06188 3.54429 6.48399 3.54429 6.74434 3.80464L10.5118 7.57215C10.5131 7.57341 10.5144 7.57467 10.5157 7.57594C10.776 7.83629 10.776 8.2584 10.5157 8.51875L6.74444 12.29C6.48409 12.5503 6.06198 12.5503 5.80163 12.29C5.54128 12.0296 5.54128 11.6075 5.80163 11.3472L9.10145 8.04736L5.80153 4.74745C5.54118 4.4871 5.54118 4.06499 5.80153 3.80464Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default RightArrow;
