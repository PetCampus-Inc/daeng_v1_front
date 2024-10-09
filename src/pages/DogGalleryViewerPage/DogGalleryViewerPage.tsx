import { Layout } from "components/common";
import Header from "components/common/Header";
import styled from "styled-components";

const DogGalleryViewerPage = () => {
  const savePhotoOrVideo = () => {
    alert("사진 또는 동영상을 저장합니다.");
  };

  return (
    <>
      <Header
        type="text"
        text={"2023.12.19"}
        rightElement={<HeaderButton onClick={savePhotoOrVideo}>저장</HeaderButton>}
      />
      <Layout></Layout>
    </>
  );
};

export default DogGalleryViewerPage;

const HeaderButton = styled.button`
  ${({ theme }) => theme.typo.label2_14_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;
