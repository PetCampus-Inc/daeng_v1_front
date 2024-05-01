import ApplicationBrownIcon from "assets/svg/application-brown-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import YellowApplication from "assets/svg/yellow-application";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISimpleSchoolFormList } from "types/Admin.type";

import * as S from "./styles";

interface ISimpleMembershipApplicationProps {
  isUsed?: boolean;
  data: ISimpleSchoolFormList;
  isEditable?: boolean;
  setSelectedList?: React.Dispatch<React.SetStateAction<number[]>>;
}

const SimpleMembershipApplication = ({
  isUsed = false,
  data,
  isEditable = false,
  setSelectedList
}: ISimpleMembershipApplicationProps) => {
  const navigate = useNavigate();

  const dateString = data.createdDate.map((num: number) => (num < 10 ? "0" + num : num)).join("-");
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(false);
  }, [isEditable]);

  const handleTouch = () => {
    if (isEditable && setSelectedList) {
      setIsSelected(!isSelected);
      setSelectedList((prev) =>
        isSelected ? prev.filter((id) => id !== data.schoolFormId) : [...prev, data.schoolFormId]
      );
    } else {
      navigate(`/admin/schoolManage/enrollment/list/${data.schoolFormId}`);
    }
  };

  return (
    <S.Container onClick={() => handleTouch()} $isUsed={isUsed} $isSelected={isSelected}>
      <S.LeftBox>
        <S.Image>{isUsed ? <YellowApplication /> : <ApplicationBrownIcon />}</S.Image>
        <S.TextWrapper>
          <S.Title>{data.schoolFormName}</S.Title>
          <S.MiddleText>
            {isUsed ? "현재 사용중인 신청서에요" : "이전에 작성된 신청서에요"}
          </S.MiddleText>
          <S.Date>{dateString} 작성됨</S.Date>
        </S.TextWrapper>
      </S.LeftBox>
      <ArrowRightIcon />
    </S.Container>
  );
};

export default SimpleMembershipApplication;
