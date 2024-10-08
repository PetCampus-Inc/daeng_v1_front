import AlertFilledIcon from "assets/svg/alert-filled-icon";
import ApplicationWhiteIcon from "assets/svg/application-white-icon";
import CarIcon from "assets/svg/car-icon";
import HomelessDogIcon from "assets/svg/homeless-dog-icon";
import MedicineIcon from "assets/svg/medicine-icon";
import StopUseIcon from "assets/svg/stop-use-icon";
import SendAlarmButton from "components/Admin/DogDetailInfo/Ticket/SendAlarmButton";
import { Box, Flex, Text } from "components/common";
import { ListContainer } from "components/common/Tabs/styles";
import { useGetPrecautions } from "hooks/api/admin/dogs";

import { InnerContainer } from "../styles";

// TODO: 이용 약관 정책 확인 후 문서화
// TODO: 재동의 필요 / 신규 동의 필요 구분해야함
// TODO: 알림전송 버튼 표시여부
export function Notice({ dogId }: { dogId: number }) {
  const { data } = useGetPrecautions(dogId);

  const findObject = (id: number) => {
    const object = data.agreements.find((obj) => Object.prototype.hasOwnProperty.call(obj, id));
    const date = object ? Object.values(object)[0] : undefined;

    return date && date !== "null" ? `${date} 동의` : "동의 내역 없음";
  };

  return (
    <InnerContainer style={{ gap: "12px" }}>
      <Flex justify={"space-between"} align={"center"}>
        <Text typo={"body1_18_B"} color={"gray_1"}>
          유의사항 동의
        </Text>
        <SendAlarmButton />
      </Flex>

      <ListContainer>
        {DOG_NOTICE_LIST.map((item) => (
          <Box
            display={"flex"}
            justify={"space-between"}
            align={"center"}
            py={12}
            borderBottom={1}
            borderColor={"gray_5"}
            key={item.id}
          >
            <Flex align={"center"} gap={8}>
              {item.icon}
              <Text typo={"body2_16_R"} color={"gray_1"}>
                {item.title}
              </Text>
            </Flex>
            <Flex align={"center"} gap={10}>
              <Flex align={"center"}>
                {data.modifiedList?.includes(item.id) ? (
                  <>
                    <AlertFilledIcon colorScheme="orange" />{" "}
                    <Text typo={"caption1_12_R"} color={"primary_3"}>
                      재동의 필요
                    </Text>
                  </>
                ) : (
                  ""
                )}
              </Flex>

              <Text typo={"caption1_12_R"} color={"gray_3"}>
                {findObject(item.id)}
              </Text>
            </Flex>
          </Box>
        ))}
      </ListContainer>
    </InnerContainer>
  );
}

const DOG_NOTICE_LIST = [
  {
    id: 21,
    title: "이용권 동의",
    icon: <ApplicationWhiteIcon />
  },
  {
    id: 30,
    title: "픽드랍 동의",
    icon: <CarIcon />
  },
  {
    id: 22,
    title: "이용 제한 동의",
    icon: <StopUseIcon />
  },
  {
    id: 23,
    title: "상해 동의",
    icon: <MedicineIcon />
  },
  {
    id: 24,
    title: "유기 동의",
    icon: <HomelessDogIcon />
  }
] as const;
