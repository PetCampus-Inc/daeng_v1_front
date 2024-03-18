import Attendance from "assets/svg/attendance";
import AttendanceBlack from "assets/svg/attendanceBlack";
import Chat from "assets/svg/chat";
import ChatBlack from "assets/svg/chatBlack";
import CheckBoard from "assets/svg/checkBoard";
import CheckBoardBlack from "assets/svg/checkBoardBlack";
import MyPageDog from "assets/svg/myPageDog";
import MyPageDogBlack from "assets/svg/myPageDogBlack";
import School from "assets/svg/school";
import SchoolBlack from "assets/svg/schoolBlack";

import { PATH } from "./path";

export const MENU_ITEMS = [
  {
    text: "출석부",
    path: PATH.ADMIN_ATTENDANCE,
    blackImage: <AttendanceBlack />,
    colorImage: <Attendance />
  },
  {
    text: "강아지 관리",
    path: PATH.ADMIN_CARE_DOG,
    blackImage: <CheckBoardBlack />,
    colorImage: <CheckBoard />
  },
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
];
