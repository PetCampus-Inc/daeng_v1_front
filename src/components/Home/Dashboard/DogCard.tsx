import AgendaIcon from "assets/svg/agenda-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import SpeakerIcon from "assets/svg/speaker-icon";
import { Flex, Text } from "components/common";
import { IHome } from "types/member/home.types";

import { BoxContainer } from "./styles";

interface DogCardProps {
  data: Pick<IHome, "todayAgendaStatus">;
}

const DogCard = ({ data }: DogCardProps) => {
  return (
    <>
      <BoxContainer className="grid-top-right">
        <Flex display="inline-flex" direction="column" gap="14">
          <AgendaIcon bg />
          <Text typo="body2_16_R" color="gray_1">
            <Text typo="body2_16_B" color="gray_1">
              알림장
            </Text>
            을
            <br />
            작성중이에요
          </Text>
        </Flex>
      </BoxContainer>

      <BoxContainer className="collapse grid-bottom-right">
        <Flex justify="space-between" align="center">
          <Flex gap="8" align="center">
            <SpeakerIcon bg />
            <Text typo="body2_16_B" color="gray_1">
              공지
            </Text>
          </Flex>
          <ArrowRightIcon w="24" colorScheme="gray_2" />
        </Flex>
      </BoxContainer>
    </>
  );
};

export default DogCard;
