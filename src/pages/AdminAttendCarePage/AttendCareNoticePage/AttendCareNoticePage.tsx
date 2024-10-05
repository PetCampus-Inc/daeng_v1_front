import DogInfoBox from "components/Admin/AttendCareNotice/DogInfoBox";
import PhotoAlbum from "components/Admin/AttendCareNotice/PhotoAlbum";
import WriteNotice from "components/Admin/AttendCareNotice/WriteNotice";
import { Box, Layout } from "components/common";
import Header from "components/common/Header";
import MenuToggle from "components/common/MenuToggle";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface DogProfileInfo {
  dogName: string;
  profileUri: string;
}

const AttendCareNoticePage = () => {
  const { dogName, profileUri }: DogProfileInfo = useLocation().state;
  if (!dogName || !profileUri) throw new Error("잘못된 접근입니다.");

  const initialTabs = ["알림장", "사진앨범"]; //임시. constant로 옮기기
  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);

  return (
    <>
      <Header type="text" text={`${dogName} 상세 페이지`} />
      <Layout>
        <DogInfoBox dogName={dogName} profileUri={profileUri} />
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
