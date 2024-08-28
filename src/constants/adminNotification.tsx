import AddBrownIcon from "assets/svg/add-brown-icon";
import AgendaIcon from "assets/svg/agenda-icon";
import AlertBrownIcon from "assets/svg/alert-brown-icon";
import CalendarExpireIcon from "assets/svg/calendar-expire";
import DogFilledIcon from "assets/svg/dog-filled-icon";
import ListYellowCircleIcon from "assets/svg/list-yellow-circle-icon";
import SendAlarmIcon from "assets/svg/send-alarm";

import { PATH } from "./path";

interface NotificationItem {
  id: number;
  title: string | ((name: string) => string);
  text: string | ((expired: string) => string);
  path: string | ((dogId: number, params: string) => string);
  icon: React.ReactNode;
  subtext?: string | ((expired: string) => string);
}

export const ADMIN_NOTIFICATION_STEP = ["전체", "출석부", "강아지 관리", "유치원 운영"] as const;

export const ADMIN_NOTIFICATION = {
  attendance: [
    {
      id: 0,
      title: (dog: string) => `${dog}의 정보가 수정되었어요`,
      text: "강아지 정보 수정은 견주가 할 수 있어요",
      path: (dogId: number, params: string) => PATH.ADMIN_ATTENDANCE_INFO(`${dogId}?${params}`),
      icon: <DogFilledIcon rx={14} w={28} h={28} />
    },
    {
      id: 1,
      title: (dog: string) => `${dog}의 이용권 만료일이 임박했어요`,
      text: (expired: string) =>
        expired === "date" ? `[만료 ${expired}일 전]` : `[잔여 횟수:${expired}회]`,
      path: (dogId: number, params: string) => PATH.ADMIN_ATTENDANCE_INFO(`${dogId}?${params}`),
      icon: <CalendarExpireIcon rx={14} w={28} h={28} />
    },
    {
      id: 2,
      title: (dog: string) => `${dog}의 이용권이 만료되었어요 이용권을 갱신해 주세요!`,
      text: "이용권 갱신은 원장님만 가능해요",
      subtext: (expired: string) =>
        expired === "date" ? `[시작일: ${expired}]` : `[만료된 이용권 정보:회차권 ${expired}회]`,
      path: (dogId: number, params: string) => PATH.ADMIN_ATTENDANCE_INFO(`${dogId}?${params}`),
      icon: <SendAlarmIcon borderStyle="50%" w={28} h={28} />
    },
    {
      id: 3,
      title: (dog: string) => `${dog}의 이용권이 갱신되었어요!`,
      text: (newTicket: string) =>
        newTicket === "date"
          ? `[시작일:${newTicket}]`
          : `[갱신된 이용권 정보:회차권 ${newTicket}회]`,
      path: (dogId: number, params: string) => PATH.ADMIN_ATTENDANCE_INFO(`${dogId}?${params}`),
      icon: <SendAlarmIcon borderStyle="50%" w={28} h={28} />
    },
    {
      id: 4,
      title: "유치원 유의사항이 업데이트 되었어요!",
      text: (alarm: string) => `견주들에게 ${alarm} 재동의 알림을 전송해 주세요`,
      path: PATH.ADMIN_ATTENDANCE,
      icon: <ListYellowCircleIcon />
    },
    {
      id: 5,
      title: "신규 가입된 강아지가 있어요!",
      text: "신규 가입 강아지의 가입 정보를 확인해 보세요",
      path: PATH.ADMIN_ATTENDANCE,
      icon: <AddBrownIcon />
    }
  ] as NotificationItem[],
  care: [
    {
      id: 0,
      title: "아직 전송되지 않은 알림장이 있어요!",
      text: "오늘이 지나면 알림장이 초기화 돼요 작성 중인 알림장을",
      subtext: "견주에게 전송해 주세요",
      path: PATH.ADMIN_CARE,
      icon: <AgendaIcon bg={true} w={28} h={28} />
    },
    {
      id: 1,
      title: (dog: string) => `${dog}의 사진을 아직 한장도 전송하지 않았어요`,
      text: "강아지의 유치원 활동 상황을 견주와 공유해 보세요",
      path: (dogId: number) => PATH.ADMIN_CARE_INFO_GALLERY(dogId),
      icon: <AgendaIcon bg={true} w={28} h={28} />
    }
  ] as NotificationItem[],
  management: [
    {
      id: 0,
      title: "유치원 신규 가입 신청이 있어요!",
      text: "가입 신청 목록에서 승인 혹은 거절을 해주세요",
      path: PATH.ADMIN_ENROLLMENT,
      icon: <AddBrownIcon />
    },
    {
      id: 1,
      title: (name: string) => `${name} 선생님이 유치원 가입 신청을 했어요`,
      text: "가입 신청 목록에서 승인 혹은 거절을 해주세요",
      path: PATH.ADMIN_TEACHER_MANAGE,
      icon: <SendAlarmIcon borderStyle="50%" w={28} h={28} />
    },
    {
      id: 2,
      title: (name: string) => `${name} 선생님이 유치원을 탈퇴했어요`,
      text: "교사 목록에서 확인해 보세요",
      path: PATH.ADMIN_TEACHER_MANAGE,
      icon: <AlertBrownIcon />
    }
  ] as NotificationItem[]
} as const;
