import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import DogInfo from "components/Admin/DogDetailInfo/DogInfo";
import { PATH } from "constants/path";
import { ADMIN_DOG_DETAIL_INFO_STEP } from "constants/step";
import useStep from "hooks/common/useStep";
import AttendanceRecord from "components/Admin/DogDetailInfo/AttendanceRecord";
import Ticket from "components/Admin/DogDetailInfo/Ticket";
import Notice from "components/Admin/DogDetailInfo/Notice";
import { PageContainer, WhiteBackground } from "styles/StyleModule";
import {
  ContentWrapper,
  NavItem,
  NavWrapper,
  Underline
} from "components/Admin/DogDetailInfo/styles";

const DogInfoPage = () => {
  const currentSteps = ADMIN_DOG_DETAIL_INFO_STEP;
  const { currentStep, setStep } = useStep(0, currentSteps.length - 1);

  return (
    <>
      {/* <Header type="main" /> */}
      <PageContainer>
        <WhiteBackground>
          <nav>
            <NavWrapper>
              {currentSteps.map((item, index) => (
                <NavItem
                  key={item}
                  className={index === currentStep ? "selected" : ""}
                  onClick={() => setStep(index)}
                >
                  {item}
                  {index === currentStep ? <Underline layoutId="underline" /> : null}
                </NavItem>
              ))}
            </NavWrapper>
          </nav>
          <ContentWrapper>
            {currentStep === 0 && <DogInfo />}
            {currentStep === 1 && <AttendanceRecord />}
            {currentStep === 2 && <Ticket />}
            {currentStep === 3 && <Notice />}
          </ContentWrapper>
          <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
        </WhiteBackground>
      </PageContainer>
    </>
  );
};

export default DogInfoPage;
