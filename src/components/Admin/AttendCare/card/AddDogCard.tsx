import AlertRed from "assets/svg/alert-red-icon";
import { Text } from "components/common";
import { Checkbox } from "components/common";
import Badge from "components/common/Badge";
import React from "react";

import { CheckboxWrapper, ListItem, ListItemImg, ListItemWrapper } from "./styles";

interface AddDogCardProps {
  dogId: number;
  dogName: string;
  profileUri: string;
  adminName: string | null;
  isChecked: boolean;
  onClick: () => void;
}

const AddDogCard = React.memo(
  ({ dogId, dogName, profileUri, adminName, isChecked, onClick }: AddDogCardProps) => {
    const isCared = !!adminName;

    return (
      <ListItem key={dogId} onClick={onClick}>
        <ListItemWrapper>
          <ListItemImg size="md">
            <img src={profileUri} alt="dog" />
          </ListItemImg>
          <Text typo="body2_16_B" color="darkBlack">
            {dogName}
          </Text>
          {isCared && <Badge variant="yellow" text={adminName + "T"} />}
        </ListItemWrapper>
        <CheckboxWrapper>
          {isCared ? (
            <AlertRed />
          ) : (
            <Checkbox
              id={dogId.toString()}
              isChecked={isChecked}
              variant="outline"
              onChange={onClick}
            />
          )}
        </CheckboxWrapper>
      </ListItem>
    );
  }
);

export default AddDogCard;
