import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import { ExtendedFieldArrayWithId } from "components/Admin/EnrollmentForm/TicketType/TicketGroup";
import { useRecoilValue } from "recoil";
import { ticketCounterState } from "store/form";

import { Counter } from "./Counter";

import type { TTicketType } from "types/admin/enrollment.types";

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

  const currentIsDuplication = fields.some(
    (field: ExtendedFieldArrayWithId) => field.value === counter
  );

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <Counter type={ticketType} isDuplication={currentIsDuplication} />
        <BottomSheet.Button actionText="추가" actionFn={action} disabled={currentIsDuplication} />
      </BottomSheet.Content>
    </BottomSheet>
  );
}
