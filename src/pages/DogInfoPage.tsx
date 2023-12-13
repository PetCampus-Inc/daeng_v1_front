import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import DogInfo from "components/Admin/DogInfo";

const DogInfoPage = () => {
  return (
    <>
      <Header type="main" />
      <DogInfo />
      <NavBar type="admin" attendance={"/admin/dogInfo"} />
    </>
  );
};

export default DogInfoPage;
