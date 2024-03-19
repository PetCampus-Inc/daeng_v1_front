export const getOptions = (
  isRoundExpiringSoon: boolean,
  isMonthlyExpiringSoon: boolean,
  adminRole: string
) => [
  {
    label: "견주에게 전화 걸기",
    condition: () => true
  },
  {
    label: "이용권 알림 전송하기",
    condition: () => isRoundExpiringSoon || isMonthlyExpiringSoon
  },
  {
    label: "강아지 삭제",
    condition: () => adminRole === "ROLE_OWNER"
  }
];
