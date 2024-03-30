import AlertRed from "assets/svg/alert-red-icon";
import Badge from "components/common/Badge";
import Checkbox from "components/common/Checkbox";
import React from "react";

import { CheckboxWrapper, ListItem, ListItemImg, ListItemTitle, ListItemWrapper } from "./styles";

interface AddDogCardProps {
  dogId: number;
  dogName: string;
  adminName: string | null;
  isChecked: boolean;
  onClick: () => void;
}

const AddDogCard = React.memo(
  ({ dogId, dogName, adminName, isChecked, onClick }: AddDogCardProps) => {
    const isCared = adminName ? true : false;

    return (
      <ListItem key={dogId}>
        <ListItemWrapper>
          <ListItemImg size="md">
            <img
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="dog"
            />
          </ListItemImg>
          <ListItemTitle>{dogName}</ListItemTitle>
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
