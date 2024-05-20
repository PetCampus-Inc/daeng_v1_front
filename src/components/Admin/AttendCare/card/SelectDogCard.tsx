import { Text } from "components/common";
import Checkbox from "components/common/Checkbox";
import { memo } from "react";
import { ICareDogInfo } from "types/admin/care.types";

import { CardCheckboxWrapper, CardContainer, ListItemImg } from "./styles";

type AttendanceData = Pick<ICareDogInfo, "dogId" | "dogName">;

interface Props extends AttendanceData {
  selectId: number;
  isChecked?: boolean;
  toggleId?: (id: number) => void;
}

const SelectDogCard = memo(({ dogId, dogName, selectId, isChecked, toggleId }: Props) => {
  return (
    <CardContainer as="label" key={dogId}>
      <CardCheckboxWrapper>
        <Checkbox
          id={dogId.toString()}
          isChecked={isChecked}
          onChange={() => toggleId && toggleId(selectId)}
        />
      </CardCheckboxWrapper>
      <ListItemImg size="sm">
        <img
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="dog"
        />
      </ListItemImg>
      <Text typo="body2_16_B" color="darkBlack">
        {dogName}
      </Text>
    </CardContainer>
  );
});

export default SelectDogCard;
