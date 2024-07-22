import DogInfoBox from "components/Admin/AttendCareNotice/DogInfoBox";
import PhotoAlbum from "components/Admin/AttendCareNotice/PhotoAlbum";
import WriteNotice from "components/Admin/AttendCareNotice/WriteNotice";
import { Box, Layout } from "components/common";
import Header from "components/common/Header";
import MenuToggle from "components/common/MenuToggle";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AttendCareNoticePage = () => {
  const [searchParams] = useSearchParams();
  const initialTabs = ["알림장", "사진앨범"]; //임시. constant로 옮기기
  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);

  return (
    <>
      <Header type="text" text={`${searchParams.get("dog_name")} 상세 페이지`} />
      <Layout>
        <DogInfoBox />
        <Box bgColor="white" px={16} pb={42} overflow="auto">
          <MenuToggle selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {selectedTab === "알림장" && <WriteNotice />}
          {selectedTab === "사진앨범" && <PhotoAlbum />}
        </Box>
      </Layout>
    </>
  );
};

export default AttendCareNoticePage;
