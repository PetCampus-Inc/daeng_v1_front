import { memo } from "react";

import DogImageSidler from "./HomeImageSidler/DogImageSidler";
import { Container } from "./styles";

const Home = () => {
  return (
    <Container>
      <div>뚜띠 백호의 엄마님</div>
      <div>아래에서 뚜디의 유치원 일지를 확인할 수 있어요</div>
      <div>
        <div>캘린더</div>
        <div>알림장</div>
        <div>공지</div>
      </div>
      <DogImageSidler images={mockData.images} comments={mockData.comments} />
      <div>사진앨범</div>
    </Container>
  );
};

export default memo(Home);

const mockData = {
  comments: [
    "첫 번째 강아지에 대한 댓글입니다.",
    "또리는요 오늘 즐거운 시간을 보냈어요. 밥도 아주 잘 먹었구요. 간식도 아주 많이 먹었어요. 또리는  수영장을 좋아해요. 물에 뛰어들어서 놀아요. 또리는 산책을 좋아해요. 산책을 하면서 많은 친구들을 만나요. 또리는 놀이터를 좋아해요. 놀이터에서 많은 친구들과 놀아요. 또리는 먹는 것을 좋아해요. 먹는 것을 보면 아주 기뻐해요.",
    "세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다.세 번째 강아지에 대한 댓글입니다."
  ],
  images: [
    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1618359057154-e21ae64350b6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1562176566-e9afd27531d4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]
};
