import Badge, { BadgeProps } from "components/common/Badge";

import { CardContainer, ListItemImg, ListItemTime, ListItemTitle } from "./styles";

import type { ICareDogInfo, TAgendaWriting } from "types/admin.caredog.type";

const MainDogCard = ({
  attendanceId,
  dogId,
  dogName,
  adminName,
  lastPhotoTime,
  agendaWriting
}: ICareDogInfo) => {
  const agendaWritingOptions = (
    agendaWriting: TAgendaWriting
  ): { variant: BadgeProps["variant"]; text: string } => {
    switch (agendaWriting) {
      case "WRITING":
        return { variant: "yellow", text: "알림장 작성중" };
      case "COMPLETE":
        return { variant: "brown", text: "알림장 전송완료" };
      case "NOT_YET":
        return { variant: "gray", text: "알림장 작성전" };
      default:
        return { variant: "gray", text: "알림장 작성전" };
    }
  };

  const { variant, text } = agendaWritingOptions(agendaWriting);

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
