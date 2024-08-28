import { DOG_NOTICE_LIST } from "constants/notice";

import AlertFilledIcon from "assets/svg/alert-filled-icon";
import { useGetPrecautions } from "hooks/api/admin/dogs";

import * as S from "./styles";
import { DogDetailInfoText } from "../DogInfo/styles";
import { InnerContainer } from "../styles";
import SendAlarmButton from "../Ticket/SendAlarmButton";

const Notice = ({ dogId }: { dogId: number }) => {
  const { data } = useGetPrecautions(dogId);

  const findObject = (id: number) => {
    const object = data.agreements.find((obj) => Object.prototype.hasOwnProperty.call(obj, id));
    if (object) {
      return Object.values(object)[0];
    }
    return "";
  };

  return (
    <InnerContainer style={{ gap: "12px" }}>
      <S.FlexWrapper>
        <DogDetailInfoText className="big">유의사항 동의</DogDetailInfoText>
        <SendAlarmButton />
      </S.FlexWrapper>

      <S.ListContainer>
        {DOG_NOTICE_LIST.map((item) => (
          <S.List key={item.id}>
            <S.FlexText className="title">
              {item.icon}
              {item.title}
            </S.FlexText>
            <S.InnerFlexWrapper>
              <S.FlexText className="re-agree">
                {data.modifiedList?.includes(item.id) ? (
                  <>
                    <AlertFilledIcon colorScheme="orange" /> "재동의 요청"
                  </>
                ) : (
                  ""
                )}
              </S.FlexText>

              <S.FlexText className="date">{findObject(item.id)} 동의</S.FlexText>
            </S.InnerFlexWrapper>
          </S.List>
        ))}
      </S.ListContainer>
    </InnerContainer>
  );
};

export default Notice;
