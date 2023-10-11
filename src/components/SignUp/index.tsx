import { Dispatch, SetStateAction, memo } from "react";
import Teacher from "./Teacher";

interface Props {
  currentMainStep: number;
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
  selectedRole: number;
}

const SingUp = ({
  currentMainStep,
  setCurrentMainStep,
  selectedRole,
}: Props) => {
  return (
    <>
      {selectedRole === 0 && (
        <Teacher
          currentMainStep={currentMainStep}
          setCurrentMainStep={setCurrentMainStep}
        />
      )}
      {/* {selectedRole === 1 && <Master/>} */}
    </>
  );
};

export default memo(SingUp);
