import GridAlbum from "components/Admin/DogGallery/GridAlbum";
import Header from "components/common/Header";
import { PageContainer } from "styles/StyleModule";

const DogGalleryPage = () => {
  return (
    <>
      <Header type="text" text={"사진 앨범"} rightElement={<button>저장</button>} />
      <PageContainer pt="2" ph="0">
        <GridAlbum />
      </PageContainer>
    </>
  );
};

export default DogGalleryPage;
