import { Box, Flex, Text } from "components/common";
import { useGetMainAlbum } from "hooks/api/member/member";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getISODateString } from "utils/date";

import { ImageGroup } from "./GridView/ImageGroup";
import { SaveButton } from "./GridView/SaveButton";

import type { ImageList } from "types/member/main.types";

export default function GridView({ dogId }: { dogId: number }) {
  const [searchParams] = useSearchParams();
  const selectedDateParam = searchParams.get("date");
  const selectedDate = selectedDateParam ? selectedDateParam : getISODateString(new Date());

  const { data } = useGetMainAlbum({ dogId, date: selectedDate });

  if (!data || data.length === 0)
    return (
      <Box display="flex" direction="column" align="center" justify="center" py={30}>
        <Text typo="label2_14_R" color="gray_3">
          전송 받은 사진이 없는 날이에요
        </Text>
      </Box>
    );

  return (
    <RootContainer>
      {data.map((group, index) => (
        <Flex key={`${group[0].imageId}-${index}`} direction="column">
          <ImageGroup currentDate={selectedDate} group={group} groupId={group[0].imageId} />
        </Flex>
      ))}
      <SaveButton />
    </RootContainer>
  );
}

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  &:not(:last-of-type) {
    padding-block-end: 20px;
  }
`;

GridView.Skeleton = () => {
  return (
    <SkeletonContainer>
      <Flex justify="space-between" px={16}>
        <SkeletonBox width={"30%"} height={20} radius={4} />
        <SkeletonBox width={"20%"} height={20} radius={4} />
      </Flex>
      <SkeletonGrid>
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonGridItem key={index} />
        ))}
      </SkeletonGrid>
    </SkeletonContainer>
  );
};

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SkeletonBox = styled(Box)`
  background-color: ${({ theme }) => theme.colors.gray_4};
`;

const SkeletonGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const SkeletonGridItem = styled.div`
  aspect-ratio: 1 / 1;
  border: 2px solid ${({ theme }) => theme.colors.gray_4};
  background-color: ${({ theme }) => theme.colors.gray_5};
`;

const mock: ImageList[][] = [
  [
    {
      imageId: 1,
      imageUri: "https://i.pinimg.com/564x/3d/aa/a5/3daaa580c31c86277d13f55594895f8a.jpg",
      imageType: "IMAGE",
      comment: "오늘 뚜비는 하늘을 날았어요/n하늘을 나는 강아지 최초 1호가 되보자고~! 🐶🚀",
      createdTime: [2024, 5, 30, 14, 15, 0, 123456000]
    },
    {
      imageId: 2,
      imageUri: "https://i.pinimg.com/236x/95/9e/c6/959ec6ea0437bf058af9df18c9fff9da.jpg",
      imageType: "IMAGE",
      comment: "오늘 뚜비는 하늘을 날았어요/n하늘을 나는 강아지 최초 1호가 되보자고~! 🐶🚀",
      createdTime: [2024, 5, 30, 14, 16, 0, 123456000]
    },
    {
      imageId: 4,
      imageUri: "https://i.pinimg.com/236x/b2/8f/6f/b28f6f330e62ca09c862c0a20d986663.jpg",
      imageType: "IMAGE",
      comment: "오늘 뚜비는 하늘을 날았어요/n하늘을 나는 강아지 최초 1호가 되보자고~! 🐶🚀",
      createdTime: [2024, 5, 30, 14, 18, 0, 123456000]
    }
  ],
  [
    {
      imageId: 3,
      imageUri: "https://i.pinimg.com/236x/5d/4f/19/5d4f19d49ee99090930d8f1a883aae07.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 새로운 친구를 만났어요!/n아주 사이좋게 놀았습니다./n새로운 친구들과도 잘 어울렸어요./n아주 활발하게 뛰어놀아서 즐거웠어요!/n오후 시간에는 트레이닝도 받았어요! 아주 잘 따라했습니다. 특히 앉아, 기다려 같은 기본 명령어를 아주 잘 따랐어요./n하루 종일 에너지가 넘쳤답니다. 집에 가서는 푹 쉴 것 같아요. 자기전에 뚜비 발은 씻겨 주세요~🐾",
      createdTime: [2024, 5, 30, 14, 17, 0, 123456000]
    },
    {
      imageId: 5,
      imageUri: "https://i.pinimg.com/236x/53/63/43/53634371aea481e2622c2a0396a85b6a.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 새로운 친구를 만났어요! 아주 사이좋게 놀았습니다. 새로운 친구들과도 잘 어울렸어요./n아주 활발하게 뛰어놀아서 즐거웠어요!/n오후 시간에는 트레이닝도 받았어요! 아주 잘 따라했습니다. 특히 앉아, 기다려 같은 기본 명령어를 아주 잘 따랐어요./n하루 종일 에너지가 넘쳤답니다. 집에 가서는 푹 쉴 것 같아요. 자기전에 뚜비 발은 씻겨 주세요~🐾",
      createdTime: [2024, 5, 30, 14, 19, 0, 123456000]
    },
    {
      imageId: 6,
      imageUri: "https://i.pinimg.com/236x/ea/e3/06/eae3065946ed3fc9065cecdd06755066.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 새로운 친구를 만났어요! 아주 사이좋게 놀았습니다. 새로운 친구들과도 잘 어울렸어요./n아주 활발하게 뛰어놀아서 즐거웠어요!/n오후 시간에는 트레이닝도 받았어요! 아주 잘 따라했습니다. 특히 앉아, 기다려 같은 기본 명령어를 아주 잘 따랐어요./n하루 종일 에너지가 넘쳤답니다. 집에 가서는 푹 쉴 것 같아요. 자기전에 뚜비 발은 씻겨 주세요~🐾",
      createdTime: [2024, 5, 30, 14, 20, 0, 123456000]
    }
  ],
  [
    {
      imageId: 7,
      imageUri: "https://i.pinimg.com/236x/6c/74/38/6c7438c259812c80e2f5be06e8e11e5b.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 특별히 새로운 훈련도 해봤어요. 처음엔 어려워했지만 금방 적응하는 모습이 대견했답니다./n기본 명령어를 잘 따랐습니다! 집중력도 높아지고 있어요./n이젠 쉽게 앉아, 기다려 같은 명령어를 따라해요. 뚜비는 똑똑한 강아지에요!",
      createdTime: [2024, 5, 30, 14, 21, 0, 123456000]
    },
    {
      imageId: 8,
      imageUri: "https://i.pinimg.com/236x/4b/3a/d1/4b3ad1c0a71b766185f0c21b87dad333.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 특별히 새로운 훈련도 해봤어요. 처음엔 어려워했지만 금방 적응하는 모습이 대견했답니다./n기본 명령어를 잘 따랐습니다! 집중력도 높아지고 있어요./n이젠 쉽게 앉아, 기다려 같은 명령어를 따라해요. 뚜비는 똑똑한 강아지에요!",
      createdTime: [2024, 5, 30, 14, 22, 0, 123456000]
    },
    {
      imageId: 9,
      imageUri: "https://i.pinimg.com/236x/c7/0a/b7/c70ab7839654d4afc5c875ff5e7cb4c0.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 특별히 새로운 훈련도 해봤어요. 처음엔 어려워했지만 금방 적응하는 모습이 대견했답니다./n기본 명령어를 잘 따랐습니다! 집중력도 높아지고 있어요./n이젠 쉽게 앉아, 기다려 같은 명령어를 따라해요. 뚜비는 똑똑한 강아지에요!",
      createdTime: [2024, 5, 30, 14, 23, 0, 123456000]
    }
  ],
  [
    {
      imageId: 13,
      imageUri: "https://i.pinimg.com/236x/c6/76/34/c676346d1b41889abd28c8c4ed430413.jpg",
      imageType: "IMAGE",
      comment: "오늘은 아주 차분했어요. 다른 강아지들이 놀 때 조용히 쉬는 모습이 인상적이었답니다.",
      createdTime: [2024, 8, 28, 6, 27, 0, 123456000]
    },
    {
      imageId: 14,
      imageUri: "https://i.pinimg.com/236x/19/1d/7f/191d7f88a2ddbf7b0f8a364fea1b02fd.jpg",
      imageType: "IMAGE",
      comment:
        "산책을 정말 좋아했어요. 특히 나무 냄새를 맡으며 신나게 뛰어다니는 모습이 귀여웠어요.",
      createdTime: [2024, 8, 28, 6, 28, 0, 123456000]
    },
    {
      imageId: 15,
      imageUri: "https://i.pinimg.com/474x/ee/f1/cf/eef1cf7a711a34252a77f4d2c9d988e5.jpg",
      imageType: "IMAGE",
      comment:
        "날씨가 너무 좋았어요. 해가 뜨고 바람이 선선해서 산책하기 딱 좋았답니다. 뚜비도 그 점을 느끼고 더 신나 보였어요!",
      createdTime: [2024, 8, 28, 6, 30, 0, 123456000]
    },
    {
      imageId: 16,
      imageUri: "https://i.pinimg.com/474x/7c/e5/ed/7ce5ede8b17977c923663d75ee54169a.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 조금 피곤한 것 같아요. 그래도 산책하니 기분이 좋아진 듯해요. 잠깐 쉬는 동안에도 뚜비는 항상 주변을 잘 살펴요.",
      createdTime: [2024, 8, 28, 6, 32, 0, 123456000]
    }
  ]
];
