import { PATH } from "constants/path";

import { Box, Checkbox, Flex, Layout, Text } from "components/common";
import { BackgroundButton } from "components/common/Button";
import Header from "components/common/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DeleteAccountProps {
  setStep: (step: number) => void;
}

const DeleteAccount = ({ setStep }: DeleteAccountProps) => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(PATH.ADMIN_MY_PAGE_DELETE_COMPLETE);
    return;
  };

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
          marginTop={30}
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
        <Box
          width="100%"
          border={1}
          borderRadius={8}
          borderColor={`${isAllChecked ? "transparent" : "gray_4"}`}
          backgroundColor={`${isAllChecked ? "br_5" : "transparent"}`}
          padding={12}
          marginTop={15}
        >
          <Checkbox
            isChecked={isAllChecked}
            variant="default"
            label={
              <Text color="gray_1">
                탈퇴 후 사용했던 소셜 아이디로{" "}
                <Text color="primaryColor">재가입 시 신규회원으로 가입</Text> 돼요
              </Text>
            }
          />
        </Box>
        <Box
          width="100%"
          border={1}
          borderRadius={8}
          borderColor={`${isAllChecked ? "transparent" : "gray_4"}`}
          backgroundColor={`${isAllChecked ? "br_5" : "transparent"}`}
          padding={12}
          marginTop={15}
        >
          <Checkbox
            isChecked={isAllChecked}
            variant="default"
            label={
              <Text color="gray_1">
                원장님이 등록한 유치원의 <Text color="primaryColor">활동 기록</Text>과{" "}
                <Text color="primaryColor">정보</Text>, 가입된{" "}
                <Text color="primaryColor">회원 및 교사 정보</Text>는 모두{" "}
                <Text color="primaryColor">초기화</Text>되고 복구되지 않아요
              </Text>
            }
          />
        </Box>
        <Box
          width="100%"
          border={1}
          borderRadius={8}
          borderColor={`${isAllChecked ? "transparent" : "gray_4"}`}
          backgroundColor={`${isAllChecked ? "br_5" : "transparent"}`}
          padding={12}
          marginTop={15}
        >
          <Checkbox
            isChecked={isAllChecked}
            variant="default"
            label={
              <Text color="gray_1">
                모든 <Text color="primaryColor">개인 정보</Text>가 삭제돼요
              </Text>
            }
          />
        </Box>
        <Box
          width="100%"
          border={1}
          borderRadius={8}
          borderColor={`${isAllChecked ? "transparent" : "gray_4"}`}
          backgroundColor={`${isAllChecked ? "br_4" : "transparent"}`}
          padding={12}
          marginTop={60}
        >
          <Checkbox
            onChange={() => setIsAllChecked(!isAllChecked)}
            isChecked={isAllChecked}
            variant="default"
            label={
              <Text color={`${isAllChecked ? "primaryColor" : "gray_1"}`}>
                위 안내사항에 모두 동의해요
              </Text>
            }
          />
        </Box>
        <BackgroundButton onClick={onSubmit} disabled={!isAllChecked} backgroundColor="white">
          탈퇴하기
        </BackgroundButton>
      </Layout>
    </>
  );
};

export default DeleteAccount;
