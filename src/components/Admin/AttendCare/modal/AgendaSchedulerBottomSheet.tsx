import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import Toggle from "components/common/Toggle/Toggle";
import { useRef, useState } from "react";

import {
  TimePickerContainer,
  TimePickerTitle,
  TimePickerWarper,
  TitleContainer,
  TitleWrapper,
  ToggleWrapper
} from "./styles";
import TimePicker, { TimePickerHandles } from "../AttendCareMain/CareTimePicker/TimePicker";

const AgendaSchedulerBottomSheet = ({ isOpen, close }: BottomSheetProps) => {
  // FIXME: 토글 스위치는 useState 대신 label-input으로 리팩터링 할 것!!
  const [isOn, setIsOn] = useState(false);
  const timePickerRef = useRef<TimePickerHandles>(null);

  const toggleSwitch = () => setIsOn(!isOn);

  const handleSubmit = () => {
    if (timePickerRef?.current) {
      const time = timePickerRef.current.getTime();
      console.log(time);
    }
  };

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Control />
        <TitleContainer>
          <TitleWrapper>
            <BottomSheet.Title align="left">알림장 전송을 예약할 수 있어요</BottomSheet.Title>
            <BottomSheet.Subtitle align="left">
              설정한 시간에 모든 담당 강아지의 견주에게 지금까지 작성된 알림장이 일괄 전송 돼요
            </BottomSheet.Subtitle>
          </TitleWrapper>
          <ToggleWrapper>
            <Toggle isOn={isOn} onToggle={toggleSwitch} />
          </ToggleWrapper>
        </TitleContainer>
        <TimePickerContainer $isActive={isOn}>
          <TimePickerTitle>시간 설정하기</TimePickerTitle>
          <TimePickerWarper>
            <TimePicker ref={timePickerRef} disabled={!isOn} />
            <span className="text">에 일괄 전송</span>
          </TimePickerWarper>
        </TimePickerContainer>
        <BottomSheet.Button actionText="일괄 전송 예약" actionFn={handleSubmit} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default AgendaSchedulerBottomSheet;
