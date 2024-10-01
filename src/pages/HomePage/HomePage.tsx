import { STORAGE_KEY } from "constants/memberDogStatus";
import { routes } from "constants/path";

import { Box, Layout } from "components/common";
import Header from "components/common/Header";
import { NavBar } from "components/common/NavBar";
import DogManagerPopup from "components/Home/DogManagerPopup";
import HomeDashboard from "components/Home/HomeDashboard";
import HomeHeader from "components/Home/HomeHeader";
import HomeImageAlbum from "components/Home/HomeImageAlbum";
import HomeImageCommentSlider from "components/Home/HomeImageCommentSlider";
import { useGetHomeInfo, usePrefetchDogs } from "hooks/api/member/member";
import { useLocalStorage } from "hooks/common/useLocalStorage";
import { useOverlay } from "hooks/common/useOverlay";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { dogIdState } from "store/member";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedDogId] = useRecoilState(dogIdState);
  const CURRENT_DOG_ID = useLocalStorage(STORAGE_KEY.CURRENT_DOG_ID, 0);

  const defaultDogId = Number(CURRENT_DOG_ID);

  const dogId = selectedDogId && selectedDogId !== 0 ? selectedDogId : defaultDogId;
  // FIXME selectedDogId, CURRENT_DOG_ID 데이터가 없을 경우 예외 처리 필요
  const { data } = useGetHomeInfo(dogId ? dogId : 1);

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
    // dogProfile 데이터가 없을 경우
    if (!data.dogProfile) {
      navigate(routes.member.profile.dog.root);
    }
  }, []);

  return (
    <>
      <Header type="main" text={data?.dogName} handleClick={handleHeaderClick} />
      <Layout type="main">
        <Box bgColor="white" py={32} px={16}>
          <HomeHeader data={data} />
          <HomeDashboard data={data} />
        </Box>
        <Box bgColor="BGray" pt={32} pb={55} px={16}>
          <HomeImageCommentSlider images={data.imageList?.[0]} />
          <HomeImageAlbum images={data.imageList} dogInfo={dogInfo} />
        </Box>
      </Layout>
      <NavBar />
    </>
  );
};

export default HomePage;
