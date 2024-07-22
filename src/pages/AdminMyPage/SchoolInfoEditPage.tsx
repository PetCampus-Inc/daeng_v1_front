import { Flex, Layout, SearchInput, Text, TextInput } from "components/common";
import Header from "components/common/Header";
import useGetPrincipalInfo from "hooks/api/useGetPrincipalInfo";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useOverlay } from "hooks/common/useOverlay";

import { BackgroundButton } from "../../components/common/Button";
import { PreventLeaveModal } from "../../components/common/Modal";

const SchoolInfoEditPage = () => {
  const { adminId } = useAdminInfo();
  const { data } = useGetPrincipalInfo(adminId);
  const overlay = useOverlay();

  const openModal = () =>
    overlay.open(({ isOpen, close }) => (
      <PreventLeaveModal isOpen={isOpen} close={close} action={close} />
    ));

  return (
    <>
      <Header type="text" text="유치원 정보 수정" handleClick={openModal} />
      <Layout type="detail" pt="6vh">
        <Flex direction="column" marginTop="30rem" height="62%" justify="space-between">
          <Flex direction="column" gap={8}>
            <Text typo="label2_14_R" color="darkBlack">
              유치원 이름
            </Text>
            <TextInput value={data.schoolName} />
          </Flex>
          <Flex direction="column" gap={8}>
            <Text typo="label2_14_R" color="darkBlack">
              전화번호
            </Text>
            <TextInput value={data.schoolNumber} />
          </Flex>
          <Flex direction="column" gap={8}>
            <Text typo="label2_14_R" color="darkBlack">
              유치원 주소
            </Text>
            <SearchInput value={data.address} />
            <TextInput />
          </Flex>
          <Flex direction="column" gap={8}>
            <Text typo="label2_14_R" color="darkBlack">
              사업자 등록번호
            </Text>
            <Text typo="caption1_12_R" color="darkBlack">
              사업자등록번호 변경을 원하시면 010-6684-3515로 문의 주세요
            </Text>
            <TextInput placeholder={data.registrationNumber} disabled />
          </Flex>
        </Flex>
        <BackgroundButton
          backgroundColor="white"
          buttonBackgroundColor="primaryColor"
          fontColor="white"
        >
          수정 완료
        </BackgroundButton>
      </Layout>
    </>
  );
};

export default SchoolInfoEditPage;
