import GridAlbum from "components/Admin/DogGallery/GridAlbum";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { useState } from "react";
import styled from "styled-components";

const DogGalleryPage = () => {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const changeMode = () => {
    setMode((prev) => (prev === "view" ? "edit" : "view"));
  };
  return (
    <>
      {mode === "view" ? (
        <Header
          type="text"
          text={"사진 앨범"}
          rightElement={<HeaderButton onClick={changeMode}>저장</HeaderButton>}
        />
      ) : (
        <Header type="text" text={"저장"} handleClick={changeMode} />
      )}
      <Layout pt="32">
        <GridAlbum mode={mode} />
      </Layout>
    </>
  );
};

export default DogGalleryPage;

const HeaderButton = styled.button`
  ${({ theme }) => theme.typo.label2_14_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;
