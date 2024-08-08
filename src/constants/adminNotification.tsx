import AddBrownIcon from "assets/svg/add-brown-icon";
import AlertBrownIcon from "assets/svg/alert-brown-icon";
import CalendarExpireIcon from "assets/svg/calendar-expire";
import CareDogIcon from "assets/svg/care-dog-icon";
import SendAlarmIcon from "assets/svg/send-alarm";

import { PATH } from "./path";

// FIXME PATH 경로 수정 필요
export const ADMIN_NOTIFICATION = {
  owner: [
    {
      id: 0,
      title: "유치원 신규 가입 신청이 있어요!",
      text: "가입 신청 목록에서 승인 혹은 거절을 해주세요",
      path: PATH.ADMIN_ATTENDANCE,
      icon: <AddBrownIcon />
    },
    {
      id: 1,
      title: (name: string) => `${name} 선생님이 유치원 가입 신청을 했어요`,
      text: "가입 신청 목록에서 승인 혹은 거절을 해주세요",
      path: PATH.ADMIN_ATTENDANCE,
      icon: <SendAlarmIcon borderStyle="50%" />
    },
    {
      id: 2,
      title: (name: string) => `${name} 선생님이 유치원을 탈퇴했어요`,
      text: "교사 목록에서 확인해 보세요",
      path: PATH.ADMIN_ATTENDANCE,
      icon: <AlertBrownIcon />
    }
  ],
  teacher: [],
  common: [
    {
      id: 0,
      title: (dog: string) => `${dog}의 정보가 수정되었어요`,
      text: "강아지 정보 수정은 견주가 할 수 있어요",
      path: PATH.ADMIN_ATTENDANCE,
      icon: <CareDogIcon borderStyle="50%" />
    },
    {
      id: 1,
      title: (dog: string) => `${dog}의 이용권 만료일이 임박했어요`,
      text: (expired: string) =>
        expired === "date" ? `[만료 ${expired}일 전]` : `[잔여 횟수:${expired}회]`,
      path: PATH.ADMIN_ATTENDANCE,
      icon: <CalendarExpireIcon borderStyle="50%" />
    },
    {
      id: 2,
      title: (dog: string) => `${dog}의 이용권이 만료되었어요 이용권을 갱신해 주세요!`,
      text: "이용권 갱신은 원장님만 가능해요",
      subtext: (expired: string) =>
        expired === "date" ? `[시작일: ${expired}]` : `[만료된 이용권 정보:회차권 ${expired}회]`,
      path: PATH.ADMIN_ATTENDANCE,
      icon: <SendAlarmIcon borderStyle="50%" />
    }
  ]
} as const;
