import ApplicationWhiteIcon from "assets/svg/application-white-icon";
import CarIcon from "assets/svg/car-icon";
import HomelessDogIcon from "assets/svg/homeless-dog-icon";
import MedicineIcon from "assets/svg/medicine-icon";
import StopUseIcon from "assets/svg/stop-use-icon";

export const DOG_NOTICE_LIST = [
  {
    id: 21,
    title: "이용권 동의",
    icon: <ApplicationWhiteIcon />
  },
  {
    id: 30,
    title: "픽드랍 동의",
    icon: <CarIcon />
  },
  {
    id: 22,
    title: "이용 제한 동의",
    icon: <StopUseIcon />
  },
  {
    id: 23,
    title: "상해 동의",
    icon: <MedicineIcon />
  },
  {
    id: 24,
    title: "유기 동의",
    icon: <HomelessDogIcon />
  }
] as const;
