import React from "react";

interface IStepProps {
  onNextStep: (role: "TEACHER" | "OWNER") => void;
}

const RoleSelectPage = ({ onNextStep }: IStepProps) => {
  return (
    <div>
      <button onClick={() => onNextStep("OWNER")}>원장으로 가입하기</button>
      <br />
      <button onClick={() => onNextStep("TEACHER")}>교사로 가입하기</button>
    </div>
  );
};

export default RoleSelectPage;
