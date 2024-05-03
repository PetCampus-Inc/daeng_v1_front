import { PATH } from "constants/path";

import RightArrow from "assets/svg/arrow-right-icon";
import CareDogIcon from "assets/svg/care-dog-icon";
import { Text } from "components/common";
import { Link } from "react-router-dom";

import { LinkText } from "../card/styles";

const EmptyDog = () => {
  return (
    <>
      <CareDogIcon aria-hidden="true" />
      <LinkText>
        <Link to={PATH.ADMIN_ATTENDANCE}>
          출석 진행 하기 <RightArrow w={"20"} h={"20"} aria-hidden="true" />
        </Link>
      </LinkText>
      <Text typo="label2_14_R" color="gray_2">
        출석 후에 관리할 강아지를 선택할 수 있어요
      </Text>
    </>
  );
};

export default EmptyDog;
