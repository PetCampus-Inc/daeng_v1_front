import Badge, { type BadgeProps } from "components/common/Badge";
import { ICareDogInfo } from "types/admin.caredog.type";

import { CardContainer, ListItemImg, ListItemTime, ListItemTitle } from "./styles";

const MainDogCard = ({
  attendanceId,
  dogId,
  dogName,
  adminName,
  lastPhotoTime,
  agendaWriting
}: ICareDogInfo) => {
  const agendaWritingOptions: {
    [key: string]: { variant: BadgeProps["variant"]; text: string };
  } = {
    WRITING: { variant: "yellow", text: "알림장 작성중" },
    COMPLETE: { variant: "brown", text: "알림장 전송완료" },
    NOT_YET: { variant: "gray", text: "알림장 작성전" }
  };
  const { variant, text } = agendaWritingOptions[agendaWriting];

  return (
    <CardContainer key={dogId}>
      <ListItemImg size="sm">
        <img
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="dog"
        />
      </ListItemImg>
      <ListItemTitle>{dogName}</ListItemTitle>
      <ListItemTime>{lastPhotoTime}</ListItemTime>
      <Badge variant={variant} text={text} />
    </CardContainer>
  );
};

export default MainDogCard;
