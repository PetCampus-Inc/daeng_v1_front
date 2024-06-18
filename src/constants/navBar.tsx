import AttendanceBlackIcon from "assets/svg/attendance-black-icon";
import AttendanceIcon from "assets/svg/attendance-icon";
import Chat from "assets/svg/chat";
import ChatBlack from "assets/svg/chat-black";
import CheckBoard from "assets/svg/check-board";
import CheckBoardBlack from "assets/svg/check-board-black";
import HomeBlack from "assets/svg/home-black";
import HomeBrown from "assets/svg/home-brown";
import MyPageDog from "assets/svg/my-page-dog";
import MyPageDogBlack from "assets/svg/my-page-dog-black";
import SchoolBlack from "assets/svg/school-black";
import School from "assets/svg/school-icon";

import { PATH } from "./path";

export const MENU_ITEMS = {
  admin: [
    {
      text: "출석부",
      path: PATH.ADMIN_ATTENDANCE,
      blackImage: <AttendanceBlackIcon />,
      colorImage: <AttendanceIcon />
    },
    {
      text: "강아지 관리",
      path: PATH.ADMIN_CARE,
      blackImage: <CheckBoardBlack />,
      colorImage: <CheckBoard />
    },
    /* 채팅 기능은 ver 1.0.0 에선 없음 */
    {
      text: "채팅",
      path: PATH.ADMIN_CHAT,
      blackImage: <ChatBlack />,
      colorImage: <Chat />
    },
    {
      text: "유치원 운영",
      path: PATH.ADMIN_SCHOOL_MANAGE,
      blackImage: <SchoolBlack />,
      colorImage: <School />
    },
    {
      text: "마이페이지",
      path: PATH.ADMIN_MY_PAGE,
      blackImage: <MyPageDogBlack />,
      colorImage: <MyPageDog />
    }
  ],
  member: [
    /* 채팅 기능은 ver 1.0.0 에선 없음 */
    {
      text: "채팅",
      path: "",
      blackImage: <ChatBlack />,
      colorImage: <Chat />
    },
    {
      text: "홈",
      path: PATH.ROOT,
      blackImage: <HomeBlack />,
      colorImage: <HomeBrown />
    },
    {
      text: "마이페이지",
      path: (memberId: string) => PATH.MEMBER_MY_PAGE(memberId),
      blackImage: <MyPageDogBlack />,
      colorImage: <MyPageDog />
    }
  ]
} as const;
