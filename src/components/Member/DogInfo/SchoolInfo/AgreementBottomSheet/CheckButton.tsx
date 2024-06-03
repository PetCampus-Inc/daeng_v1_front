import CheckCircleGray from "assets/svg/check-circle-gray";
import CheckCircleYellow from "assets/svg/check-circle-yellow";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CSS } from "styled-components/dist/types";

interface ICheckButton {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckButton = ({ isChecked, setIsChecked }: ICheckButton) => {
  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Button onClick={handleClick} className={isChecked ? "" : "disable"}>
      {isChecked ? <CheckCircleYellow /> : <CheckCircleGray />}
      {"위 변경 사항에 동의해요"}
    </Button>
  );
};

export default CheckButton;

const Button = styled.button`
  width: 100%;
  padding: 0.688rem;
  margin: 1.5rem 0 5rem 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.body2_16_R};

  &.disable {
    background-color: ${({ theme }) => theme.colors.gray_5};
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;
