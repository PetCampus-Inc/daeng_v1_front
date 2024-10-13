import { routes } from "constants/path";

import MainSendCard from "components/Admin/AttendCare/button/MainSendCard";
import { Flex, Text } from "components/common";
import { useNavigate, useParams } from "react-router-dom";

import FlexPhotosWithTime from "../FlexPhotosWithTime";

const PhotoAlbum = () => {
  const navigate = useNavigate();
  const { dogId } = useParams();

  return (
    <>
      <MainSendCard
        text="견주에게 사진과 코멘트를 남겨 보세요"
        onClick={() => navigate(routes.admin.care.gallery.dynamic(dogId))}
      />
      <Flex direction="column" gap={20} pt={32}>
        <Text typo="body2_16_B">전송된 사진</Text>
        <FlexPhotosWithTime dogId={Number(dogId)} />
      </Flex>
    </>
  );
};

export default PhotoAlbum;
