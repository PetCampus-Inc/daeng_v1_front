import GridAlbum from "components/Admin/DogGallery/GridAlbum";
import BackgroundButton from "components/common/Button/BackgroundButton";
import Header from "components/common/Header";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { PageContainer } from "styles/StyleModule";

const DogGalleryPage = () => {
  const methods = useForm({
    mode: "onChange",
    shouldUnregister: false
  });

  const [mode, setMode] = useState<"view" | "edit">("view");

  const changeMode = () => {
    setMode((prev) => (prev === "view" ? "edit" : "view"));
  };

  const handleSavePictures = () => {
    // TODO: 사진 저장 앱 연동 작업
  };

  return (
    <FormProvider {...methods}>
      {mode === "view" ? (
        <Header
          type="text"
          text={"사진 앨범"}
          rightElement={<HeaderButton onClick={changeMode}>저장</HeaderButton>}
        />
      ) : (
        <Header type="text" text={"저장"} handleClick={changeMode} />
      )}
      <PageContainer pt="2" ph="0">
        <GridAlbum mode={mode} />
        {mode === "edit" && (
          <BackgroundButtonWrapper>
            <BackgroundButton
              onClick={handleSavePictures}
              disabled={false}
              backgroundColor={"white"}
            >
              0장 사진 저장
            </BackgroundButton>
          </BackgroundButtonWrapper>
        )}
      </PageContainer>
    </FormProvider>
  );
};

export default DogGalleryPage;

const HeaderButton = styled.button`
  ${({ theme }) => theme.typo.label2_14_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

const BackgroundButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;
