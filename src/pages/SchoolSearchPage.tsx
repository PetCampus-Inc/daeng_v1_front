import Header from "components/common/Header";
import DogOwner from "components/SignIn/DogOwner";
import useSignIn from "hooks/api/useSignIn";
import { PageContainer } from "styles/StyleModule";

const SchoolSearchPage = () => {
  const { setCurrentMainStep } = useSignIn();
  // FIXME 뒤로 가기 버튼 클릭 이슈 해결하기
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
