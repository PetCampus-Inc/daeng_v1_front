import Header from "components/common/Header";
import DogInfo from "components/Admin/DogDetailInfo/DogInfo";
import { ADMIN_DOG_DETAIL_INFO_STEP } from "constants/step";
import AttendanceRecord from "components/Admin/DogDetailInfo/AttendanceRecord";
import Ticket from "components/Admin/DogDetailInfo/Ticket";
import Notice from "components/Admin/DogDetailInfo/Notice";
import { PageContainer } from "styles/StyleModule";
import {
  Circle,
  ContentWrapper,
  NavItem,
  NavWrapper,
  Underline
} from "components/Admin/DogDetailInfo/styles";
import { ThemeConfig } from "styles/ThemeConfig";
import { useNavigate, useSearchParams } from "react-router-dom";
import GalleryIcon from "assets/svg/gallery-icon";
import { useState } from "react";
import useGetPrecautions from "hooks/api/useGetPrecautions";

const DogInfoPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSteps = ADMIN_DOG_DETAIL_INFO_STEP;
  const [currentStep, setCurrentStep] = useState(0);
  const { data } = useGetPrecautions(2);
  const showNotice = data.modifiedList.length > 0;

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
                {showNotice && index === 3 ? <Circle /> : null}
                {index === currentStep ? <Underline layoutId="underline" /> : null}
              </NavItem>
            ))}
          </NavWrapper>
        </nav>
        <ContentWrapper>
          {currentStep === 0 && <DogInfo />}
          {currentStep === 1 && <AttendanceRecord />}
          {currentStep === 2 && <Ticket />}
          {currentStep === 3 && <Notice data={data} />}
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default DogInfoPage;
