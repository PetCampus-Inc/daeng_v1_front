import Header from "components/common/Header";
import DogInfo from "components/Admin/DogDetailInfo/DogInfo";
import { ADMIN_DOG_DETAIL_INFO_STEP } from "constants/step";
import useStep from "hooks/common/useStep";
import AttendanceRecord from "components/Admin/DogDetailInfo/AttendanceRecord";
import Ticket from "components/Admin/DogDetailInfo/Ticket";
import Notice from "components/Admin/DogDetailInfo/Notice";
import { PageContainer } from "styles/StyleModule";
import {
  ContentWrapper,
  NavItem,
  NavWrapper,
  Underline
} from "components/Admin/DogDetailInfo/styles";
import { ThemeConfig } from "styles/ThemeConfig";
import { useNavigate } from "react-router-dom";
import GalleryIcon from "assets/svg/gallery-icon";

const DogInfoPage = () => {
  const navigate = useNavigate();
  const currentSteps = ADMIN_DOG_DETAIL_INFO_STEP;
  const { currentStep, setStep } = useStep(0, currentSteps.length - 1);

  return (
    <>
      <Header
        type="text"
        text="뽀뽕의 상세 정보"
        handleClick={() => navigate("/admin/attendance")}
        rightElement={<GalleryIcon handleTouch={() => navigate("/gallery")} />}
      />
      <PageContainer color={ThemeConfig.colors.primaryColor} $padding="calc(5vh + 2rem) 0 0">
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
      </PageContainer>
    </>
  );
};

export default DogInfoPage;
