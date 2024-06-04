import { MEMBER_DOG_INFO_STEP } from "constants/step";

import Header from "components/common/Header";
import DogInfo from "components/Member/DogInfo";
import AttendanceTicketInfo from "components/Member/DogInfo/AttendanceTicketInfo";
import SchoolInfo from "components/Member/DogInfo/SchoolInfo";
import { FootIconItem, Nav, NavItem, NavWrapper } from "components/Member/DogInfo/styles";
import { useGetMemberDogDetailnfo } from "hooks/api/member/member";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "styles/StyleModule";

const MemberDogInfoPage = () => {
  const { dogId } = useParams();
  const currentSteps = MEMBER_DOG_INFO_STEP;
  const [currentStep, setCurrentStep] = useState(0);
  const { data } = useGetMemberDogDetailnfo(Number(dogId));

  return (
    <>
      <Header type="text" text={`${data.dogName}의 상세정보`} shadow={true} />
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
        {currentStep === 0 && <DogInfo dogId={Number(dogId)} />}
        {currentStep === 1 && <SchoolInfo dogId={Number(dogId)} />}
        {currentStep === 2 && <AttendanceTicketInfo dogId={Number(dogId)} />}
      </PageContainer>
    </>
  );
};

export default MemberDogInfoPage;
