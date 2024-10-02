import { Text } from "components/common";
import { Checkbox } from "components/common";
import { memo } from "react";
import { ICareDogInfo } from "types/admin/care.types";

import { CardCheckboxWrapper, CardContainer, ListItemImg } from "./styles";

type Attendance = Pick<ICareDogInfo, "dogId" | "dogName">;

interface Props extends Attendance {
  selectId: number;
  isChecked?: boolean;
  profileUri: string;
  toggleId?: (id: number) => void;
}

const SelectDogCard = memo(
  ({ dogId, dogName, selectId, isChecked, profileUri, toggleId }: Props) => {
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
          <img src={profileUri} alt="dog" />
        </ListItemImg>
        <Text typo="body2_16_B" color="darkBlack">
          {dogName}
        </Text>
      </CardContainer>
    );
  }
);

export default SelectDogCard;
