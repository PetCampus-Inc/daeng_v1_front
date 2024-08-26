import MapPinIcon from "assets/svg/map-pin-icon";
import BasicPhoneIcon from "assets/svg/phone-basic";
import PhoneIcon from "assets/svg/phone-icon";
import { BottomContainer, UpperContainer } from "components/Admin/DogDetailInfo/DogInfo/styles";
import { Box, Flex, Text } from "components/common";
import { XSmallButton } from "components/common/Button";

import type { DogInfoDetailData } from "types/admin/attendance.type";

interface AboutOwnerProps {
  data: DogInfoDetailData["member"];
}

// TODO: 전화 걸기 기능 추가
// TODO: 예방 접종 파일 열람 페이지 추가
export function AboutOwnerCard({ data }: AboutOwnerProps) {
  return (
    <Flex direction={"column"} gap={12}>
      <Text typo={"body1_18_B"} color={"gray_1"}>
        보호자 상세 정보
      </Text>
      <Box shadow={"card"} radius={"12px"}>
        <UpperContainer>
          <Text typo={"body1_18_B"} color={"gray_1"}>
            {data.memberName}
          </Text>
        </UpperContainer>
        <BottomContainer>
          <Flex align={"center"} justify={"space-between"}>
            <Flex align={"center"} gap={8}>
              <BasicPhoneIcon />
              {data.phoneNumber}
            </Flex>
            <XSmallButton
              typo="caption1_12_B"
              colorScheme="yellow_3"
              onClick={() => window.open(`tel:${data.phoneNumber}`)}
              leftAddon={<PhoneIcon color={"transparent"} />}
            >
              전화 걸기
            </XSmallButton>
          </Flex>
          {data.emergencyNumber && (
            <Flex align={"center"} justify={"space-between"}>
              <Flex align={"center"} gap={8}>
                <BasicPhoneIcon />
                {data.emergencyNumber}
              </Flex>
              <XSmallButton
                typo="caption1_12_B"
                colorScheme="yellow_3"
                onClick={() => window.open(`tel:${data.phoneNumber}`)}
                leftAddon={<PhoneIcon color={"transparent"} />}
              >
                전화 걸기
              </XSmallButton>
            </Flex>
          )}
          <Flex direction={"column"} justify={"space-between"}>
            <Flex align={"center"} gap={8}>
              <MapPinIcon />
              {data.address
                ? `${data.address}${data.addressDetail ? " " + data.addressDetail : ""}`
                : "주소 없음"}
            </Flex>
          </Flex>
        </BottomContainer>
      </Box>
    </Flex>
  );
}
