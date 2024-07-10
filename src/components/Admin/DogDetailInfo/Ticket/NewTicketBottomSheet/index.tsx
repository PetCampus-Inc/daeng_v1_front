import { PATH } from "constants/path";

import { Box, Flex } from "components/common";
import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import { WideButton } from "components/common/Button/Templates";
import { Text } from "components/common/Text";
import { useCreateNewTicket } from "hooks/api/admin/ticket";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { calculateRenewal } from "../newTicket";
import TicketCard from "../TicketCard";

import type { TicketDetailData } from "types/admin/attendance.type";

interface AddCaredogBottomSheetProps extends BottomSheetProps {
  info: TicketDetailData & {
    dogId: number;
  };
}

const NewTicketBottomSheet = ({ isOpen, close, info }: AddCaredogBottomSheetProps) => {
  const navigate = useNavigate();
  const { mutateNewTicket } = useCreateNewTicket(info.dogId);

  const newTicketData = useMemo(() => calculateRenewal(info), [info]);

  const handleSubmit = () => {
    mutateNewTicket(
      {
        dogId: info.dogId,
        ticketType: newTicketData.ticketType,
        roundTicketNumber: newTicketData.allRoundTicket,
        monthlyTicketNumber: newTicketData.monthlyTicketNumber,
        startDate: newTicketData.ticketStartDate.join("-"),
        attendanceDays: newTicketData.attendanceDays ?? []
      },
      {
        onSuccess: () => {
          close();
        }
      }
    );
  };

  const handleRenewal = () => navigate(PATH.ADMIN_ATTENDANCE_INFO_NEW_TICKET(info.dogId));

  return (
    <BottomSheet isOpen={isOpen} close={() => close()}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <Box marginBlock={12}>
          <Text as="p" typo="title2_20_B" color="darkBlack">
            갱신될 이용권 내역이에요
          </Text>
        </Box>
        <TicketCard dogId={info.dogId} data={newTicketData} />
        <Flex direction="column" gap={8} marginTop="12%">
          <Text as="p" typo="label2_14_R" color="gray_2" textAlign="center" whiteSpace="pre-wrap">
            위의 갱신될 이용권 내역을 확인해보시고 수정을 원하시는 경우, 수정하기 버튼을 수정
            페이지로 이동해주세요
          </Text>
          <Flex gap={8} width="full">
            <WideButton colorScheme="br_5" onClick={handleRenewal}>
              수정
            </WideButton>
            <WideButton onClick={handleSubmit}>갱신</WideButton>
          </Flex>
        </Flex>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default NewTicketBottomSheet;
