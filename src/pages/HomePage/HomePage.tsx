import { routes } from "constants/path";

import { Box, Flex, Text, Layout } from "components/common";
import Header from "components/common/Header";
import { NavBar } from "components/common/NavBar";
import { Dashboard } from "components/Home/Dashboard/Dashboard";
import DisconnectionNotice from "components/Home/DisconnectionNotice/DisconnectionNotice";
import { DogManagerPopup } from "components/Home/DogManagerPopup";
import { ImageAlbum } from "components/Home/ImageAlbum/ImageAlbum";
import { ImageComment } from "components/Home/ImageComment/ImageComment";
import { useGetHomeInfo, usePrefetchDogs } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { dogIdState } from "store/member";
import { Img } from "styles/StyleModule";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedDogId] = useRecoilState(dogIdState);
  // FIXME selectedDogId 데이터가 없을 경우 예외 처리 필요
  const defaultDogId = 1;

  const dogId = selectedDogId ? selectedDogId : defaultDogId;
  const { data, isFetching } = useGetHomeInfo(dogId);
  const overlay = useOverlay();
  const prefetchDogs = usePrefetchDogs();

  const handleHeaderClick = () => {
    prefetchDogs(); // 먼저 프리패치 실행
    openDogManagerPopup(); // 그 다음 팝업 열기
  };

  const openDogManagerPopup = () =>
    overlay.open(({ isOpen, close }) => <DogManagerPopup isOpen={isOpen} close={close} />);

  const dogInfo = {
    dogName: data.dogName,
    dogId: data.dogId
  };

  useLayoutEffect(() => {
    // dogProfile 데이터가 없을 경우 프로필 설정 페이지로 강제 이동
    if (!isFetching && !data.dogProfile) {
      navigate(routes.member.profile.dog.root);
    }
  }, [data.dogProfile, isFetching, navigate]);

  return (
    <>
      <Header type="main" text={data?.dogName} handleClick={handleHeaderClick} />
      {data.enrollmentFormStatus === "DROP_OUT" && <DisconnectionNotice />}
      <Layout type="main">
        <Box bgColor="white" py={32} px={16}>
          <Box as="hgroup" display="flex" direction="column" gap={4} px={10} mb={16 + 5}>
            <Flex align="center" gap="4">
              <Box
                display="inline-block"
                width="32px"
                height="32px"
                radius="circle"
                bgColor="gray_4"
                overflow="hidden"
              >
                <Img
                  src={
                    data?.memberProfileUri ??
                    process.env.REACT_APP_CLIENT_BASE_URL + "images/placeholder-image.png"
                  }
                  alt={`${data.dogName}님의 프로필`}
                />
              </Box>
              <Text as="h2" typo="title2_20_B" color="darkBlack">
                {data.dogName} {data?.relation}님
              </Text>
            </Flex>
            <Text as="p" typo="body2_16_R" color="gray_2">
              아래에서 {data.dogName} 유치원 일지를 확인할 수 있어요
            </Text>
          </Box>
          <Dashboard data={data} />
        </Box>
        <Box bgColor="BGray" pt={32} pb={55} px={16}>
          <ImageComment images={data.imageList?.[0]} />
          <ImageAlbum images={data.imageList} dogInfo={dogInfo} />
        </Box>
      </Layout>
      <NavBar />
    </>
  );
};

export default HomePage;
