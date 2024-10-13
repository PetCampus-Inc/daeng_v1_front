import GridAlbum from "components/Admin/DogGallery/GridAlbum";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DogGalleryPage = () => {
  const { dogId } = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const changeMode = () => setIsEditing((prev) => !prev);

  return (
    <>
      <Header
        type="text"
        text={isEditing ? "저장" : "사진 앨범"}
        handleClick={isEditing ? changeMode : undefined}
        rightElement={!isEditing && <HeaderButton onClick={changeMode}>저장</HeaderButton>}
      />
      <Layout>
        <GridAlbum dogId={Number(dogId)} isEditing={isEditing} />
      </Layout>
    </>
  );
};

export default DogGalleryPage;

const HeaderButton = styled.button`
  ${({ theme }) => theme.typo.label2_14_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;
