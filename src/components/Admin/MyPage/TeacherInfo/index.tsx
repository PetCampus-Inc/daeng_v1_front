import Calendar from "assets/svg/calendar";
import Map from "assets/svg/map-pin-icon";
import Phone from "assets/svg/phone-basic";
import RightArrow from "assets/svg/right-arrow";
import School from "assets/svg/school";
import TransparentButton from "components/common/Button/TransparentButton/index";
import { PageContainer } from "styles/StyleModule";

import * as S from "./styles";

import type { ITeacherInfo } from "types/admin.mypage.type";

interface TeacherInfoProps {
  data: ITeacherInfo;
}

interface InfoItem {
  title: string;
  icon: JSX.Element;
}

const SchoolInfo = ({ data }: TeacherInfoProps) => {
  const infoList: InfoItem[] = [
    {
      title: data.schoolName,
      icon: <School />
    },
    {
      title: data.schoolNumber,
      icon: <Phone />
    },
    {
      title: data.schoolAddress,
      icon: <Map />
    },
    {
      title: data.enrollDate.map((num) => num.toString().padStart(2, "0")).join("."),
      icon: <Calendar />
    }
  ];
  return (
    <>
      <PageContainer color="BGray" pb="2.5">
        <S.TitleContainer>
          <S.Title>소속 유치원</S.Title>

          <S.ButtonWrapper>
            <TransparentButton rightAddon={<RightArrow w={"20"} h={"20"} />}>
              {" "}
              {/* TODO: onClick 추가 */}
              유치원 정보
            </TransparentButton>
          </S.ButtonWrapper>
        </S.TitleContainer>

        <S.InfoContainer>
          {infoList.map((item, index) => (
            <S.InfoList key={index}>
              <S.IconWrapper>{item.icon}</S.IconWrapper>
              <S.ListTitle>{item.title}</S.ListTitle>
            </S.InfoList>
          ))}
        </S.InfoContainer>
      </PageContainer>
    </>
  );
};

export default SchoolInfo;
