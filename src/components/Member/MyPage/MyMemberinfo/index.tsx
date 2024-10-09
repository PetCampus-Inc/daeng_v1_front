import { GENDER_DATA } from "constants/gender";
import { RELATION_DATA } from "constants/relation";

import placeholderImg from "assets/images/placeholder-dog.png";
import GirlNormalIcon from "assets/svg/girl-normal-icon";
import ListNormalIcon from "assets/svg/list-normal-icon";
import MapPinFootNormalIcon from "assets/svg/map-pin-foot-normal-icon";
import PhoneNormalIcon from "assets/svg/phone-normal-icon";
import { useGetMemberProfileInfo } from "hooks/api/member/member";

import CirclesItems from "./CirclesItem";
import * as S from "./styles";

const MyInfo = () => {
  const { data } = useGetMemberProfileInfo();

  return (
    <S.MyInfoContainer>
      <CirclesItems />
      <S.TitleBox>
        <S.Title>견주 정보</S.Title>
        <S.SubText>가입신청서 작성시 입력한 내용이에요</S.SubText>
      </S.TitleBox>
      <S.UserProfile>
        <S.ImgageBox>
          <S.Image src={data.memberProfileUri ?? placeholderImg} alt="member-profile" />
        </S.ImgageBox>
        <S.UserName>
          {data.nickName}의 {RELATION_DATA[data.relation]}
        </S.UserName>
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
          <S.MyInfoText>{data.memberName ? data.memberName : ""}</S.MyInfoText>
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
          <S.MyInfoText>{data.memberGender ? GENDER_DATA[data.memberGender] : ""}</S.MyInfoText>
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
          <S.MyInfoText>{data.phoneNumber ? data.phoneNumber : ""}</S.MyInfoText>
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
          <S.MyInfoText>{data.emergencyPhoneNumber ? data.emergencyPhoneNumber : ""}</S.MyInfoText>
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
          <S.MyInfoText>
            {data.addressDetail && data.address ? `${data.addressDetail} ${data.address}` : ""}
          </S.MyInfoText>
        </S.MyInfoItem>
      </S.MyInfoList>
      <S.FootIconItem className="gray5-foot" />
    </S.MyInfoContainer>
  );
};

export default MyInfo;
