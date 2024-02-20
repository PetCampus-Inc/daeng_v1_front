import * as S from "./styles";
import { Text } from "../../DogInfo/AboutDog/styles";
import PoopHard from "assets/svg/poop-hard";
import PoopHealthy from "assets/svg/poop-healty";
import PoopWatery from "assets/svg/poop-watery";
import PoopNotBrown from "assets/svg/poop-not-brown";
import PoopNeedAttention from "assets/svg/poop-need-attention";

const DailyNotice = () => {
  return (
    <>
      <S.NoticeContainer>
        <Text className="big">11월 10일 알림장</Text>
        <S.NoticeItemWrapper>
          알림장
          <S.NoticeContent>
            오늘 뽀뽀야호는 시츄 친구와 노즈워크를 하며 간식을 여러개 찾아냈습니다. 내일은 구의천
            산책이 예정되어 있으니 보라색 입마개를 지참해서 보내주세요 :)
          </S.NoticeContent>
        </S.NoticeItemWrapper>

        <S.NoticeItemWrapper>
          간식
          <S.NoticeContent>
            오늘 저희가 직접 준비한 유기농 간식을 주었더니 너무 좋아하더라고요
          </S.NoticeContent>
        </S.NoticeItemWrapper>

        <S.NoticeItemWrapper>
          <div>
            배변 상태
            <S.PoopCardContainer>
              <S.PoopCard>
                <PoopHard />
                딱딱함
              </S.PoopCard>
              <S.PoopCard>
                <PoopHealthy />
                건강함
              </S.PoopCard>
              <S.PoopCard>
                <PoopWatery />
                묽은 변
              </S.PoopCard>
              <S.PoopCard>
                <PoopNotBrown />
                갈색이 아닌
              </S.PoopCard>
              <S.PoopCard>
                <PoopNeedAttention />
                주의필요
              </S.PoopCard>
            </S.PoopCardContainer>
          </div>

          <S.NoticeContent>오늘은 오전에 2번, 오후에 1번 배변을 했습니다.</S.NoticeContent>
        </S.NoticeItemWrapper>
      </S.NoticeContainer>
    </>
  );
};

export default DailyNotice;
