import Slider from "react-slick";
import SimpleMembershipApplication from "../SimpleMembershipApplication";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRecoilValue } from "recoil";
import { newEnrollmentListAtom } from "store/admin";
import * as S from "./styles";

const MACarousel = () => {
  const list = useRecoilValue(newEnrollmentListAtom)?.simpleSchoolFormList;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  if (!list) return <div>로딩중...</div>;

  return (
    <S.Container>
      {list.length <= 1 ? (
        <SimpleMembershipApplication data={list[0]} isUsed />
      ) : (
        <Slider {...settings}>
          {list.map((form, index) => (
            <div key={form.schoolFormId}>
              <SimpleMembershipApplication data={form} isUsed={index === 0 ? true : false} />
            </div>
          ))}
        </Slider>
      )}
    </S.Container>
  );
};

export default MACarousel;
