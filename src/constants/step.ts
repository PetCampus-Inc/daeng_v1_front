import type { IPickDropInfo } from "types/School.type";

export const MEMBER_MA_STEP = [
  {
    title: "견주 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "견주 정보",
    isVisible: () => true
  },
  {
    title: "강아지 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "강아지 정보",
    isVisible: () => true
  },
  {
    title: "이용권 종류를 선택해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "이용권",
    isVisible: () => true
  },
  {
    title: "유의사항을 확인해주세요",
    subtitle: "필수입력에 동의하지 않으면 가입이 어려울 수 있어요",
    indicator: "유의사항",
    isVisible: () => true
  },
  {
    title: "픽드랍 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "픽드랍",
    isVisible: (pickDropInfo: IPickDropInfo) => pickDropInfo?.pickDropState === "RUNNING"
  }
];

export const ADMIN_CREATE_FORM_STEP = [
  {
    title: "견주에게 받을 정보들이에요",
    subtitle: "필수입력과 선택입력 둘 중 하나를 선택해 주세요",
    indicator: "견주 정보",
    isVisible: () => true
  },
  {
    title: "강아지에 대해 받을 정보들이에요",
    subtitle: "필수입력과 선택입력 둘 중 하나를 선택해 주세요",
    indicator: "강아지 정보",
    isVisible: () => true
  },
  {
    title: "이용권 종류를 선택해 주세요",
    subtitle: "먼저 이용권 종류를 고른 후 알맞은 내용을 추가해 주세요",
    indicator: "이용권",
    isVisible: () => true
  },
  {
    title: "견주에게 안내할 유의사항들이에요",
    subtitle: "견주에게 안내하고 동의 받을 내용들을 작성해 주세요",
    indicator: "유의사항",
    isVisible: () => true
  },
  {
    title: "픽드랍 정보를 입력해 주세요",
    subtitle: "픽드랍 운영시 픽드랍 안내사항을 입력해 주세요",
    indicator: "픽드랍",
    isVisible: (pickDropInfo: IPickDropInfo | undefined) =>
      !pickDropInfo || pickDropInfo.pickDropState === "RUNNING"
  }
] as const;

export const ADMIN_READ_FORM_STEP = [
  {
    title: "견주에게 받을 정보들이에요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "견주 정보",
    isVisible: () => true
  },
  {
    title: "강아지에 대해 받을 정보들이에요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "강아지 정보",
    isVisible: () => true
  },
  {
    title: "이용권 종류를 선택해 주세요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "이용권",
    isVisible: () => true
  },
  {
    title: "견주에게 안내할 유의사항들이에요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "유의사항",
    isVisible: () => true
  },
  {
    title: "픽드랍 정보를 입력해 주세요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "픽드랍",
    isVisible: (pickDropInfo: IPickDropInfo) => pickDropInfo?.pickDropState === "RUNNING"
  }
] as const;

export const FIELD_TO_STEP = new Map<string, number>([
  ["memberName", 0],
  ["memberGender", 0],
  ["address", 0],
  ["phoneNumber", 0],
  ["emergencyNumber", 0],
  ["dogName", 1],
  ["dogGender", 1],
  ["dogSize", 1],
  ["breedId", 1],
  ["newBreed", 1],
  ["birthdate", 1],
  ["neutralization", 1],
  ["vaccination", 1],
  ["fileUrl", 1],
  ["allergyDisease", 1],
  ["priceInfo", 2],
  ["ticketType", 2],
  ["roundTicketNumber", 2],
  ["monthlyTicketNumber", 2],
  ["openDays", 2],
  ["ticketInfo", 2],
  ["limitsInfo", 3],
  ["accidentInfo", 3],
  ["abandonmentInfo", 3],
  ["pickDropState", 5],
  ["pickDropNotice", 5],
  ["pickDropRequest", 5],
  ["pickDropType", 5],
  ["pickDropMemo", 5],
  ["pickDropInfo", 5]
]);
