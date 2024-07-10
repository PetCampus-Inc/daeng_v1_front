import { PATH } from "constants/path";

import BuildingIcon from "assets/svg/building-icon";
import CalendarIcon from "assets/svg/calendar";
import MapIcon from "assets/svg/map-pin-icon";
import PhoneIcon from "assets/svg/phone-basic";
import SchoolIcon from "assets/svg/school-icon";
import { MoreButton } from "components/common/Button/Templates";
import { useNavigate } from "react-router-dom";
import { Role } from "types/admin/admin.types";

import {
  StyledCard,
  StyledIcon,
  StyledItemWrapper,
  StyledList,
  StyledItemText,
  StyledTitle,
  StyledTitleContainer
} from "./styles";

import type { IOwnerInfo, ITeacherInfo } from "types/admin/mypage.types";

const CardTitle = ({ handleClick, text }: { handleClick: () => void; text: string }) => {
  return (
    <StyledTitleContainer>
      <StyledTitle>소속 유치원</StyledTitle>
      <MoreButton onClick={handleClick} gap={4} iconColorScheme="gray_3">
        {text}
      </MoreButton>
    </StyledTitleContainer>
  );
};

const InfoItem = ({ title, icon }: { title?: string; icon: JSX.Element }) => {
  return (
    <>
      <StyledIcon>{icon}</StyledIcon>
      <StyledItemText>{title}</StyledItemText>
    </>
  );
};

interface InfoCardProps<T extends Role> {
  data: T extends "ROLE_OWNER" ? IOwnerInfo : ITeacherInfo;
  role: Role;
}

const InfoCard = <T extends Role>({ data, role }: InfoCardProps<T>) => {
  const navigate = useNavigate();

  const isOwner = role === "ROLE_OWNER";

  const moreInfoText = isOwner ? "유치원 정보 수정" : "유치원 정보";
  const handleMoreInfoClick = () => {
    const path = isOwner ? PATH.ADMIN_MY_SCHOOL_INFO_EDIT : PATH.ADMIN_MY_SCHOOL_INFO;
    navigate(path);
  };

  const infoList = [
    { title: data.schoolName, icon: <SchoolIcon /> },
    { title: data.schoolNumber, icon: <PhoneIcon /> },
    {
      title: isOwner ? (data as IOwnerInfo)?.address : (data as ITeacherInfo)?.schoolAddress,
      icon: <MapIcon />
    },
    {
      title:
        (isOwner ? (data as IOwnerInfo)?.registeredDate : (data as ITeacherInfo)?.registeredDate)
          ?.map((num) => num.toString().padStart(2, "0"))
          ?.join(".") + `${isOwner ? ` 등록` : ` 가입`}`,
      icon: <CalendarIcon />
    }
  ];

  return (
    <>
      <CardTitle handleClick={handleMoreInfoClick} text={moreInfoText} />
      <StyledCard as="section">
        <StyledList as="ul">
          {infoList.map((item, index) => (
            <StyledItemWrapper key={index}>
              <InfoItem title={item.title} icon={item.icon} />
            </StyledItemWrapper>
          ))}
          {isOwner && (
            <StyledItemWrapper>
              <InfoItem
                title={"사업자등록번호 : " + (data as IOwnerInfo)?.registrationNumber}
                icon={<BuildingIcon />}
              />
            </StyledItemWrapper>
          )}
        </StyledList>
      </StyledCard>
    </>
  );
};

export default InfoCard;
