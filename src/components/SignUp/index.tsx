import { RoleConstants } from "constants/index";
import { PATH } from "constants/path";

import Button from "components/common/Button";
import Header from "components/common/Header";
import useSignUp from "hooks/api/useSignUp";
import { memo } from "react";
import { Link } from "react-router-dom";
import { ThemeConfig } from "styles/ThemeConfig";

import Principal from "./Principal";
import RoleBox from "./RoleBox";
import Teacher from "./Teacher";
import { Container, StyledBottomWrapper, StyledSelectRoleWrapper } from "../SignIn/styles";

const SingUp = () => {
  const { currentMainStep, setCurrentMainStep, selectedRole, setSelectedRole } = useSignUp();
  return (
    <>
      {currentMainStep === 0 && (
        <Link to={PATH.LOGIN}>
          <Header type="text" text="역할 선택" />
        </Link>
      )}
      {currentMainStep === 0 && (
        <Container padding_top="20%">
          <StyledSelectRoleWrapper>
            <RoleBox
              Role={0}
              selected={selectedRole === 0 ? true : false}
              mainText={RoleConstants[0].role}
              subText={RoleConstants[0].description}
              handleClick={() => {
                selectedRole === 0 ? setSelectedRole(-1) : setSelectedRole(0);
              }}
            />
            <RoleBox
              Role={1}
              selected={selectedRole === 1 ? true : false}
              mainText={RoleConstants[1].role}
              subText={RoleConstants[1].description}
              handleClick={() => {
                selectedRole === 1 ? setSelectedRole(-1) : setSelectedRole(1);
              }}
            />
          </StyledSelectRoleWrapper>
          <StyledBottomWrapper>
            {currentMainStep === 0 && (
              <Button
                width="100%"
                height="30%"
                text="다음"
                weight="bold"
                size="1.1rem"
                handleClick={() => {
                  if (selectedRole !== -1) {
                    setCurrentMainStep(currentMainStep + 1);
                  }
                }}
                backcolor={selectedRole !== -1 ? undefined : ThemeConfig.colors.gray_5}
                textcolor={selectedRole !== -1 ? undefined : ThemeConfig.colors.gray_2}
              />
            )}
          </StyledBottomWrapper>
        </Container>
      )}

      {selectedRole === 0 && currentMainStep === 1 && (
        <Teacher currentMainStep={currentMainStep} setCurrentMainStep={setCurrentMainStep} />
      )}
      {selectedRole === 1 && currentMainStep === 1 && (
        <Principal currentMainStep={currentMainStep} setCurrentMainStep={setCurrentMainStep} />
      )}
    </>
  );
};

export default memo(SingUp);
