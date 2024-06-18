import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import { ExtendedFieldArrayWithId } from "components/common/Select/EditableRadioGroup";
import { useRecoilValue } from "recoil";
import { ticketCounterState } from "store/form";

import TicketCounter from "../TicketCounter";

import type { TTicketType } from "types/admin/enrollment.types";

interface TicketCounterProps extends BottomSheetProps {
  ticketType: TTicketType;
  action: () => void;
  fields: Record<"id", string>[];
}

const TicketCounterBottomSheet = ({
  isOpen,
  close,
  ticketType,
  action,
  fields
}: TicketCounterProps) => {
  const counter = useRecoilValue(ticketCounterState);

  const currentIsDuplication = fields.some(
    (field: ExtendedFieldArrayWithId) => field.value === counter
  );

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <TicketCounter type={ticketType} isDuplication={currentIsDuplication} />
        <BottomSheet.Button actionText="추가" actionFn={action} disabled={currentIsDuplication} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default TicketCounterBottomSheet;
