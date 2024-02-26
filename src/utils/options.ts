export const getOptions = (rounds: number | null, isBeforeExpiry: boolean, adminRole: string) => [
  {
    label: "견주에게 전화 걸기",
    condition: () => true
  },
  {
    label: "이용권 알림 전송하기",
    condition: () => rounds === 1 || rounds === 2 || isBeforeExpiry
  },
  {
    label: "강아지 삭제",
    condition: () => adminRole === "ROLE_OWNER"
  }
];
