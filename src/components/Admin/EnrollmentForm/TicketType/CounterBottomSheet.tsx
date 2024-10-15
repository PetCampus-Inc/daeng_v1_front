import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import { useRecoilValue } from "recoil";
import { ticketCounterState } from "store/form";

import { Counter } from "./Counter";
import * as Styled from "./styles";

import type { ExtendedFieldArrayWithId } from "./types";
import type { TTicketType } from "types/admin/enrollment.types";
import { Text } from "components/common";

interface CounterBottomSheetProps extends BottomSheetProps {
  ticketType: TTicketType;
  action: () => void;
  fields: Record<"id", string>[];
}

export function CounterBottomSheet({
  isOpen,
  close,
  ticketType,
  action,
  fields
}: CounterBottomSheetProps) {
  const counter = useRecoilValue(ticketCounterState);

  const isDuplication = fields.some((field: ExtendedFieldArrayWithId) => field.value === counter);

  const text = ticketType === "ROUND" ? "회차권" : "정기권";

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <Styled.TextWrapper>
          <Text typo="title2_20_B" color="darkBlack">
            {text} 유형을 추가해 주세요
          </Text>
          {isDuplication && (
            <Styled.ErrorMessage>이미 추가되어 있어요. 횟수를 변경해 주세요.</Styled.ErrorMessage>
          )}
        </Styled.TextWrapper>
        <Counter type={ticketType} />
        <BottomSheet.Button actionText="추가" actionFn={action} disabled={isDuplication} />
      </BottomSheet.Content>
    </BottomSheet>
  );
}
