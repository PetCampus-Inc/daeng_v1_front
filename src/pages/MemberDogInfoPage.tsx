import { MEMBER_DOG_INFO_STEP } from "constants/step";

import Header from "components/common/Header";
import { FootIconItem, Nav, NavItem, NavWrapper } from "components/Member/DogInfo/styles";
import { useState } from "react";
import { PageContainer } from "styles/StyleModule";

const MemberDogInfoPage = () => {
  const currentSteps = MEMBER_DOG_INFO_STEP;
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <Header type="text" text="뽀뽀의 상세정보" shadow={true} />
      <Nav>
        <NavWrapper>
          {currentSteps.map((item, index) => (
            <NavItem
              key={item}
              className={
                index === currentStep ? "selected" : index === currentSteps.length - 1 ? "last" : ""
              }
              onClick={() => {
                setCurrentStep(index);
              }}
            >
              {currentStep === index ? <FootIconItem className="selected" /> : null}
              {item}
            </NavItem>
          ))}
        </NavWrapper>
      </Nav>
      <PageContainer color="gray_5">
        {currentStep === 0 ? "" : ""}
        {currentStep === 1 ? "" : ""}
        {currentStep === 2 ? "" : ""}
      </PageContainer>
    </>
  );
};

export default MemberDogInfoPage;
