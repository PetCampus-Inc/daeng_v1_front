import * as S from "./styles";
import RightArrow from "assets/svg/right-arrow";
import YellowApplication from "assets/svg/yellow-application";
import BrownApplication from "assets/svg/brown-application";
import { ISimpleSchoolFormList } from "types/Admin.type";

interface ISimpleMembershipApplicationProps {
  isUsed?: boolean;
  data: ISimpleSchoolFormList;
}

const SimpleMembershipApplication = ({
  isUsed = false,
  data
}: ISimpleMembershipApplicationProps) => {
  const dateString = data.createdDate.map((num: number) => (num < 10 ? "0" + num : num)).join("-");

  return (
    <S.Container to={`/list/${data.schoolFormId}`}>
      <S.LeftBox>
        <S.Image>{isUsed ? <YellowApplication /> : <BrownApplication />}</S.Image>
        <S.TextWrapper>
          <S.Title>{data.schoolFormName}</S.Title>
          <S.MiddleText>
            {isUsed ? "현재 사용중인 신청서에요" : "이전에 작성된 신청서에요"}
          </S.MiddleText>
          <S.Date>{dateString} 작성됨</S.Date>
        </S.TextWrapper>
      </S.LeftBox>
      <RightArrow />
    </S.Container>
  );
};

export default SimpleMembershipApplication;
