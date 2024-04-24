import DogInfoBox from "components/Admin/AttendCareNotice/DogInfoBox";
import { PaddingContainer } from "components/Admin/AttendCareNotice/styles";
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
      <Header type="text" transparent text={`${searchParams.get("dog_name")} 상세 페이지`} />
      <PageContainer ph="0" pt="1">
        <DogInfoBox />
        <PaddingContainer>
          <MenuToggle selectedTab={selectedTab} />
        </PaddingContainer>
      </PageContainer>
    </>
  );
};

export default AttendCareNoticePage;
