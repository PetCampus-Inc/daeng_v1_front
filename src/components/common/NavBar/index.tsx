import { Container, StyledNavBtn, StyledImage } from "./styles";
import { memo } from "react";
import usePathParams from "hooks/usePathParams";
import Text from "../Text";
import { ThemeConfig } from "styles/ThemeConfig";
import Attendance from "assets/svg/attendance";

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
          <StyledNavBtn to={attendance || "/admin/attendance"} type={type}>
            <Attendance />
            <Text
              text="출석부"
              color={
                path === "/admin/attendance" || "admin/dogInfo"
                  ? ThemeConfig.primaryColor
                  : ThemeConfig.gray_3
              }
              weight={
                (path === "/admin/attendance" || "admin/dogInfo") && "bold"
              }
              size="0.9rem"
            />
          </StyledNavBtn>
          <StyledNavBtn to={"/"} type={type}>
            <StyledImage src="/images/admin-mydog.png" alt="admin-mydog" />
            <Text
              text="내가 맡은 강아지"
              color={
                path === "/" ? ThemeConfig.primaryColor : ThemeConfig.gray_3
              }
              size="0.9rem"
            />
          </StyledNavBtn>
          <StyledNavBtn to={"/"} type={type}>
            <StyledImage src="/images/admin-mypage.png" alt="admin-mypage" />
            <Text
              text="마이페이지"
              color={
                path === "/" ? ThemeConfig.primaryColor : ThemeConfig.gray_3
              }
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
