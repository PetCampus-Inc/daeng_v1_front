import { routes } from "constants/path";

import { Text } from "components/common";
import Badge, { BadgeProps } from "components/common/Badge";
import { useNavigate } from "react-router-dom";

import { CardContainer, ListItemImg, ListItemTime } from "./styles";

import type { ICareDogInfo, TAgendaWriting } from "types/admin/care.types";

const MainDogCard = ({ info }: { info: ICareDogInfo }) => {
  const navigate = useNavigate();
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

  const { variant, text } = agendaWritingOptions(info.agendaWriting);

  return (
    <CardContainer
      key={info.dogId}
      onClick={() =>
        navigate(routes.admin.care.notice.dynamic(info.dogId), {
          state: { dogName: info.dogName, profileUri: info.profileUri }
        })
      }
    >
      <ListItemImg size="sm">
        <img src={info.profileUri} alt="dog" />
      </ListItemImg>
      <Text typo="body2_16_B" color="darkBlack">
        {info.dogName}
      </Text>
      <ListItemTime>{info.lastPhotoTime}</ListItemTime>
      <Badge variant={variant} text={text} />
    </CardContainer>
  );
};

export default MainDogCard;
