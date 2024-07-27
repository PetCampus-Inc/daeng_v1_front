import { Flex } from "components/common";
import AllCalendar from "components/common/Calendar/AllCalendar";

import * as S from "./styles";
import TicketInfo from "./TicketInfo";

interface IProps {
  dogId: number;
}

const AttendanceTicketInfo = ({ dogId }: IProps) => {
  // FIXME useGetMemberDogEnrollmemntInfo와 useGetMemberSchoolInfo 불러오는 데이터가 달라 확인 필요
  return (
    <Flex direction="column" gap={42} pt={14} px={16}>
      <section>
        <S.DogDetailInfoText className="big">출결</S.DogDetailInfoText>
        <AllCalendar />
      </section>

      <section>
        <S.DogDetailInfoText className="big">이용권 정보</S.DogDetailInfoText>
        <TicketInfo dogId={dogId} />
      </section>
    </Flex>
  );
};

export default AttendanceTicketInfo;
