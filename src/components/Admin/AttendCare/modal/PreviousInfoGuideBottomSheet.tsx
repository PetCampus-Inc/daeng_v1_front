import { Box, Flex, Text } from "components/common";
import { BottomSheet, type BottomSheetProps } from "components/common/BottomSheet";
import { useGetCachedCareDogInfo } from "hooks/api/admin/care";
import { Img } from "styles/StyleModule";

const PreviousInfoGuideBottomSheet = ({ isOpen, close }: BottomSheetProps) => {
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
                  <Img src={dog.profileUri} alt="강아지 이미지" />
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
