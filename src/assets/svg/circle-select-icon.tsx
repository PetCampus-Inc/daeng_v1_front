interface ICircleSelectIconProp {
  isChosen?: boolean;
}

const CircleSelectIcon = ({ isChosen = false }: ICircleSelectIconProp) => {
  return isChosen ? (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ translate: "4px -4px" }}
    >
      <circle cx="15" cy="15" r="12" fill="#EE7821" />
      <circle cx="15" cy="15" r="13.5" stroke="#EE7821" strokeOpacity="0.5" strokeWidth="3" />
    </svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="13"
        cy="13"
        r="11.5"
        fill="white"
        fillOpacity="0.7"
        stroke="#E9E9E9"
        strokeWidth="3"
      />
    </svg>
  );
};

export default CircleSelectIcon;
