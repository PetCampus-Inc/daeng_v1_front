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
      <DogImageSidler
        images={[
          "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1618359057154-e21ae64350b6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1562176566-e9afd27531d4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]}
      />
      <div>사진앨범</div>
    </Container>
  );
};

export default memo(Home);
