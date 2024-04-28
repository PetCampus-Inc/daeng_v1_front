import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import InputBox from "components/common/InputBox";
import { ThemeConfig } from "styles/ThemeConfig";

import * as S from "./styles";

const MyProfileEdite = () => {
  return (
    <>
      <S.MyProfileWrapper>
        <S.ProfileBox>
          <S.ProfileEditeBox>
            <S.UserImage
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="user_profile"
            />
            <S.ProfileEditeButton>
              <PencilBrownNormalIcon />
            </S.ProfileEditeButton>
          </S.ProfileEditeBox>
        </S.ProfileBox>
        <S.NicNameWrapper>
          <S.MyDogName>
            <InputBox
              width="100%"
              height="49px"
              color={ThemeConfig.colors.gray_1}
              border={ThemeConfig.colors.primaryColor}
              placeholdText="뽀뽀"
              inputValue="뽀뽀"
              type="text"
              setInputValue={() => {
                //TODO 작업 필요
              }}
            />
            의
          </S.MyDogName>
          <S.RoleEditeWrapper>
            <S.RoleEditeButton
              width="112px"
              height="49px"
              textcolor={ThemeConfig.colors.gray_1}
              backcolor={ThemeConfig.colors.white}
            >
              아빠
            </S.RoleEditeButton>
            <S.RoleEditeButton
              width="112px"
              height="49px"
              textcolor={ThemeConfig.colors.gray_3}
              backcolor={ThemeConfig.colors.gray_4}
            >
              엄마
            </S.RoleEditeButton>
            <S.RoleEditeButton
              width="112px"
              height="49px"
              textcolor={ThemeConfig.colors.gray_3}
              backcolor={ThemeConfig.colors.gray_4}
            >
              언니/누나
            </S.RoleEditeButton>
            <S.RoleEditeButton
              width="112px"
              height="49px"
              textcolor={ThemeConfig.colors.gray_3}
              backcolor={ThemeConfig.colors.gray_4}
            >
              오빠/형
            </S.RoleEditeButton>
            <S.RoleEditeButton
              width="112px"
              height="49px"
              textcolor={ThemeConfig.colors.gray_3}
              backcolor={ThemeConfig.colors.gray_4}
            >
              친구
            </S.RoleEditeButton>
          </S.RoleEditeWrapper>
        </S.NicNameWrapper>
      </S.MyProfileWrapper>
    </>
  );
};

export default MyProfileEdite;
