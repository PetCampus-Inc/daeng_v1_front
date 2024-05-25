import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import EmptyAlbum from "components/Home/Empty/EmptyAlbum";
import HomeDashboard from "components/Home/HomeDashboard";
import HomeHeader from "components/Home/HomeHeader";
import HomeImageCommentSlider from "components/Home/HomeImageCommentSlider";
import { StyledBox } from "components/Home/styles";
import { useGetHomeInfo } from "hooks/api/member/member";
import { Role } from "types/admin/admin.type";

import type { HomeDataType } from "types/member/home.types";

const HomePage = () => {
  // const { data } = useGetHomeInfo(8, 8);

  return (
    <>
      <Header type="main" text={mock?.dogName} />
      <main>
        <StyledBox type="top" pt={2} pb={2}>
          <HomeHeader data={mock} />
          <HomeDashboard data={mock} />
        </StyledBox>
        <StyledBox type="bottom" bg="BGray" pt={2} pb={3.438}>
          <HomeImageCommentSlider images={mock.imageList} />
          <EmptyAlbum />
        </StyledBox>
      </main>
      <NavBar />
    </>
  );
};

export default HomePage;

const mock: HomeDataType = {
  memberId: 8,
  memberNickname: "",
  role: Role.ROLE_MEMBER,
  memberProfileUri: "https://cdn.imweb.me/upload/S201807025b39d1981b0b0/5cac274d00b12.jpg",
  dogId: 8,
  dogName: "박또리",
  dogProfile:
    "https://lh3.googleusercontent.com/proxy/HOUPHpjerCV1WOJyDAETIpYZO0sXXDFV9GeeDEROvFJ9fYKJSEMHTKY9wCf_eBmlXLR-cJnBFLb0Il57hWpy4ups18ZtkcO_s_mlzrTUBu00d5JowM4",
  status: null,
  relation: "언니",
  attendanceStatus: "NOT_ATTENDED",
  attendanceDate: [2024, 5, 25],
  todayAgendaStatus: "NOT_YET",
  schoolName: null,
  imageList: [
    [
      {
        imageId: 8,
        imageUri:
          "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageType: "IMAGE",
        comment: "갱얼지가\n몽몽몽몽\n몽몽\n몽몽이\n몽몽몽\n운다",
        createdTime: "2024-05-25T18:08:12.368Z"
      }
    ],
    [
      {
        imageId: 9,
        imageUri:
          "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageType: "IMAGE",
        createdTime: "2024-05-23T15:14:51.149Z"
      },
      {
        imageId: 10,
        imageUri:
          "https://pet-campus-s3.s3.amazonaws.com/test_images/agenda/3/9f8cb3e0056c11efaf01fb4f74c2c063.quicktime",
        imageType: "IMAGE",
        createdTime: "2024-05-24T15:14:51.149Z"
      },
      {
        imageId: 11,
        imageUri:
          "https://pet-campus-s3.s3.amazonaws.com/test_images/agenda/3/3a2cbf80056d11efaf01fb4f74c2c063.gif",
        imageType: "IMAGE",
        comment:
          "또리는요 오늘 즐거운 시간을 보냈어요. 밥도 아주 잘 먹었구요. 간식도 아주 많이 먹었어요. 또리는  수영장을 좋아해요. 물에 뛰어들어서 놀아요. 또리는 산책을 좋아해요. 산책을 하면서 많은 친구들을 만나요. 또리는 놀이터를 좋아해요. 놀이터에서 많은 친구들과 놀아요. 또리는 먹는 것을 좋아해요. 먹는 것을 보면 아주 기뻐해요.",
        createdTime: "2024-05-23T15:14:51.149Z"
      },
      {
        imageId: 12,
        imageUri:
          "https://images.unsplash.com/photo-1562176566-e9afd27531d4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageType: "IMAGE",
        comment: "갱얼지가\n몽몽몽몽\n몽몽\n몽몽이\n몽몽몽\n운다",
        createdTime: "2024-05-24T15:14:51.149Z"
      },
      {
        imageId: 13,
        imageUri:
          "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageType: "IMAGE",
        comment:
          "또리는요\n오늘 즐거운 시간을 보냈어요.\n밥도 아주 잘 먹었구요.\n간식도 아주 많이 먹었어요.\n또리는 수영장을 좋아해요.\n물에 뛰어들어서 놀아요.\n또리는 산책을 좋아해요.\n산책을 하면서 많은 친구들을 만나요.\n또리는 놀이터를 좋아해요.\n놀이터에서 많은 친구들과 놀아요.\n또리는 먹는 것을 좋아해요.\n먹는 것을 보면 아주 기뻐해요.\n또리는 사람을 좋아해요.\n또리는 귀여워요.\n또리는 사회성이 높아요.\n또리는 활발해요.",
        createdTime: "2024-05-22T15:14:51.149Z"
      }
    ]
  ]
};
