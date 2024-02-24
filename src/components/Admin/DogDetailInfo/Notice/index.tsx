import React from "react";
import { InnerContainer } from "../styles";
import { DogDetailInfoText } from "../DogInfo/styles";
import SendAlermButton from "../Ticket/SendAlermButton";
import * as S from "./styles";
import AgreeList from "./AgreeList";

const Notice = () => {
  return (
    <InnerContainer>
      <S.FlexWrapper>
        <DogDetailInfoText className="big">유의사항 동의</DogDetailInfoText>
        <SendAlermButton />
      </S.FlexWrapper>

      <AgreeList />
    </InnerContainer>
  );
};

export default Notice;
