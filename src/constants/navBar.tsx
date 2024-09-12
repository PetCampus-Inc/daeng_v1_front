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

import { routes } from "./path";

export const MENU_ITEMS = {
  admin: [
    {
      id: 0,
      text: "출석부",
      path: routes.admin.attendance.root,
      blackImage: <AttendanceBlackIcon />,
      colorImage: <AttendanceIcon />
    },
    {
      id: 1,
      text: "강아지 관리",
      path: routes.admin.care.root,
      blackImage: <CheckBoardBlack />,
      colorImage: <CheckBoard />
    },
    /* 채팅 기능은 ver 1.0.0 에선 없음 */
    {
      id: 3,
      text: "채팅",
      path: routes.admin.chat.root,
      blackImage: <ChatBlack />,
      colorImage: <Chat />
    },
    {
      id: 2,
      text: "유치원 운영",
      path: routes.admin.school.root,
      blackImage: <SchoolBlack />,
      colorImage: <School />
    },
    {
      id: 4,
      text: "마이페이지",
      path: routes.admin.mypage.root,
      blackImage: <MyPageDogBlack />,
      colorImage: <MyPageDog />
    }
  ],
  member: [
    /* 채팅 기능은 ver 1.0.0 에선 없음 */
    {
      id: 2,
      text: "채팅",
      path: "",
      blackImage: <ChatBlack />,
      colorImage: <Chat />
    },
    {
      id: 0,
      text: "홈",
      path: routes.root,
      blackImage: <HomeBlack />,
      colorImage: <HomeBrown />
    },
    {
      id: 1,
      text: "마이페이지",
      path: routes.member.mypage.root,
      blackImage: <MyPageDogBlack />,
      colorImage: <MyPageDog />
    }
  ]
} as const;
