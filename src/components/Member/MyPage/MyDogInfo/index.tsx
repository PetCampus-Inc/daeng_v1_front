import { DragCarousel } from "components/common/Carousel";
import { useToggle } from "hooks/common/useToggle";
import { IMemberInfo } from "types/member/main.types";

import DoglistBox from "./Box/DoglistBox";
import TitleBox from "./Box/TitleBox";
import * as S from "./styles";

interface MemberInfoProps {
  data: IMemberInfo;
}

const MyDogInfo = ({ data }: MemberInfoProps) => {
  const { doglist } = data;
  const { isOpen, toggle } = useToggle();
  return (
    <S.DogInfoContainer>
      <TitleBox onToggle={toggle} />

      {doglist.length <= 1 ? (
        <S.MyDogInfoList>
          <DoglistBox doglist={doglist} isOpen={isOpen} />
        </S.MyDogInfoList>
      ) : (
        <S.DragCarouselWrapper>
          <DragCarousel gap={12}>
            <DoglistBox doglist={doglist} isOpen={isOpen} />
          </DragCarousel>
        </S.DragCarouselWrapper>
      )}
    </S.DogInfoContainer>
  );
};

export default MyDogInfo;
