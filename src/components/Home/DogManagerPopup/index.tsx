import AddCIcon from "assets/svg/add-c-icon";
import { Box, Flex, Text } from "components/common";
import { useGetDogs } from "hooks/api/member/member";
import { useRecoilState } from "recoil";
import { dogIdState } from "store/member";

import { DogAvatar, DogItem, ListContent, Name } from "./styles";
import { BottomSheet, type BottomSheetProps } from "../../common/BottomSheet";
import { Img } from "../styles";

const DogManagerPopup = ({ isOpen, close }: BottomSheetProps) => {
  const [selectedDogId, setSelectedDogId] = useRecoilState(dogIdState);
  const { data: dogList } = useGetDogs();

  const getIsActive = (id: number) => selectedDogId === id;

  const handleSelectDog = (dogId: number) => {
    close();
    setSelectedDogId(dogId);
  };

  return (
    <BottomSheet isOpen={isOpen} close={close}>
      <BottomSheet.Content>
        <Flex justify="space-between">
          <BottomSheet.Title>강아지 변경</BottomSheet.Title>
          <BottomSheet.Control />
        </Flex>
        <ListContent>
          {dogList?.map((item) => (
            <DogItem
              className={getIsActive(item.dogId) ? "active" : ""}
              key={`dog-avatar-${item.dogId}`}
              onClick={() => handleSelectDog(item.dogId)}
            >
              <DogAvatar className="dog-avatar">
                <Img src={item.imageUri} />
              </DogAvatar>
              <Name className="dog-name">{item.dogName}</Name>
            </DogItem>
          ))}
          <Box display="flex" direction="column" position="relative" align="center">
            <DogAvatar>
              <AddCIcon />
            </DogAvatar>
            <Text typo="body2_16_R" color="gray_1">
              강아지 추가
            </Text>
          </Box>
        </ListContent>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default DogManagerPopup;

// const mock = [
//   {
//     memberId: 1,
//     dogId: 1,
//     dogName: "커튼커튼",
//     imageUri:
//       "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   },
//   {
//     memberId: 1,
//     dogId: 13,
//     dogName: "엘리자베스",
//     imageUri:
//       "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     memberId: 1,
//     dogId: 11,
//     dogName: "제시카",
//     imageUri:
//       "https://plus.unsplash.com/premium_photo-1671810380315-db8f09dc913b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D"
//   },
//   {
//     memberId: 1,
//     dogId: 12,
//     dogName: "뚜비씨",
//     imageUri:
//       "https://i.namu.wiki/i/2yfkYrf3zG1S0xFpno25wd3Dub-ZuHHhzXVbkiV3R2RzpI789-lYS59s9nrCsoE0-6NtVJr2JaKvkmu5CjGFOA.webp"
//   }
// ];
