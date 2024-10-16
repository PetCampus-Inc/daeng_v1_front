import { routes } from "constants/path";

import BoyIcon from "assets/svg/boy-icon";
import CalendarIcon from "assets/svg/calendar";
import DogCardIcon from "assets/svg/dog-card-icon";
import DogCircleIcon from "assets/svg/dog-circle-icon";
import GirlIcon from "assets/svg/girl-icon";
import PencilIcon from "assets/svg/pencil-icon";
import {
  CardWrapper,
  MainBottomContainer,
  TagsWrapper,
  EditIconButton
} from "components/Admin/DogDetailInfo/DogInfo/styles";
import { MediaItem } from "components/Admin/DogGallery/GalleryViewer/types";
import { Box, Flex, Text } from "components/common";
import Badge from "components/common/Badge";
import { XSmallButton } from "components/common/Button/Templates";
import { differenceInMonths, format, parse } from "date-fns";
import { FIELD_MAPPING } from "libs/adapters";
import { useNavigate } from "react-router-dom";
import { Img } from "styles/StyleModule";
import { getDateFromArray } from "utils/date";

import type { DogDetailInfo } from "hooks/api/admin/dogs";

interface AboutDogCardProps {
  data: Omit<DogDetailInfo, "member">;
}

export function AboutDogCard({ data }: AboutDogCardProps) {
  const navigate = useNavigate();

  const formatBirthDate = format(getDateFromArray(data.birthDate), "yyyy.MM.dd");
  const birthDate = parse(formatBirthDate, "yyyy.MM.dd", new Date());
  const monthsDifference = differenceInMonths(new Date(), birthDate);

  const years = Math.floor(monthsDifference / 12);
  const months = monthsDifference % 12;
  const ageString = years > 0 ? `${years}년 ${months}개월` : `${months}개월`;

  const showTags =
    data.vaccination === FIELD_MAPPING["vaccination"].VACCINATED ||
    data.neutralization === FIELD_MAPPING["neutralization"].NEUTERED ||
    data.pickDropRequest === FIELD_MAPPING["pickDropRequest"].REQUEST;

  const handleVaccinationOpen = () => {
    if (!data.vaccinationUri) return;
    const selectedImageId = data.vaccinationUri[0].imageId;

    const imageList: MediaItem[] = data.vaccinationUri.map((image) => ({
      imageId: image.imageId,
      imageUrl: image.imageUri,
      isVideo: image.imageUri.endsWith(".mp4")
    }));

    navigate(routes.admin.attendance.galleryViewer.dynamic(data.dogId), {
      state: { imageList, selectedImageId, title: "예방 접종 파일" }
    });
  };

  return (
    <Box shadow="card" borderRadius="20px">
      <CardWrapper>
        <Box width="88px" height="88px" radius="circle" overflow="hidden">
          {data.profileUri ? (
            <Img src={data.profileUri} alt="dog-image" />
          ) : (
            <DogCircleIcon colorScheme="gray" w={88} h={88} />
          )}
        </Box>
        <Flex direction="column" flex={1} gap={8}>
          <Flex justify="space-between">
            <Flex align="center" gap={8}>
              <Text typo="body1_18_B" color="gray_1">
                {data.dogName}
              </Text>
              <Box display="flex" py={4} px={10} bgColor="white" radius="full">
                <Text typo="caption1_12_R" color="primaryColor">
                  {data.dogSize}
                </Text>
              </Box>
            </Flex>
            <EditIconButton
              onClick={() => navigate(routes.admin.attendance.info.form.dynamic(data.dogId))}
            >
              <PencilIcon />
            </EditIconButton>
          </Flex>
          <Flex gap={8}>
            <Box
              display="flex"
              gap={4}
              align="center"
              color="gray_1"
              typo="label2_14_R"
              textWrap="nowrap"
            >
              {data.dogGender === FIELD_MAPPING["dogGender"].FEMALE ? <GirlIcon /> : <BoyIcon />}
              {data.dogGender}
            </Box>
            <Box
              display="flex"
              gap={4}
              align="center"
              color="gray_1"
              typo="label2_14_R"
              textWrap="nowrap"
            >
              <DogCardIcon w={24} h={24} />
              {data.breedName}
            </Box>
          </Flex>
          <Box
            display="flex"
            gap={4}
            align="center"
            color="gray_1"
            typo="label2_14_R"
            textWrap="nowrap"
          >
            <CalendarIcon w={24} h={24} rx={12} />
            {`${formatBirthDate} [${ageString}]`}
          </Box>
        </Flex>
      </CardWrapper>

      <MainBottomContainer>
        {showTags && (
          <TagsWrapper>
            {data.vaccination === FIELD_MAPPING["vaccination"].VACCINATED && (
              <Badge variant="yellow" typo="label2_14_R" text="예방접종 완료" />
            )}
            {data.neutralization === FIELD_MAPPING["neutralization"].NEUTERED && (
              <Badge variant="orange" typo="label2_14_R" />
            )}
            {data.pickDropRequest === FIELD_MAPPING["pickDropRequest"].REQUEST && (
              <Badge variant="lightBrown" typo="label2_14_R" />
            )}
          </TagsWrapper>
        )}
        <Flex direction="column" gap={24} pt={24}>
          <Flex justify="space-between" align="center">
            <Text typo="label1_16_B" color="gray_1">
              예방접종 파일
            </Text>
            <XSmallButton
              size="sm"
              typo="caption1_12_B"
              colorScheme="yellow_3"
              disabled={!data.vaccinationUri}
              onClick={handleVaccinationOpen}
            >
              파일 열람
            </XSmallButton>
          </Flex>
          <Flex direction="column" justify="space-between">
            <Text typo="label1_16_B" color="gray_1">
              알러지 및 질병
            </Text>
            <Text typo="label2_14_R" color="gray_2">
              {data.allergyDisease || "없음"}
            </Text>
          </Flex>
          <Flex direction="column" justify="space-between">
            <Text typo="label1_16_B" color="gray_1">
              픽드랍 정보
            </Text>
            <Text typo="label2_14_R" color="gray_2">
              {data.pickDropMemo || "없음"}
            </Text>
          </Flex>
        </Flex>
      </MainBottomContainer>
    </Box>
  );
}
