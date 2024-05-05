import { Box, Flex, Text } from "components/common";
import BottomSheet, { type IBottomSheetProps } from "components/common/BottomSheet";
import { useGetCachedCareDogInfo } from "hooks/api/admin/care";
import { Img } from "styles/StyleModule";

const PreviousInfoGuideBottomSheet = ({ isOpen, close }: IBottomSheetProps) => {
  const { data, removeCachedData } = useGetCachedCareDogInfo();

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <BottomSheet.Title align="left">추가한 강아지의 오늘 관리 기록이 있어요</BottomSheet.Title>
        <BottomSheet.Subtitle align="left">
          추가한 강아지의 오늘 관리 기록을 받았어요
        </BottomSheet.Subtitle>
        <Flex direction="column" gap={12} mt={12}>
          {data?.map((dog) => (
            <Box
              key={dog.dogId}
              paddingBlock={16}
              paddingInline={18}
              border={1}
              borderColor="gray_4"
              borderRadius={12}
            >
              <Flex gap={8} align="center">
                <Box width="44px" height="44px" borderRadius="circle" overflow="hidden">
                  <Img
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="강아지 이미지"
                  />
                </Box>
                <Text typo="body2_16_B" color="darkBlack">
                  {dog.dogName}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flex>
        <BottomSheet.Button
          actionText="확인"
          actionFn={() => {
            removeCachedData();
            close();
          }}
        />
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default PreviousInfoGuideBottomSheet;
