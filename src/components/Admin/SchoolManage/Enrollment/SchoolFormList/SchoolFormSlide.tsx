import { useGetSchoolFormList } from "hooks/api/admin/enroll";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import Slider from "react-slick";

import { SchoolFormCard } from "./SchoolFormCard";
import * as S from "./styles";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function SchoolFormSlide() {
  const { schoolId } = useAdminInfo();
  const { data } = useGetSchoolFormList(schoolId);

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
      {data.length <= 1 ? (
        <SchoolFormCard data={data[0]} isUsed />
      ) : (
        <Slider {...settings}>
          {data.map((form, index) => (
            <div key={form.schoolFormId}>
              <SchoolFormCard data={form} isUsed={index === 0} />
            </div>
          ))}
        </Slider>
      )}
    </S.Container>
  );
}
