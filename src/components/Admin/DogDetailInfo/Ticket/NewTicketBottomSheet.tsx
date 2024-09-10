import { routes } from "constants/path";

import { Box, Flex } from "components/common";
import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import { WideButton } from "components/common/Button";
import { Text } from "components/common/Text";
import { useCreateNewTicket } from "hooks/api/admin/ticket";
import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { padToTwoDigits } from "utils/date";

import { calculateRenewal } from "./newTicket";
import { TicketCard } from "./TicketCard";

import type { TicketDetailData } from "types/admin/attendance.type";

interface NewTicketBottomSheetProps extends BottomSheetProps {
  info: TicketDetailData & {
    dogId: number;
  };
}

const NewTicketBottomSheet = ({ isOpen, close, info }: NewTicketBottomSheetProps) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { mutateNewTicket } = useCreateNewTicket(info.dogId);

  const newTicketData = useMemo(() => calculateRenewal(info), [info]);

  const handleSubmit = () => {
    mutateNewTicket(
      {
        dogId: info.dogId,
        ticketType: newTicketData.ticketType,
        roundTicketNumber: newTicketData.allRoundTicket,
        monthlyTicketNumber: newTicketData.monthlyTicketNumber,
        startDate: padToTwoDigits(newTicketData.ticketStartDate).join("-"),
        attendanceDays: newTicketData.attendanceDays ?? []
      },
      {
        onSuccess: () => {
          close();
        }
      }
    );
  };

  const handleNavigate = () => {
    // 쿼리 파라미터를 유지한 채로 이동합니다
    // /admin/attendance/11/new-ticket?dog_name=%EC%A0%9C%EC%8B%9C%EC%B9%B4&ticket_status=true&tab=ticket
    const path = `${routes.admin.attendance.newTicket.dynamic(info.dogId)}${search}`;
    navigate(path);
  };

  return (
    <BottomSheet isOpen={isOpen} close={close}>
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
            <WideButton colorScheme="br_5" onClick={handleNavigate}>
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
