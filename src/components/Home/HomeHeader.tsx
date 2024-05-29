import { Flex, Text } from "components/common";

import { Img, ImgWrapper, StyledHgroup } from "./styles";

import type { HomeInfoType } from "types/member/main.types";

const HomeHeader = ({ data }: { data: HomeInfoType }) => {
  return (
    <StyledHgroup>
      <Flex align="center" gap="4">
        <ImgWrapper>
          <Img src={data?.memberProfileUri} alt={`${data.dogName}님의 프로필`} />
        </ImgWrapper>
        <Text as="h2" typo="title2_20_B" color="darkBlack">
          {data.dogName} {data?.relation}님
        </Text>
      </Flex>
      <Text as="p" typo="body2_16_R" color="gray_2">
        아래에서 {data.dogName} 유치원 일지를 확인할 수 있어요
      </Text>
    </StyledHgroup>
  );
};

export default HomeHeader;
