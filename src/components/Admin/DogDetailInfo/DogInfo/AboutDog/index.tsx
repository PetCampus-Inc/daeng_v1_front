import * as S from "./styles";
import BoyIcon from "assets/svg/boy-icon";
import CalendarIcon from "assets/svg/calendar";
import PencilIcon from "assets/svg/pencil-icon";
import BreedIcon from "assets/svg/breed-icon";
import Badge from "components/common/Badge";

const AboutDog = () => {
  return (
    <div>
      <S.CardWrapper>
        <S.Image
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="dog-image"
        />
        <S.InfoWrapper>
          <S.InfoTop>
            <S.TextWrapper>
              <S.Text className="big">{"모카"}</S.Text>
              <S.DogSizeBadge>{"소형견"}</S.DogSizeBadge>
            </S.TextWrapper>
            <PencilIcon handleTouch={() => console.log("수정")} />
          </S.InfoTop>
          <S.InfoIcons>
            <S.IconWrapper>
              <BoyIcon />
              {"수컷"}
            </S.IconWrapper>
            <S.IconWrapper>
              <BreedIcon />
              {"푸들"}
            </S.IconWrapper>
          </S.InfoIcons>
          <S.IconWrapper>
            <CalendarIcon />
            {"2008.09.10 [15개월]"}
          </S.IconWrapper>
        </S.InfoWrapper>
      </S.CardWrapper>

      <S.MainBottomWrapper>
        <S.TagsWrapper>
          <Badge type="vaccinated" />
          <Badge type="neutralized" />
          <Badge type="pickdrop" />
        </S.TagsWrapper>
        <S.DogDetailList>
          <S.DetailItem className="row">
            <S.Text>예방접종 파일</S.Text>
            <S.YellowThickButton>파일 열람</S.YellowThickButton>
          </S.DetailItem>
          <S.DetailItem>
            <S.Text>알러지 및 질병</S.Text>
            <S.Text className="explanation">
              뽀뽀의 알러지는요 눈을 긁으면 ㅈ빨간 점이 생기고요그리고요
            </S.Text>
          </S.DetailItem>
          <S.DetailItem>
            <S.Text>픽드랍 정보</S.Text>
            <S.Text className="explanation">
              롯데 아파트 8단지 820동 앞에서 2시에 어머니가 나와서 어쩌고 저쩌고 입니다.
            </S.Text>
          </S.DetailItem>
        </S.DogDetailList>
      </S.MainBottomWrapper>
    </div>
  );
};

export default AboutDog;
