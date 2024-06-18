import { DOG_NOTICE_LIST } from "constants/notice";

import AlertSmallIcon from "assets/svg/alert-small-icon";
import { IPrecautionInfo } from "types/admin/attendance.type";

import * as S from "./styles";
import { DogDetailInfoText } from "../DogInfo/styles";
import { InnerContainer } from "../styles";
import SendAlarmButton from "../Ticket/SendAlarmButton";

interface NoticeProps {
  data: IPrecautionInfo;
}
const Notice = ({ data }: NoticeProps) => {
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
                    <AlertSmallIcon color="orange" /> "재동의 요청"
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
