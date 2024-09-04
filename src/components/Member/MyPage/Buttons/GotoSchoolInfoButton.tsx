import ArrowRightIcon from "assets/svg/arrow-right-icon";

import * as S from "./styles";

interface ISchoolInfoButtonProps {
  onClick: () => void;
  isOpen?: boolean;
  pr?: string;
  schoolInfo?: string;
}

const GotoSchoolInfoButton = ({ onClick, isOpen, pr, schoolInfo }: ISchoolInfoButtonProps) => {
  return (
    <S.GotoSchoolInfoButton pr={pr} onClick={onClick}>
      {schoolInfo ? (
        <>
          <span>{schoolInfo} 유치원</span>
          {!isOpen && <ArrowRightIcon w={19} />}
        </>
      ) : (
        <span>등록된 유치원 없음</span>
      )}
    </S.GotoSchoolInfoButton>
  );
};

export default GotoSchoolInfoButton;
