import Badge from "components/common/Badge";
import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import PoopStatusGroup from "components/common/PoopStatusGroup";
import { format } from "date-fns";
import { Suspense, useState } from "react";
import { PastAgenda } from "types/admin/care.types";

import * as S from "./styles";

interface PastAgendaBottomSheetProps extends BottomSheetProps {
  data: PastAgenda[];
}

const PastAgendaBottomSheet = ({ isOpen, close, data }: PastAgendaBottomSheetProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const TITLE_LIST = ["알림장", "간식", "배변 상태"];
  const today = format(new Date(), "M월 dd일");

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <Suspense fallback={<div>로딩중</div>}>
        <S.Content>
          <S.DateContainer>
            오늘 {today}
            {data && (
              <S.ButtonWrapper>
                {data?.map((item, i) => {
                  return (
                    <S.DateButton
                      key={item.agendaId}
                      onClick={() => setSelectedIndex(i)}
                      clicked={i === selectedIndex}
                    >
                      <span>{item.dateTime[1]}월</span>
                      {item.dateTime[2]}일
                    </S.DateButton>
                  );
                })}
              </S.ButtonWrapper>
            )}
          </S.DateContainer>
          <S.AgendaContainer>
            {TITLE_LIST.map((title, index) => {
              return (
                <S.AgendaItem>
                  <S.TitleAndButton key={title}>
                    {title}
                    <Badge text="오늘 알림장에 붙여넣기" variant="brown" />
                  </S.TitleAndButton>
                  {index === 2 && <PoopStatusGroup selected={data[selectedIndex]?.poop} readOnly />}
                  <S.TextSpan>{data && data[selectedIndex]?.agendaNote}</S.TextSpan>
                </S.AgendaItem>
              );
            })}
            <BottomSheet.Button actionText="닫기" actionFn={close} />
          </S.AgendaContainer>
        </S.Content>
      </Suspense>
    </BottomSheet>
  );
};

export default PastAgendaBottomSheet;
