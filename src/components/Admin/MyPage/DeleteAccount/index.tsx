import { Checkbox, Flex, Layout, Text } from "components/common";
import Header from "components/common/Header";

interface DeleteAccountProps {
  setStep: (step: number) => void;
}

const DeleteAccount = ({ setStep }: DeleteAccountProps) => {
  return (
    <>
      <Header type="back" handleClick={() => setStep(0)} shadow={true} />
      <Layout type="detail" paddingTop="1.5rem" paddingX="1rem">
        <Flex direction="column" gap={3}>
          <Text as="p" typo="title1_24_B">
            똑독 탈퇴를 원하시나요?
          </Text>
          <Text as="p" typo="body2_16_R" color="gray_2">
            탈퇴 전, 아래 내용을 확인해 주세요
          </Text>
        </Flex>
        <Flex justify="flex-start">
          <Checkbox isChecked />
          <Text>
            지금까지 주고받은 채팅내역, 알림장, 사진앨범 등의 모든 기록이 <Text>영구 삭제</Text>되며
            복구할 수 없어요
          </Text>
        </Flex>
      </Layout>
    </>
  );
};

export default DeleteAccount;
