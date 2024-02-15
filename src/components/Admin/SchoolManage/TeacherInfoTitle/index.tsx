import ListIcon from "assets/svg/list-icon";
import TitleWithIcon from "../TitleWithIcon";
import ButtonBadge from "components/common/Badge/ButtonBadge";
import * as S from "./styles";

interface TeacherInfoTitleProps {
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeacherInfoTitle = ({ isEditable, setIsEditable }: TeacherInfoTitleProps) => {
  return (
    <S.Container>
      <ListIcon />
      <TitleWithIcon
        title="00유치원 소속 교사 리스트에요"
        icon={
          <ButtonBadge
            type={isEditable ? "cancel" : "edit"}
            handleTouch={() => {
              setIsEditable(!isEditable);
            }}
          />
        }
      />
    </S.Container>
  );
};

export default TeacherInfoTitle;
