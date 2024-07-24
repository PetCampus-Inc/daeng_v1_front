import BoneIcon from "assets/svg/bone-icon";
import PoopStatusIcon from "assets/svg/poop-status-icon";
import { Flex, Text } from "components/common";
import PoopBox from "components/common/PoopBox";
import { Poop } from "types/admin/attendance.type";

export const AgendaData = () => {
  return (
    <Flex direction="column" gap={44} mt={24}>
      <Text typo="label2_14_R" color="darkBlack">
        오늘 뽀뽀야호는 시츄 친구와 노즈워크를 하며 간식을 여러개 찾아냈습니다. 내일은 구의천 산책이
        예정되어 있으니 보라색 입마개를 지참해서 보내주세요 :
      </Text>
      <Flex direction="column" gap={4}>
        <Flex gap={4}>
          <BoneIcon />
          <Text typo="label1_16_B" color="darkBlack">
            간식
          </Text>
        </Flex>
        <Text typo="label2_14_R" color="darkBlack">
          목뼈 간식 2개, 육포(대형) 3개 급여
        </Text>
      </Flex>
      <Flex direction="column" gap={4}>
        <Flex gap={4}>
          <PoopStatusIcon />
          <Text typo="label1_16_B" color="darkBlack">
            배변 상태
          </Text>
        </Flex>
        <Text typo="label2_14_R" color="darkBlack">
          오늘은 밥도 남김없이 먹고 물도 많이 마셨습니다. 다만 아까 먹은 간식이 입에 맞지 않았는지
          5개 중 2개만 먹었습니다. 배변은 산책시 1회 원 내에서 1회 둘 다 묽은 상태였으니 보호자님은
          주의 부탁드립니다.
        </Text>
        <PoopBox selected={Poop.HEALTHY} variant="sm" />
      </Flex>
    </Flex>
  );
};
