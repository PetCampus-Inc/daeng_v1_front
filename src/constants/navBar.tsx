import { PATH } from "./path";
import AttendanceBlack from "assets/svg/attendanceBlack";
import Attendance from "assets/svg/attendance";
import CheckBoardBlack from "assets/svg/checkBoardBlack";
import CheckBoard from "assets/svg/checkBoard";
import ChatBlack from "assets/svg/chatBlack";
import Chat from "assets/svg/chat";
import SchoolBlack from "assets/svg/schoolBlack";
import School from "assets/svg/school";
import MyPageDogBlack from "assets/svg/myPageDogBlack";
import MyPageDog from "assets/svg/myPageDog";

export const menuItems = [
  {
    text: "출석부",
    path: PATH.ADMIN_ATTENDANCE,
    blackImage: <AttendanceBlack />,
    colorImage: <Attendance />
  },
  {
    text: "강아지 관리",
    path: PATH.ADMIN_ATTEND_CARE,
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
