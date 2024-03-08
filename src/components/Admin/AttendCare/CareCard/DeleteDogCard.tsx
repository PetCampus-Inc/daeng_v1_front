import Checkbox from "components/common/Checkbox";
import { memo } from "react";

import { CardCheckboxWrapper, CardContainer, ListItemImg, ListItemTitle } from "./styles";

import type { IAttendCareDog } from "types/Attendance.type";

type AttendanceData = Pick<IAttendCareDog, "dogId" | "dogName" | "attendanceId">;

interface DeleteDogCardProps extends AttendanceData {
  isChecked?: boolean;
  toggleId?: (id: number) => void;
}

const DeleteDogCard = memo(
  ({ dogId, dogName, attendanceId, isChecked, toggleId }: DeleteDogCardProps) => {
    return (
      <CardContainer as="label" key={dogId}>
        <CardCheckboxWrapper>
          <Checkbox
            id={dogId.toString()}
            isChecked={isChecked}
            onChange={() => toggleId && toggleId(attendanceId)}
          />
        </CardCheckboxWrapper>
        <ListItemImg size="sm">
          <img
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="dog"
          />
        </ListItemImg>
        <ListItemTitle>{dogName}</ListItemTitle>
      </CardContainer>
    );
  }
);

export default DeleteDogCard;
