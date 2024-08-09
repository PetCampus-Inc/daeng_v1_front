import AddBrownIcon from "assets/svg/add-brown-icon";
import AgendaIcon from "assets/svg/agenda-icon";
import AlertBrownIcon from "assets/svg/alert-brown-icon";
import CalendarExpireIcon from "assets/svg/calendar-expire";
import CareDogIcon from "assets/svg/care-dog-icon";
import ListYellowCircleIcon from "assets/svg/list-yellow-circle-icon";
import SendAlarmIcon from "assets/svg/send-alarm";

import { PATH } from "./path";
import CheckCircleBrown from "assets/svg/check-circle-brown";

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
  teacher: [
    {
      id: 0,
      title: (school: string) => `${school} 유치원 가입 신청이 승인되었습니다!`,
      text: "등원한 강아지들을 관리해 보세요",
      path: PATH.ADMIN_ATTENDANCE,
      icon: <CheckCircleBrown />
    },
    {
      id: 1,
      title: (school: string) => `${school} 유치원 가입 신청이 거절되었습니다`,
      text: "다시 가입을 신청하거나 유치원에 문의해 보세요",
      path: PATH.ADMIN_ATTENDANCE,
      icon: <AlertBrownIcon />
    }
  ],
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
    },
    {
      id: 3,
      title: (dog: string) => `${dog}의 이용권이 갱신되었어요!`,
      text: (newTicket: string) =>
        newTicket === "date"
          ? `[시작일:${newTicket}]`
          : `[갱신된 이용권 정보:회차권 ${newTicket}회]`,
      path: PATH.ADMIN_ATTENDANCE,
      icon: <SendAlarmIcon borderStyle="50%" />
    },
    {
      id: 4,
      title: "유치원 유의사항이 업데이트 되었어요!",
      text: "견주들에게 픽드랍 유의사항 재동의 알림을 전송해 주세요", // 어떤 유의사항이 변동되었는지 값을 가져오는건지 확인 필요
      path: PATH.ADMIN_ATTENDANCE,
      icon: <ListYellowCircleIcon />
    },
    {
      id: 5,
      title: "신규 가입된 강아지가 있어요!",
      text: "신규 가입 강아지의 가입 정보를 확인해 보세요",
      path: PATH.ADMIN_ATTENDANCE,
      icon: <AddBrownIcon />
    },
    {
      id: 6,
      title: "아직 전송되지 않은 알림장이 있어요!",
      text: "오늘이 지나면 알림장이 초기화 돼요 작성 중인 알림장을",
      subtext: "견주에게 전송해 주세요",
      path: PATH.ADMIN_ATTENDANCE,
      icon: <AgendaIcon bg={true} />
    },
    {
      id: 7,
      title: (dog: string) => `${dog}의 사진을 아직 한장도 전송하지 않았어요`,
      text: "강아지의 유치원 활동 상황을 견주와 공유해 보세요",
      path: PATH.ADMIN_ATTENDANCE,
      icon: <AgendaIcon bg={true} />
    }
  ]
} as const;
