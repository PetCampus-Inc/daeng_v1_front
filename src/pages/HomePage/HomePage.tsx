import { STORAGE_KEY } from "constants/memberDogStatus";

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
import { useRecoilState } from "recoil";
import { dogIdState } from "store/member";

const HomePage = () => {
  const [selectedDogId] = useRecoilState(dogIdState);
  const CURRENT_DOG_ID = useLocalStorage<string>(STORAGE_KEY.CURRENT_DOG_ID, "");

  const defaultDogId = Number(CURRENT_DOG_ID);

  const dogId = selectedDogId !== null ? selectedDogId : defaultDogId;
  const { data } = useGetHomeInfo(dogId);

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
