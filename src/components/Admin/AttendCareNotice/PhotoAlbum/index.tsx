import { PATH } from "constants/path";

import MainSendCard from "components/Admin/AttendCare/button/MainSendCard";
import { useNavigate, useParams } from "react-router-dom";

import * as S from "./styles";
import FlexPhotosWithTime from "../FlexPhotosWithTime";

const PhotoAlbum = () => {
  const navigate = useNavigate();
  const { dogId } = useParams();
  return (
    <>
      <MainSendCard
        text="견주에게 사진과 코멘트를 남겨 보세요"
        onClick={() => navigate(PATH.ADMIN_CARE_INFO_GALLERY(Number(dogId)))}
      />
      <S.Container>
        <S.SentPhotosText>전송된 사진</S.SentPhotosText>
        <FlexPhotosWithTime />
      </S.Container>
    </>
  );
};

export default PhotoAlbum;
