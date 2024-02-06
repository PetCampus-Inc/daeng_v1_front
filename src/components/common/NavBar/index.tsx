import { Container, StyledNavBtn, StyledImage } from "./styles";
import { memo } from "react";
import usePathParams from "hooks/common/usePathParams";
import Text from "../Text";
import { ThemeConfig } from "styles/ThemeConfig";
import Attendance from "assets/svg/attendance";
import GrayCheckBoard from "assets/svg/gray-check-board";
import School from "assets/svg/school";
import MyPageDog from "assets/svg/my-page";
import GrayAttendance from "assets/svg/gray-attendance";
import { PATH } from "constants/path";

interface Props {
  type?: string;
  show?: string;
  attendance?: string;
}

// **경로 수정 필요** //
const Navbar = ({ type, show, attendance }: Props) => {
  const path: string = usePathParams();

  return (
    <Container display={show}>
      {type === "admin" ? (
        <>
          <StyledNavBtn to={PATH.ADMIN_ATTENDANCE} type={type}>
            {path === PATH.ADMIN_ATTENDANCE || PATH.ADMIN_DOG_INFO ? (
              <Attendance />
            ) : (
              <GrayAttendance />
            )}
            <Text
              text="출석부"
              color={
                path === PATH.ADMIN_ATTENDANCE || PATH.ADMIN_DOG_INFO
                  ? ThemeConfig.primaryColor
                  : ThemeConfig.gray_3
              }
              weight={(path === PATH.ADMIN_ATTENDANCE || PATH.ADMIN_DOG_INFO) && "bold"}
              size="0.9rem"
            />
          </StyledNavBtn>
          <StyledNavBtn to={"/"} type={type}>
            {path === "/" ? <GrayCheckBoard /> : <GrayCheckBoard />}
            <Text
              text="강아지 관리"
              color={path === "/" ? ThemeConfig.primaryColor : ThemeConfig.gray_3}
              size="0.9rem"
            />
          </StyledNavBtn>
          <StyledNavBtn to={"/"} type={type}>
            <School />
            <Text
              text="유치원 운영"
              color={path === "/" ? ThemeConfig.primaryColor : ThemeConfig.gray_3}
              size="0.9rem"
            />
          </StyledNavBtn>
          <StyledNavBtn to={"/"} type={type}>
            <MyPageDog />
            <Text
              text="마이페이지"
              color={path === "/" ? ThemeConfig.primaryColor : ThemeConfig.gray_3}
              size="0.9rem"
            />
          </StyledNavBtn>
        </>
      ) : (
        <>
          <StyledNavBtn to={"/"}>홈</StyledNavBtn>
          <StyledNavBtn to={"/"}>알림장</StyledNavBtn>
          <StyledNavBtn to={"/"}>유치원</StyledNavBtn>
          <StyledNavBtn to={"/"}>견주마이</StyledNavBtn>
        </>
      )}
    </Container>
  );
};

export default memo(Navbar);
