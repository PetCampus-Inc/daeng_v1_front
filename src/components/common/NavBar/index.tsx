import { Container, StyledNavBtn, StyledImage } from "./styles";
import { memo } from "react";
import usePathParams from "hooks/usePathParams";
import Text from "../Text";
import { ThemeConfig } from "styles/ThemeConfig";

interface Props {
  type?: string;
}

// **경로 수정 필요** //
const Navbar = ({ type }: Props) => {
  const path: string = usePathParams();

  return (
    <Container>
      {type === "admin" ? (
        <>
          <StyledNavBtn to={"/admin/attendance"} type={type}>
            <StyledImage
              src="/images/admin-attendance.png"
              alt="admin-attendance"
            />
            <Text
              text="출석부"
              color={path === "/admin/attendance" ? ThemeConfig.red_1 : "black"}
              weight="bold"
            />
          </StyledNavBtn>
          <StyledNavBtn to={"/"} type={type}>
            <StyledImage src="/images/admin-mydog.png" alt="admin-mydog" />
            <Text
              text="내가 맡은 강아지"
              color={path === "/" ? ThemeConfig.red_1 : "black"}
              weight="bold"
            />
          </StyledNavBtn>
          <StyledNavBtn to={"/"} type={type}>
            <StyledImage src="/images/admin-mypage.png" alt="admin-mypage" />
            <Text
              text="마이페이지"
              color={path === "/" ? ThemeConfig.red_1 : "black"}
              weight="bold"
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
