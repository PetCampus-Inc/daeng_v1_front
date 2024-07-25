import { Box, Checkbox, Flex, Layout, Text } from "components/common";
import Header from "components/common/Header";
import { useState } from "react";

interface DeleteAccountProps {
  setStep: (step: number) => void;
}

const DeleteAccount = ({ setStep }: DeleteAccountProps) => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  return (
    <>
      <Header type="back" handleClick={() => setStep(0)} shadow={true} />
      <Layout type="detail" paddingTop="1.5rem" paddingX="1rem">
        <Flex direction="column" gap={3}>
          <Text as="p" typo="title1_24_B">
            똑독 탈퇴를 원하시나요?
          </Text>
          <Text as="p" color="gray_2">
            탈퇴 전, 아래 내용을 확인해 주세요
          </Text>
        </Flex>
        <Box
          width="100%"
          border={1}
          borderRadius={8}
          borderColor={`${isAllChecked ? "transparent" : "gray_4"}`}
          backgroundColor={`${isAllChecked ? "br_5" : "transparent"}`}
          padding={12}
        >
          <Checkbox
            isChecked={isAllChecked}
            variant="default"
            label={
              <Text color="gray_1">
                지금까지 주고받은 채팅내역, 알림장, 사진앨범 등의 모든 기록이{" "}
                <Text color="primaryColor">영구 삭제</Text>되며 복구할 수 없어요
              </Text>
            }
          />
        </Box>
      </Layout>
    </>
  );
};

export default DeleteAccount;
