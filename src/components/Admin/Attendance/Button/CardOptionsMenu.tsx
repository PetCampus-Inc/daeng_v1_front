import MoreIcon from "assets/svg/more-icon";
import PhoneIcon from "assets/svg/phone-icon";
import SendAlarmIcon from "assets/svg/send-alarm";
import { XCircleFilledIcon } from "assets/svg/x-circle-filled-icon";
import { Dropdown } from "components/common";
import { useDeleteAttendDog } from "hooks/api/admin/attendance";
import { useOverlay } from "hooks/common/useOverlay";
import { Suspense } from "react";

import { IconWrapper } from "./styles";
import { CARD_OPTIONS, type CardOptions } from "../constant";
import { CallMemberBottomSheet } from "../Dialog/CallMemberBottomSheet";
import { DeleteDogModal } from "../Dialog/DeleteDogModal";

interface CardOptionsMenuProps {
  options: CardOptions[];
  dogId: number;
}

const optionIcon = {
  [CARD_OPTIONS.CALL]: <PhoneIcon />,
  [CARD_OPTIONS.SEND_ALARM]: <SendAlarmIcon />,
  [CARD_OPTIONS.DELETE]: <XCircleFilledIcon />
};

export function CardOptionsMenu({ options, dogId }: CardOptionsMenuProps) {
  const overlay = useOverlay();
  const { mutateDelete } = useDeleteAttendDog();

  // FIXME: 실제 알림 전송 로직 추가 필요
  const handlerSendAlarm = async () => {
    console.log(dogId);
  };

  const handleDeleteDog = () => {
    mutateDelete(dogId, {
      onSuccess: () => overlay.close()
    });
  };

  const handleOptionClick = (option: CardOptions) => {
    switch (option) {
      case CARD_OPTIONS.CALL:
        overlay.open(({ isOpen, close }) => (
          <Suspense fallback={<div>스켈레톤 보여지는 중...</div>}>
            <CallMemberBottomSheet isOpen={isOpen} close={close} dogId={dogId} />
          </Suspense>
        ));
        break;
      case CARD_OPTIONS.SEND_ALARM:
        handlerSendAlarm();
        break;
      case CARD_OPTIONS.DELETE:
        overlay.open(({ isOpen, close }) => (
          <DeleteDogModal isOpen={isOpen} close={close} action={handleDeleteDog} />
        ));
        break;
    }
  };

  return (
    <Dropdown>
      <Dropdown.Content>
        <Dropdown.Trigger>
          <IconWrapper>
            <MoreIcon />
          </IconWrapper>
        </Dropdown.Trigger>
        <Dropdown.List>
          {options.map((option) => (
            <Dropdown.Option
              key={option}
              onClick={() => {
                handleOptionClick(option);
              }}
            >
              {optionIcon[option]}
              <span>{option}</span>
            </Dropdown.Option>
          ))}
        </Dropdown.List>
      </Dropdown.Content>
    </Dropdown>
  );
}
