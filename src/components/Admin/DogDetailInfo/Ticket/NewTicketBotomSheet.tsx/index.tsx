import BottomSheet from "components/common/BottomSheet";
import Checkbox from "components/common/Checkbox";
import { addWeeks, format } from "date-fns";
import { useNewTicketMutation } from "hooks/api/useNewTicketMutation";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { newTicketCardDataAtom } from "store/admin";
import { ITicketDetail } from "types/admin.attendance.type";

import { NewTicketBottomSheetWrapper } from "./styles";
import TicketCard from "../TicketCard";

interface AddCaredogBottomSheetProps {
  isOpen: boolean;
  close: () => void;
  currentData: Omit<ITicketDetail, "ticketHistory">;
}

const NewTicketBottomSheet = ({ isOpen, close, currentData }: AddCaredogBottomSheetProps) => {
  const dogId = useLocation().pathname.split("/").pop();
  const [isChecked, setIsChecked] = useState(false);
  const [, setData] = useRecoilState(newTicketCardDataAtom); //TODO: set만 가져오게
  const navigate = useNavigate();
  const mutateNewTicket = useNewTicketMutation(close);
  const today = new Date();
  const futureDate = addWeeks(today, currentData.monthlyTicketNumber || 1);
  const todayArray = format(today, "yyyy, M, d").split(",").map(Number);
  const futureDateArray = format(futureDate, "yyyy, M, d").split(",").map(Number);

  const handleSubmit = () => {
    if (isChecked) {
      navigate(`attendance/${dogId}/newTicket`);
      return;
    }
    mutateNewTicket({
      dogId: dogId,
      ticketType: currentData.ticketType,
      roundTicketNumber: currentData.allRoundTicket,
      monthlyTicketNumber: currentData.monthlyTicketNumber,
      startDate: todayArray,
      attendanceDays: currentData.attendanceDays
    });
  };

  const cardData = {
    dogId: dogId,
    ticketType: currentData.ticketType,
    currentRoundTicket: currentData.allRoundTicket,
    ticketExpirationDate: futureDateArray,
    allRoundTicket: currentData.allRoundTicket,
    monthlyTicketNumber: currentData.monthlyTicketNumber,
    ticketStartDate: todayArray,
    attendanceDays: currentData.attendanceDays
  };

  useEffect(() => {
    setData(cardData);
  }, []);

  return (
    <>
      <BottomSheet isOpen={isOpen} close={() => close()}>
        <BottomSheet.Content>
          <NewTicketBottomSheetWrapper>
            <BottomSheet.Control />
            <BottomSheet.Title align="left">갱신될 이용권 내역이에요</BottomSheet.Title>

            <TicketCard data={cardData} />
            <BottomSheet.Subtitle>
              갱신될 이용권 내역을 변경 하려면 아래에 체크해 주세요
            </BottomSheet.Subtitle>

            <Checkbox
              label="갱신될 이용권 정보 변경"
              variant="fill"
              onClick={() => setIsChecked(!isChecked)}
              isChecked={isChecked}
            />
          </NewTicketBottomSheetWrapper>
          <BottomSheet.Button actionText="갱신하기" actionFn={handleSubmit} />
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};

export default NewTicketBottomSheet;
