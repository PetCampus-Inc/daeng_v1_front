import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import DogManagerPopup from "components/Home/DogManagerPopup";
import EmptyAlbum from "components/Home/Empty/EmptyAlbum";
import HomeDashboard from "components/Home/HomeDashboard";
import HomeHeader from "components/Home/HomeHeader";
import HomeImageSlider from "components/Home/HomeImageSlider";
import { StyledBox } from "components/Home/styles";
import { useGetHomeInfo, usePrefetchDogs } from "hooks/api/member/member";
import { useOverlay } from "hooks/common/useOverlay";
import { useRecoilState } from "recoil";
import { dogIdState } from "store/member";

const HomePage = () => {
  const [selectedDogId] = useRecoilState(dogIdState);

  const defaultDogId = 11;
  const memberId = 1;

  const dogId = selectedDogId !== null ? selectedDogId : defaultDogId;
  const { data } = useGetHomeInfo(memberId, dogId);

  const overlay = useOverlay();
  const prefetchDogs = usePrefetchDogs(memberId);

  const handleHeaderClick = () => {
    prefetchDogs(); // 먼저 프리패치 실행
    openDogManagerPopup(); // 그 다음 팝업 열기
  };

  const openDogManagerPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <DogManagerPopup isOpen={isOpen} close={close} memberId={memberId} />
    ));

  return (
    <>
      <Header type="main" text={data?.dogName} handleClick={handleHeaderClick} />
      <main>
        <StyledBox type="top" pt={2} pb={2}>
          <HomeHeader data={data} />
          <HomeDashboard data={data} />
        </StyledBox>
        <StyledBox type="bottom" bg="BGray" pt={2} pb={3.438}>
          <HomeImageSlider images={data?.imageList} />
          <EmptyAlbum />
        </StyledBox>
      </main>
      <NavBar />
    </>
  );
};

export default HomePage;
