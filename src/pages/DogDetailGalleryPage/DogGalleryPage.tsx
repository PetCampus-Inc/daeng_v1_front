import GridAlbum from "components/Admin/DogGallery/GridAlbum";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { useState } from "react";
import styled from "styled-components";

const DogGalleryPage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const changeMode = () => setIsEditing((prev) => !prev);

  return (
    <>
      <Header
        type="text"
        text={isEditing ? "항목 선택" : "사진 앨범"}
        handleClick={isEditing ? changeMode : undefined}
        rightElement={!isEditing && <HeaderButton onClick={changeMode}>선택</HeaderButton>}
      />
      <Layout>
        <GridAlbum isEditing={isEditing} />
      </Layout>
    </>
  );
};

export default DogGalleryPage;

const HeaderButton = styled.button`
  ${({ theme }) => theme.typo.label2_14_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;
