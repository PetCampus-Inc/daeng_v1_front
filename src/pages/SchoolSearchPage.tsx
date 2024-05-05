import Header from "components/common/Header";
import DogOwner from "components/SignIn/DogOwner";
import useSignIn from "hooks/api/useSignIn";
import { PageContainer } from "styles/StyleModule";

const SchoolSearchPage = () => {
  const { setCurrentMainStep } = useSignIn();
  return (
    <>
      <Header type="back" />
      <PageContainer pt="2" color="white">
        <DogOwner currentMainStep={1} setCurrentMainStep={setCurrentMainStep} />
      </PageContainer>
    </>
  );
};

export default SchoolSearchPage;
