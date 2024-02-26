import { ADMIN_DOG_DETAIL_INFO_STEP } from "constants/step";

import GalleryIcon from "assets/svg/gallery-icon";
import AttendanceRecord from "components/Admin/DogDetailInfo/AttendanceRecord";
import DogInfo from "components/Admin/DogDetailInfo/DogInfo";
import Notice from "components/Admin/DogDetailInfo/Notice";
import {
  ContentWrapper,
  NavItem,
  NavWrapper,
  Underline
} from "components/Admin/DogDetailInfo/styles";
import Ticket from "components/Admin/DogDetailInfo/Ticket";
import Header from "components/common/Header";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";
import { ThemeConfig } from "styles/ThemeConfig";

const DogInfoPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSteps = ADMIN_DOG_DETAIL_INFO_STEP;
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <Header
        type="text"
        text="뽀뽕의 상세 정보"
        handleClick={() => navigate("/admin/attendance")}
        rightElement={
          <GalleryIcon
            handleTouch={() => {
              navigate("/gallery");
            }}
          />
        }
      />
      <PageContainer color={ThemeConfig.colors.primaryColor} $padding="calc(5vh + 2rem) 0 0">
        <nav>
          <NavWrapper>
            {currentSteps.map((item, index) => (
              <NavItem
                key={item}
                className={index === currentStep ? "selected" : ""}
                onClick={() => {
                  setCurrentStep(index);
                  if (searchParams.has("date")) {
                    searchParams.delete("date");
                    setSearchParams(searchParams);
                  }
                }}
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
