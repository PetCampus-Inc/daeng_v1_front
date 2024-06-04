import { GALLERY_VIEW, type GalleryViewType } from "constants/option";

import AlbumHeader from "components/Album/AlbumHeader";
import AlbumView from "components/Album/AlbumView";
import PhotoView from "components/Album/PhotoView";
import ViewTabs from "components/Album/ViewTabs";
import { Layout } from "components/common";
import Header from "components/common/Header";
import { useGetMainAlbum } from "hooks/api/member/member";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ImageAlbumType } from "types/member/main.types";
const ImageAlbumPage = () => {
  const [searchParams] = useSearchParams();
  const dogId = parseInt(searchParams.get("dogId") ?? "");
  const dogName = searchParams.get("dogName");
  const { data: imageList } = useGetMainAlbum({ dogId });

  const [mode, setMode] = useState<GalleryViewType>(GALLERY_VIEW.PHOTO);

  return (
    <>
      <Header type="text" text="사진 앨범" />
      <Layout type="page" pt={42} bg="white">
        <AlbumHeader dogId={dogId} dogName={dogName} />
        <ViewTabs mode={mode} setMode={setMode} />
        {mode === GALLERY_VIEW.PHOTO && <PhotoView imageList={mock} />}
        {mode === GALLERY_VIEW.ALBUM && <AlbumView imageList={mock} />}
      </Layout>
    </>
  );
};

export default ImageAlbumPage;

const mock: ImageAlbumType[][] = [
  [
    {
      imageId: 1,
      imageUri: "https://i.pinimg.com/564x/3d/aa/a5/3daaa580c31c86277d13f55594895f8a.jpg",
      imageType: "IMAGE",
      comment: "오늘 뚜비는 하늘을 날았어요 🐶🚀",
      size: 2,
      createdTime: "2024-05-30T14:15:00.123456Z",
      photoTime: "5시간 전"
    },
    {
      imageId: 2,
      imageUri: "https://i.pinimg.com/236x/95/9e/c6/959ec6ea0437bf058af9df18c9fff9da.jpg",
      imageType: "IMAGE",
      comment: "오늘 뚜비는 하늘을 날았어요 🐶🚀",
      size: 2,
      createdTime: "2024-05-30T14:16:00.123456Z",
      photoTime: "5시간 전"
    },
    {
      imageId: 4,
      imageUri: "https://i.pinimg.com/236x/b2/8f/6f/b28f6f330e62ca09c862c0a20d986663.jpg",
      imageType: "IMAGE",
      comment: "오늘 뚜비는 하늘을 날았어요 🐶🚀",
      size: 1,
      createdTime: "2024-05-30T14:18:00.123456Z",
      photoTime: "5시간 전"
    }
  ],
  [
    {
      imageId: 3,
      imageUri: "https://i.pinimg.com/236x/5d/4f/19/5d4f19d49ee99090930d8f1a883aae07.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 새로운 친구를 만났어요!/n아주 사이좋게 놀았습니다./n새로운 친구들과도 잘 어울렸어요./n아주 활발하게 뛰어놀아서 즐거웠어요!/n오후 시간에는  트레이닝도 받았어요! 아주 잘 따라했습니다. 특히 앉아, 기다려 같은 기본 명령어를 아주 잘 따랐어요./n하루 종일 에너지가 넘쳤답니다. 집에 가서는 푹 쉴 것 같아요. 자기전에 뚜비 발은 씻겨 주세요~🐾",
      size: 1,
      createdTime: "2024-05-30T14:17:00.123456Z",
      photoTime: "5시간 전"
    },
    {
      imageId: 5,
      imageUri: "https://i.pinimg.com/236x/53/63/43/53634371aea481e2622c2a0396a85b6a.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 새로운 친구를 만났어요! 아주 사이좋게 놀았습니다. 새로운 친구들과도 잘 어울렸어요./n아주 활발하게 뛰어놀아서 즐거웠어요!/n오후 시간에는  트레이닝도 받았어요! 아주 잘 따라했습니다. 특히 앉아, 기다려 같은 기본 명령어를 아주 잘 따랐어요./n하루 종일 에너지가 넘쳤답니다. 집에 가서는 푹 쉴 것 같아요. 자기전에 뚜비 발은 씻겨 주세요~🐾",
      size: 2,
      createdTime: "2024-05-30T14:19:00.123456Z",
      photoTime: "5시간 전"
    },
    {
      imageId: 6,
      imageUri: "https://i.pinimg.com/236x/ea/e3/06/eae3065946ed3fc9065cecdd06755066.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 새로운 친구를 만났어요! 아주 사이좋게 놀았습니다. 새로운 친구들과도 잘 어울렸어요./n아주 활발하게 뛰어놀아서 즐거웠어요!/n오후 시간에는  트레이닝도 받았어요! 아주 잘 따라했습니다. 특히 앉아, 기다려 같은 기본 명령어를 아주 잘 따랐어요./n하루 종일 에너지가 넘쳤답니다. 집에 가서는 푹 쉴 것 같아요. 자기전에 뚜비 발은 씻겨 주세요~🐾",
      size: 2,
      createdTime: "2024-05-30T14:20:00.123456Z",
      photoTime: "5시간 전"
    }
  ],
  [
    {
      imageId: 7,
      imageUri: "https://i.pinimg.com/236x/6c/74/38/6c7438c259812c80e2f5be06e8e11e5b.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 특별히 새로운 훈련도 해봤어요. 처음엔 어려워했지만 금방 적응하는 모습이 대견했답니다./n기본 명령어를 잘 따랐습니다! 집중력도 높아지고 있어요./n이젠 쉽게 앉아, 기다려 같은 명령어를 따라해요. 뚜비는 똑똑한 강아지에요!",
      size: 2,
      createdTime: "2024-05-30T14:21:00.123456Z",
      photoTime: "5시간 전"
    },
    {
      imageId: 8,
      imageUri: "https://i.pinimg.com/236x/4b/3a/d1/4b3ad1c0a71b766185f0c21b87dad333.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 특별히 새로운 훈련도 해봤어요. 처음엔 어려워했지만 금방 적응하는 모습이 대견했답니다./n기본 명령어를 잘 따랐습니다! 집중력도 높아지고 있어요./n이젠 쉽게 앉아, 기다려 같은 명령어를 따라해요. 뚜비는 똑똑한 강아지에요!",
      size: 2,
      createdTime: "2024-05-30T14:22:00.123456Z",
      photoTime: "5시간 전"
    },
    {
      imageId: 9,
      imageUri: "https://i.pinimg.com/236x/c7/0a/b7/c70ab7839654d4afc5c875ff5e7cb4c0.jpg",
      imageType: "IMAGE",
      comment:
        "오늘은 특별히 새로운 훈련도 해봤어요. 처음엔 어려워했지만 금방 적응하는 모습이 대견했답니다./n기본 명령어를 잘 따랐습니다! 집중력도 높아지고 있어요./n이젠 쉽게 앉아, 기다려 같은 명령어를 따라해요. 뚜비는 똑똑한 강아지에요!",
      size: 3,
      createdTime: "2024-05-30T14:23:00.123456Z",
      photoTime: "5시간 전"
    }
  ],
  [
    {
      imageId: 13,
      imageUri: "https://i.pinimg.com/236x/c6/76/34/c676346d1b41889abd28c8c4ed430413.jpg",
      imageType: "IMAGE",
      comment: "오늘은 아주 차분했어요. 다른 강아지들이 놀 때 조용히 쉬는 모습이 인상적이었답니다.",
      size: 2,
      createdTime: "2024-05-30T14:27:00.123456Z",
      photoTime: "5시간 전"
    },
    {
      imageId: 14,
      imageUri: "https://i.pinimg.com/236x/19/1d/7f/191d7f88a2ddbf7b0f8a364fea1b02fd.jpg",
      imageType: "IMAGE",
      comment:
        "산책을 정말 좋아했어요. 특히 나무 냄새를 맡으며 신나게 뛰어다니는 모습이 귀여웠어요.",
      size: 2,
      createdTime: "2024-05-30T14:28:00.123456Z",
      photoTime: "5시간 전"
    }
  ]
];
