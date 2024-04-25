import BasicPhoneIcon from "assets/svg/phone-basic";
import { Box } from "components/common/Box";
import { Flex } from "components/common/Flex";

import * as S from "./styles";

const MyInfo = () => {
  return (
    <S.MyInfoContainer>
      <Flex gap={"24"} margin={"0 0 38px 0"}>
        <Box width={"12px"} height={"12px"} bg={"br_5"} borderRadius={50} />
        <Box width={"12px"} height={"12px"} bg={"br_5"} borderRadius={50} />
        <Box width={"12px"} height={"12px"} bg={"br_5"} borderRadius={50} />
        <Box width={"12px"} height={"12px"} bg={"br_5"} borderRadius={50} />
        <Box width={"12px"} height={"12px"} bg={"br_5"} borderRadius={50} />
        <Box width={"12px"} height={"12px"} bg={"br_5"} borderRadius={50} />
        <Box width={"12px"} height={"12px"} bg={"br_5"} borderRadius={50} />
        <Box width={"12px"} height={"12px"} bg={"br_5"} borderRadius={50} />
      </Flex>
      <S.TitleBox>
        <S.Title>견주 정보</S.Title>
        <S.SubText>가입신청서 작성시 입력한 내용이에요</S.SubText>
      </S.TitleBox>
      <S.UserProfile>
        <S.ImgageBox>
          <S.Image
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user_profile"
          />
        </S.ImgageBox>
        <S.UserName>뽀뽀의 언니 / 누나</S.UserName>
      </S.UserProfile>
      <S.MyInfoList>
        <S.MyInfoItem>
          <S.MyInfoTitle>
            <BasicPhoneIcon />
            이름
          </S.MyInfoTitle>
          <S.MyInfoText>박유빈</S.MyInfoText>
        </S.MyInfoItem>
        <S.MyInfoItem>
          <S.MyInfoTitle>
            <BasicPhoneIcon />
            성별
          </S.MyInfoTitle>
          <S.MyInfoText>여</S.MyInfoText>
        </S.MyInfoItem>
        <S.MyInfoItem>
          <S.MyInfoTitle>
            <BasicPhoneIcon />
            연락처
          </S.MyInfoTitle>
          <S.MyInfoText>010-1414-1414</S.MyInfoText>
        </S.MyInfoItem>
        <S.MyInfoItem>
          <S.MyInfoTitle>
            <BasicPhoneIcon />
            비상연락처
          </S.MyInfoTitle>
          <S.MyInfoText>010-1414-1414</S.MyInfoText>
        </S.MyInfoItem>
        <S.MyInfoItem>
          <S.MyInfoTitle>
            <BasicPhoneIcon />
            주소
          </S.MyInfoTitle>
          <S.MyInfoText>서울 중구 덕수궁길 150 롯데캐슬 아파트 203동 1403호</S.MyInfoText>
        </S.MyInfoItem>
      </S.MyInfoList>
    </S.MyInfoContainer>
  );
};

export default MyInfo;
