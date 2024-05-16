import { PATH } from "constants/path";

import MainSendCard from "components/Admin/AttendCare/button/MainSendCard";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";
import FlexPhotosWithTime from "../FlexPhotosWithTime";

const PhotoAlbum = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainSendCard
        text="견주에게 사진과 코멘트를 남겨 보세요"
        onClick={() => navigate(PATH.ADMIN_CARE_GALLERY)}
      />
      <S.Container>
        <S.SentPhotosText>전송된 사진</S.SentPhotosText>
        <FlexPhotosWithTime />
      </S.Container>
    </>
  );
};

export default PhotoAlbum;
