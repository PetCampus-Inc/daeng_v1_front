import { PATH } from "constants/path";

import CalendarIcon from "assets/svg/calendar";
import MapIcon from "assets/svg/map-pin-icon";
import PhoneIcon from "assets/svg/phone-basic";
import RightArrow from "assets/svg/right-arrow";
import SchoolIcon from "assets/svg/school-icon";
import SimpleButton from "components/common/Button/SimpleButton";
import { useNavigate } from "react-router-dom";

import {
  MoreButtonStyle,
  StyledCard,
  StyledIcon,
  StyledItemWrapper,
  StyledList,
  StyledItemText,
  StyledTitle,
  StyledTitleContainer
} from "./styles";

import type { IOwnerInfo, ITeacherInfo } from "types/admin/mypage.type";
import type { TRole } from "types/admin.userInfo.type";

const CardTitle = ({ handleClick, text }: { handleClick: () => void; text: string }) => {
  return (
    <StyledTitleContainer>
      <StyledTitle>소속 유치원</StyledTitle>
      <SimpleButton
        p={0}
        onClick={handleClick}
        rightAddon={<RightArrow w={"20"} h={"20"} />}
        customStyle={MoreButtonStyle}
      >
        {text}
      </SimpleButton>
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

interface InfoCardProps<T extends TRole> {
  data: T extends "ROLE_OWNER" ? IOwnerInfo : ITeacherInfo;
  role: TRole;
}

const InfoCard = <T extends TRole>({ data, role }: InfoCardProps<T>) => {
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
      title: (isOwner ? (data as IOwnerInfo)?.registeredDate : (data as ITeacherInfo)?.enrollDate)
        ?.map((num) => num.toString().padStart(2, "0"))
        ?.join("."),
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
        </StyledList>
      </StyledCard>
    </>
  );
};

export default InfoCard;
