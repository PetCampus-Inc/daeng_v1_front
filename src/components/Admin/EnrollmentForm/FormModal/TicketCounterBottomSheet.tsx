import BottomSheet, { type IBottomSheetProps } from "components/common/BottomSheet";
import { TTicketType } from "types/School.type";

import TicketCounter from "../TicketCounter";

interface TicketCounterProps extends IBottomSheetProps {
  ticketType: TTicketType;
  isDuplication: boolean;
  INIT_COUNTER: number;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  action: () => void;
}

const TicketCounterBottomSheet = ({
  isOpen,
  close,
  ticketType,
  isDuplication,
  INIT_COUNTER,
  counter,
  setCounter,
  action
}: TicketCounterProps) => {
  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <TicketCounter
          type={ticketType}
          isDuplication={isDuplication}
          initial={INIT_COUNTER}
          counter={counter}
          setCounter={setCounter}
        />
        <BottomSheet.Button actionText="추가" actionFn={action} disabled={isDuplication} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default TicketCounterBottomSheet;
