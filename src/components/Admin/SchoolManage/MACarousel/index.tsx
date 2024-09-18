import useGetNewEnrollment from "hooks/api/useGetNewEnrollment";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import Slider from "react-slick";

import * as S from "./styles";
import SimpleMembershipApplication from "../SimpleMembershipApplication";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MACarousel = () => {
  const { schoolId } = useAdminInfo();
  const { data, isLoading } = useGetNewEnrollment(schoolId);

  if (isLoading || !data || data?.simpleSchoolFormList.length === 0) return <div>로딩중...</div>;

  const list = data.simpleSchoolFormList;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

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
