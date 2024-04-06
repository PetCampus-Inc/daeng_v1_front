import { PATH } from "constants/path";

import Chat from "assets/svg/chat";
import ChatBlack from "assets/svg/chat-black";
import HomeBlack from "assets/svg/home-black";
import HomeBrown from "assets/svg/home-brown";
import MyPageDog from "assets/svg/myPageDog";
import MyPageDogBlack from "assets/svg/myPageDogBlack";

export const MENU_ITEMS = [
  {
    text: "채팅",
    path: "",
    blackImage: <ChatBlack />,
    colorImage: <Chat />
  },
  {
    text: "홈",
    path: "",
    blackImage: <HomeBlack />,
    colorImage: <HomeBrown />
  },
  {
    text: "마이페이지",
    path: PATH.MEMBER_MY_PAGE,
    blackImage: <MyPageDogBlack />,
    colorImage: <MyPageDog />
  }
];
