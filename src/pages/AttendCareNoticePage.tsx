import DogInfoBox from "components/Admin/AttendCareNotice/DogInfoBox";
import PhotoAlbum from "components/Admin/AttendCareNotice/PhotoAlbum";
import { PaddingContainer } from "components/Admin/AttendCareNotice/styles";
import WriteNotice from "components/Admin/AttendCareNotice/WriteNotice";
import Header from "components/common/Header";
import MenuToggle from "components/common/MenuToggle";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const AttendCareNoticePage = () => {
  const [searchParams] = useSearchParams();
  const initialTabs = ["알림장", "사진앨범"]; //임시. constant로 옮기기
  const [selectedTab, setSelectedTab] = useState(initialTabs[0]);

  return (
    <>
      <Header type="text" text={`${searchParams.get("dog_name")} 상세 페이지`} />
      <PageContainer ph="0" pb="2">
        <DogInfoBox />
        <PaddingContainer>
          <MenuToggle selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {selectedTab === "알림장" && <WriteNotice />}
          {selectedTab === "사진앨범" && <PhotoAlbum />}
        </PaddingContainer>
      </PageContainer>
    </>
  );
};

export default AttendCareNoticePage;
