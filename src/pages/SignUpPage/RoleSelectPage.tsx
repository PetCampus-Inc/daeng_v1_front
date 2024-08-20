import { Box, Text, Layout, Flex } from "components/common";
import Header from "components/common/Header";
import { StyledButton } from "components/SignIn/styles";
import RoleBox from "components/SignUp/RoleBox";
import { useState } from "react";
import { AdminRole } from "types/common/role.types";

interface IStepProps {
  onNextStep: (role: AdminRole) => void;
}

const RoleSelectPage = ({ onNextStep }: IStepProps) => {
  const [selected, setSelected] = useState<AdminRole | null>(null);

  const handleSelected = (role: AdminRole) => setSelected(role);

  return (
    <>
      <Header type="text" text="역할 선택" />
      <Layout bgColor="white" pt={44} px={16}>
        <Flex justify="center" gap={16}>
          <RoleBox
            role={AdminRole.ROLE_TEACHER}
            mainText="선생님"
            subText={`강아지 유치원에\n근무중인 선생님`}
            selected={selected === AdminRole.ROLE_TEACHER}
            handleClick={() => handleSelected(AdminRole.ROLE_TEACHER)}
          />
          <RoleBox
            role={AdminRole.ROLE_OWNER}
            mainText="원장님"
            subText={`강아지 유치원을\n운영중인 원장님`}
            selected={selected === AdminRole.ROLE_OWNER}
            handleClick={() => handleSelected(AdminRole.ROLE_OWNER)}
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
