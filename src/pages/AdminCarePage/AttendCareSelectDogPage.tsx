import SubmitButton from "components/Admin/AttendCare/AttendCareGallery/SubmitButton";
import AllSelectButton from "components/Admin/AttendCare/button/AllSelectButton";
import { SelectedIdsProvider } from "components/Admin/AttendCare/context/SelectedIdsProvider";
import SelectDogList from "components/Admin/AttendCare/list/SelectDogList";
import { Box, Flex, Text } from "components/common";
import Header from "components/common/Header";
import { useGetCareDogList } from "hooks/api/admin/care";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useRouteLoaderData } from "react-router-dom";
import caredogLoader from "routes/caredogLoader";
import { PageContainer } from "styles/StyleModule";

const AttendCareSelectDogPage = () => {
  const initialData = useRouteLoaderData("caredog") as Awaited<ReturnType<typeof caredogLoader>>;

  const { adminId } = useAdminInfo();
  const { data } = useGetCareDogList(adminId, initialData);

  return (
    <>
      <Header type="text" text="사진 전송" />
      <PageContainer color="BGray" pt="2">
        <SelectedIdsProvider>
          <Flex justify="space-between" align="center">
            <Text as="h2" typo="body2_16_B" color="darkBlack">
              전송할 강아지 선택
            </Text>
            <AllSelectButton data={data} />
          </Flex>
          <Box as="section" marginBlock="24">
            <SelectDogList data={data} />
          </Box>
          <SubmitButton />
        </SelectedIdsProvider>
      </PageContainer>
    </>
  );
};

export default AttendCareSelectDogPage;
