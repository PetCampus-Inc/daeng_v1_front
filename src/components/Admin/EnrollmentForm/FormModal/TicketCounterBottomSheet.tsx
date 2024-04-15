import BottomSheet, { type IBottomSheetProps } from "components/common/BottomSheet";
import { ExtendedFieldArrayWithId } from "components/common/Select/EditableRadioGroup";
import { useRecoilValue } from "recoil";
import { ticketCounterAtom } from "store/overlay";
import { TTicketType } from "types/School.type";

import TicketCounter from "../TicketCounter";

interface TicketCounterProps extends IBottomSheetProps {
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
  const counter = useRecoilValue(ticketCounterAtom);

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
