import AllSelectButton from "components/Admin/AttendCare/button/AllSelectButton";
import DeleteDogButton from "components/Admin/AttendCare/button/DeleteDogButton";
import { SelectedIdsProvider } from "components/Admin/AttendCare/context/SelectedIdsProvider";
import DeleteDogList from "components/Admin/AttendCare/list/DeleteDogList";
import { Box, Flex, Text } from "components/common";
import Header from "components/common/Header";
import { useGetCareDogList } from "hooks/api/admin/care";
import { useRouteLoaderData } from "react-router-dom";
import { useRecoilValue } from "recoil";
import caredogLoader from "routes/caredogLoader";
import { adminLoginInfoAtom } from "store/admin";
import { PageContainer } from "styles/StyleModule";

const AttendCareDeletePage = () => {
  const initialData = useRouteLoaderData("caredog") as Awaited<ReturnType<typeof caredogLoader>>;

  const { adminId } = useRecoilValue(adminLoginInfoAtom);
  const { data } = useGetCareDogList(adminId, initialData);

  return (
    <>
      <Header type="text" text="관리 강아지 삭제" />
      <PageContainer color="BGray" pt="2">
        <SelectedIdsProvider>
          <Flex justify="space-between" align="center">
            <Text as="h2" typo="body2_16_R" color="darkBlack">
              삭제할 강아지 선택
            </Text>
            <AllSelectButton data={data} />
          </Flex>
          <Box as="section" marginBlock="24">
            <DeleteDogList data={data} />
          </Box>
          <DeleteDogButton adminId={adminId} />
        </SelectedIdsProvider>
      </PageContainer>
    </>
  );
};

export default AttendCareDeletePage;
