import AllSelectButton from "components/Admin/AttendCare/button/AllSelectButton";
import DeleteDogButton from "components/Admin/AttendCare/button/DeleteDogButton";
import { SelectedIdsProvider } from "components/Admin/AttendCare/context/SelectedIdsProvider";
import SelectDogList from "components/Admin/AttendCare/list/SelectDogList";
import { Box, Flex, Layout, Text } from "components/common";
import Header from "components/common/Header";
import { useGetCareDogList } from "hooks/api/admin/care";
import { useRouteLoaderData } from "react-router-dom";
import caredogLoader from "routes/caredogLoader";

const AttendCareDeletePage = () => {
  const initialData = useRouteLoaderData("caredog") as Awaited<ReturnType<typeof caredogLoader>>;

  const { data } = useGetCareDogList(initialData);

  return (
    <>
      <Header type="text" text="관리 강아지 삭제" />
      <Layout bgColor="BGray" pt={32} px={16}>
        <SelectedIdsProvider idKey="attendanceId">
          <Flex justify="space-between" align="center">
            <Text as="h2" typo="body2_16_B" color="darkBlack">
              삭제할 강아지 선택
            </Text>
            <AllSelectButton data={data} />
          </Flex>
          <Box as="section" my={24}>
            <SelectDogList data={data} type={"delete"} />
          </Box>
          <DeleteDogButton />
        </SelectedIdsProvider>
      </Layout>
    </>
  );
};

export default AttendCareDeletePage;
