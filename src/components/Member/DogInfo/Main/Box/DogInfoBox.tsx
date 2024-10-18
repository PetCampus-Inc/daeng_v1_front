import { FIELD } from "constants/field";
import { routes } from "constants/path";

import ArrowRightIcon from "assets/svg/arrow-right-icon";
import CalendarIcon from "assets/svg/calendar";
import DogCardIcon from "assets/svg/dog-card-icon";
import GirlNormalIcon from "assets/svg/girl-normal-icon";
import { Flex } from "components/common";
import { useDogDisconnected } from "hooks/member/useDogDisconnected";
import { useNavigate } from "react-router-dom";
import { MemberDogInfoFormData } from "types/member/main.types";
import { formatDate } from "utils/formatter";

import * as S from "../../styles";
import InfoText from "../DogInfo/InfoText";

interface DogInfoProps {
  data: MemberDogInfoFormData;
  dogId: number;
}

const DogInfoBox = ({ data, dogId }: DogInfoProps) => {
  const navigate = useNavigate();

  // 유치원 끊긴 강아지 여부
  const { isDisconnected } = useDogDisconnected();

  const DOG_BIRETH = formatDate(
    String(data[FIELD.BIRTHDAY][0]),
    String(data[FIELD.BIRTHDAY][1]),
    String(data[FIELD.BIRTHDAY][2]),
    "dot"
  );

  return (
    <S.DogInfoCard>
      <S.BgImg>
        <img src={data.profileUri} alt="card-bg" />
      </S.BgImg>
      <S.DogInfoBox>
        <S.ImageBox
          width="52px"
          height="52px"
          overflow="hidden"
          position="relative"
          borderRadius="circle"
        >
          {data.profileUri ? <img src={data?.profileUri} alt="dog-profile" /> : null}
        </S.ImageBox>
        <S.TextWrapper>
          <S.TopInfoBox>
            <S.Title>
              <S.DogName>{data.dogName}</S.DogName>
              <S.DogSize>{data.dogSize}</S.DogSize>
            </S.Title>
            {!isDisconnected && (
              <S.Editbutton
                onClick={() => navigate(routes.member.dogInfo.edit.dynamic(String(dogId)))}
              >
                <span>수정</span>
                <ArrowRightIcon />
              </S.Editbutton>
            )}
          </S.TopInfoBox>
          <Flex wrap="wrap" gap="8">
            <InfoText
              icon={<GirlNormalIcon />}
              text={`${data.dogGender} / 중성화 ${data.neutralization === "NEUTERED" ? "O" : "X"}`}
            />

            <InfoText icon={<CalendarIcon />} text={DOG_BIRETH} />
            <InfoText icon={<DogCardIcon />} text={data.breedName} />
          </Flex>
        </S.TextWrapper>
      </S.DogInfoBox>

      <S.GotoEnrollButton
        onClick={() =>
          navigate(
            routes.member.dogInfo.enrollment.dynamic(String(dogId), String(data.enrollmentFormId))
          )
        }
      >
        <span>{data.dogName}의 가입신청서</span>
        <ArrowRightIcon />
      </S.GotoEnrollButton>
    </S.DogInfoCard>
  );
};

export default DogInfoBox;
