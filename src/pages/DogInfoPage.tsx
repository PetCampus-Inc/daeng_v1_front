import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import DogInfo from "components/Admin/DogInfo";
import { PATH } from "constants/path";
import GalleryIcon from "assets/svg/gallery-icon";

const DogInfoPage = () => {
  return (
    <>
      <Header type="text" rightElement={<GalleryIcon />} />
      <DogInfo />
      <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
    </>
  );
};

export default DogInfoPage;
