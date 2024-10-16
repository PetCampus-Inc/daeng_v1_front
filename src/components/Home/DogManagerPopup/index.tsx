import { routes } from "constants/path";

import PlaceholderImg from "assets/images/placeholder-dog.png";
import AddCIcon from "assets/svg/add-c-icon";
import { Box, Flex, Text } from "components/common";
import { useGetDogs } from "hooks/api/member/member";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { dogIdState } from "store/member";
import { Img } from "styles/StyleModule";

import { DogAvatar, DogItem, ListContent, Name } from "./styles";
import { BottomSheet, type BottomSheetProps } from "../../common/BottomSheet";

export const DogManagerPopup = ({ isOpen, close }: BottomSheetProps) => {
  const [selectedDogId, setSelectedDogId] = useRecoilState(dogIdState);
  const { data: dogList } = useGetDogs(selectedDogId?.toString());
  const navigate = useNavigate();

  const getIsActive = (id: number) => selectedDogId === id;

  const handleSelectDog = (dogId: number) => {
    setSelectedDogId(dogId);
    close();
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
                <Img src={item.dogProfile || PlaceholderImg} />
              </DogAvatar>
              <Name className="dog-name">{item.dogName}</Name>
            </DogItem>
          ))}
          <Box
            onClick={() => navigate(routes.member.mypage.enrollment.root)}
            display="flex"
            direction="column"
            position="relative"
            align="center"
          >
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
