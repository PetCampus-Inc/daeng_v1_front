import { TPickDropState } from "types/member/enrollment.types";

export const MEMBER_ENROLL_STEP = [
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
    isVisible: (status: TPickDropState) => status === "RUNNING"
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
    isVisible: () => true
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
    isVisible: (pickDropState: string) => pickDropState === "운영"
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
  ["pickDropState", 4],
  ["pickDropNotice", 4],
  ["pickDropRequest", 4],
  ["pickDropType", 4],
  ["pickDropMemo", 4],
  ["pickDropInfo", 4]
]);

export const ADMIN_DOG_DETAIL_INFO_STEP = [
  "강아지 정보",
  "등원 기록",
  "이용권",
  "유의사항"
] as const;

export const MEMBER_DOG_INFO_STEP = ["강아지 정보", "유치원 정보", "출결 및 이용권"] as const;

export const SIGN_UP_STEP = {
  유치원_검색: "search_school" as const,
  가입신청서_작성: "enrollment_form" as const
};

export const ADMIN_SIGN_UP_STEP = {
  역할_선택: "select_role" as const,
  유치원_검색: "search_school" as const,
  유치원_등록: "enroll_school" as const,
  회원정보_입력: "personal_info" as const,
  계정설정: "account_setup" as const
};
