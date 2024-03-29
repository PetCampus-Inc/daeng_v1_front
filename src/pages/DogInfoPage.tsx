import { ADMIN_DOG_DETAIL_INFO_STEP } from "constants/step";

import GalleryIcon from "assets/svg/gallery-icon";
import AttendanceRecord from "components/Admin/DogDetailInfo/AttendanceRecord";
import DogInfo from "components/Admin/DogDetailInfo/DogInfo";
import Notice from "components/Admin/DogDetailInfo/Notice";
import {
  Circle,
  ContentWrapper,
  NavItem,
  NavWrapper,
  Underline
} from "components/Admin/DogDetailInfo/styles";
import Ticket from "components/Admin/DogDetailInfo/Ticket";
import Header from "components/common/Header";
import useGetPrecautions from "hooks/api/useGetPrecautions";
import { Suspense, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const DogInfoPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSteps = ADMIN_DOG_DETAIL_INFO_STEP;
  const [currentStep, setCurrentStep] = useState(0);
  const dogId = useLocation().pathname.split("/").pop(); // TODO: 보안 측면에서 더 나은 방법이 있는지에 대한 고민
  const { data } = useGetPrecautions(Number(dogId));
  const showNotice = !!data.modifiedList;

  return (
    <>
      <Header
        type="text"
        text={`${searchParams.get("dog_name")}의 상세 정보`}
        handleClick={() => navigate("/admin/attendance")}
        rightElement={
          <GalleryIcon
            handleTouch={() => {
              navigate("/gallery");
            }}
          />
        }
      />
      <PageContainer pt="2" ph="0" color="primaryColor">
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
                {searchParams.get("ticket_status") === "true" && index === 2 ? <Circle /> : null}
                {showNotice && index === 3 ? <Circle /> : null}
                {index === currentStep ? <Underline layoutId="underline" /> : null}
              </NavItem>
            ))}
          </NavWrapper>
        </nav>
        <ContentWrapper>
          <Suspense>
            {currentStep === 0 && <DogInfo />}
            {currentStep === 1 && <AttendanceRecord />}
            {currentStep === 2 && <Ticket />}
            {currentStep === 3 && <Notice data={data} />}
          </Suspense>
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default DogInfoPage;
