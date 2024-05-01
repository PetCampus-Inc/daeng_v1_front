import GirlNormalIcon from "assets/svg/girl-normal-icon";
import ListNormalIcon from "assets/svg/list-normal-icon";
import MapPinFootNormalIcon from "assets/svg/map-pin-foot-normal-icon";
import PhoneNormalIcon from "assets/svg/phone-normal-icon";

import CirclesItems from "./CirclesItem";
import * as S from "./styles";

const MyInfo = () => {
  return (
    <S.MyInfoContainer>
      <CirclesItems />
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
        <S.UserName>뽀뽀의 언니/누나</S.UserName>
      </S.UserProfile>
      <S.MyInfoList>
        <S.MyInfoItem>
          <S.MyInfoTitle>
            <S.IconCircle
              width={"20px"}
              height={"20px"}
              bg={"yellow_3"}
              borderRadius={50}
              overflow={"hidden"}
            >
              <ListNormalIcon />
            </S.IconCircle>
            이름
          </S.MyInfoTitle>
          <S.MyInfoText>박유빈</S.MyInfoText>
        </S.MyInfoItem>
        <S.MyInfoItem>
          <S.MyInfoTitle>
            <S.IconCircle
              width={"20px"}
              height={"20px"}
              bg={"yellow_3"}
              borderRadius={50}
              overflow={"hidden"}
            >
              <GirlNormalIcon />
            </S.IconCircle>
            성별
          </S.MyInfoTitle>
          <S.MyInfoText>여</S.MyInfoText>
        </S.MyInfoItem>
        <S.MyInfoItem>
          <S.MyInfoTitle>
            <S.IconCircle
              width={"20px"}
              height={"20px"}
              bg={"yellow_3"}
              borderRadius={50}
              overflow={"hidden"}
            >
              <PhoneNormalIcon />
            </S.IconCircle>
            연락처
          </S.MyInfoTitle>
          <S.MyInfoText>010-1414-1414</S.MyInfoText>
        </S.MyInfoItem>
        <S.MyInfoItem>
          <S.MyInfoTitle>
            <S.IconCircle
              width={"20px"}
              height={"20px"}
              bg={"yellow_3"}
              borderRadius={50}
              overflow={"hidden"}
            >
              <PhoneNormalIcon />
            </S.IconCircle>
            비상연락처
          </S.MyInfoTitle>
          <S.MyInfoText>010-1414-1414</S.MyInfoText>
        </S.MyInfoItem>
        <S.MyInfoItem className="address">
          <S.MyInfoTitle>
            <S.IconCircle
              width={"20px"}
              height={"20px"}
              bg={"yellow_3"}
              borderRadius={50}
              overflow={"hidden"}
            >
              <MapPinFootNormalIcon />
            </S.IconCircle>
            주소
          </S.MyInfoTitle>
          <S.MyInfoText>서울 중구 덕수궁길 150 롯데캐슬 아파트 203동 1403호</S.MyInfoText>
        </S.MyInfoItem>
      </S.MyInfoList>
      <S.FootIconItem className="gray5-foot" />
    </S.MyInfoContainer>
  );
};

export default MyInfo;
