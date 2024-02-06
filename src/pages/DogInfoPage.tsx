import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import DogInfo from "components/Admin/DogInfo";
import { PATH } from "constants/path";

const DogInfoPage = () => {
  return (
    <>
      <Header type="main" />
      <DogInfo />
      <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
    </>
  );
};

export default DogInfoPage;
