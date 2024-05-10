import { Box, Text, Layout, Flex } from "components/common";
import Header from "components/common/Header";
import { StyledButton } from "components/SignIn/styles";
import RoleBox from "components/SignUp/RoleBox";
import { useState } from "react";

interface IStepProps {
  onNextStep: (role: "TEACHER" | "OWNER") => void;
}
export enum Role {
  TEACHER = "TEACHER",
  OWNER = "OWNER"
}

const RoleSelectPage = ({ onNextStep }: IStepProps) => {
  const [selected, setSelected] = useState<Role | null>(null);

  const handleSelected = (role: Role) => {
    setSelected(role);
  };

  return (
    <>
      <Header type="text" text="역할 선택" />
      <Layout type="page" pt={44}>
        <Flex justify="center" gap={16}>
          <RoleBox
            role="TEACHER"
            mainText="선생님"
            subText="강아지 유치원에
근무중인 선생님"
            selected={selected === Role.TEACHER}
            handleClick={() => handleSelected(Role.TEACHER)}
          />
          <RoleBox
            role="OWNER"
            mainText="원장님"
            subText="강아지 유치원을
운영중인 원장님"
            selected={selected === Role.OWNER}
            handleClick={() => handleSelected(Role.OWNER)}
          />
        </Flex>

        <Box position="absolute" left={16} right={16} bottom={24}>
          <StyledButton
            type="button"
            bg="primaryColor"
            onClick={() => selected && onNextStep(selected)}
            disabled={!selected}
          >
            <Text className={selected ? "" : "inactive"} typo="label1_16_B" color="white">
              다음
            </Text>
          </StyledButton>
        </Box>
      </Layout>
    </>
  );
};

export default RoleSelectPage;
