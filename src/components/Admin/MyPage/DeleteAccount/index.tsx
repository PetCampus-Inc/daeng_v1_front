import { PATH } from "constants/path";

import { Box, Checkbox, Flex, Layout, Text } from "components/common";
import { BottomButton } from "components/common/Button";
import Header from "components/common/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "types/common/role.types";
import { useDeleteTeacher } from "hooks/api/admin/mypage";
import { useAdminInfo } from "hooks/common/useAdminInfo";

interface DeleteAccountProps {
  setStep: (step: number) => void;
  role: string;
}

type ContentCheck = {
  1: boolean;
  2: boolean;
  3: boolean;
  4: boolean;
};

const DeleteAccount = ({ setStep, role }: DeleteAccountProps) => {
  const { mutateDeleteTeacher } = useDeleteTeacher();
  const { adminId } = useAdminInfo();
  const [contents, setContents] = useState({
    1: false,
    2: false,
    3: false,
    4: false
  });

  const isAllChecked =
    role === Role.ROLE_OWNER ? Object.values(contents).every(Boolean) : contents[1] && contents[2];

  const checkAll = () => {
    const newState = !isAllChecked;
    setContents({
      1: newState,
      2: newState,
      3: newState,
      4: newState
    });
  };

  const checkIndividual = (key: keyof ContentCheck) => {
    setContents((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const navigate = useNavigate();

  const onSubmit = () => {
    if (isAllChecked) {
      mutateDeleteTeacher(adminId);
      navigate(PATH.ADMIN_MY_PAGE_DELETE_COMPLETE);
    }
    return;
  };

  const renderCheckboxItem = (key: keyof ContentCheck, text: string, marginTop: number) => (
    <Box
      width="100%"
      border={1}
      borderRadius={8}
      borderColor={contents[key] ? "transparent" : "gray_4"}
      backgroundColor={contents[key] ? "br_5" : "transparent"}
      padding={12}
      marginTop={marginTop}
    >
      <Checkbox
        onChange={() => checkIndividual(key)}
        isChecked={contents[key]}
        variant="default"
        label={
          <Text color="gray_1">
            {text.split(/(<.*?>)/g).map((segment, index) =>
              /<.*?>/.test(segment) ? (
                <Text key={index} color="primaryColor">
                  {segment.replace(/<|>/g, "")}
                </Text>
              ) : (
                segment
              )
            )}
          </Text>
        }
      />
    </Box>
  );

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
        {renderCheckboxItem(
          1,
          "지금까지 주고받은 채팅내역, 알림장, 사진앨범 등의 모든 기록이 <영구 삭제>되며 복구할 수 없어요",
          30
        )}
        {renderCheckboxItem(
          2,
          "탈퇴 후 사용했던 소셜 아이디로 <재가입 시 신규회원으로 가입> 돼요",
          15
        )}
        {role === Role.ROLE_OWNER &&
          renderCheckboxItem(
            3,
            "원장님이 등록한 유치원의 <활동 기록>과 <정보>, 가입된 <회원 및 교사 정보>는 모두 <초기화>되고 복구되지 않아요",
            15
          )}
        {role === Role.ROLE_OWNER && renderCheckboxItem(4, "모든 <개인 정보>가 삭제돼요", 15)}
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
            onChange={checkAll}
            isChecked={isAllChecked}
            variant="default"
            label={
              <Text color={`${isAllChecked ? "primaryColor" : "gray_1"}`}>
                위 안내사항에 모두 동의해요
              </Text>
            }
          />
        </Box>
        <BottomButton onClick={onSubmit} disabled={!isAllChecked}>
          탈퇴하기
        </BottomButton>
      </Layout>
    </>
  );
};

export default DeleteAccount;
