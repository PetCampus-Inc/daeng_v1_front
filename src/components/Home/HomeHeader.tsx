import { Flex, Text } from "components/common";

import { Img, ImgWrapper, StyledHgroup } from "./styles";

import type { IHome } from "types/member/home.types";

const HomeHeader = ({ data }: { data: IHome }) => {
  return (
    <StyledHgroup>
      <Flex align="center" gap="4">
        <ImgWrapper>
          <Img src="https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png" />
        </ImgWrapper>
        <Text tag="h2" typo="title2_20_B" color="darkBlack">
          {data.dogName} {data.relation}님
        </Text>
      </Flex>
      <Text tag="p" typo="body2_16_R" color="gray_2">
        아래에서 {data.dogName} 유치원 일지를 확인할 수 있어요
      </Text>
    </StyledHgroup>
  );
};

export default HomeHeader;
