import PoopHard from "assets/svg/poop-hard";
import PoopHealthy from "assets/svg/poop-healthy";
import PoopNotBrown from "assets/svg/poop-not-brown";
import PoopWarning from "assets/svg/poop-warning";
import PoopWatery from "assets/svg/poop-watery";
import { Text } from "components/common/Text";
import { ChangeEvent, forwardRef } from "react";
import { colors } from "styles/foundations/colors";
import { POOP_STATUS, type PoopStatus } from "types/member/dogs";

import * as S from "./styles";

interface PoopStatusGroupProps {
  size?: "s" | "l";
  selected?: PoopStatus;
  readOnly?: boolean;
  onChange?: (status: ChangeEvent<HTMLInputElement>) => void;
}

const PoopStatusGroup = forwardRef<HTMLInputElement, PoopStatusGroupProps>(
  ({ size = "l", selected = POOP_STATUS.HARD, readOnly, onChange }, ref) => {
    return (
      <S.PoopStatusFieldSet>
        {poopStatus.map(({ status, label, icon, activeColor }) => (
          <S.PoopStatusRadioWrap key={status}>
            <S.PoopStatusRadio color={activeColor}>
              {icon}
              <input
                ref={ref}
                type="radio"
                name="poop-status"
                disabled={readOnly}
                value={status}
                defaultChecked={selected === status}
                onChange={onChange}
              />
            </S.PoopStatusRadio>

            <Text
              typo={size === "s" ? "caption1_12_R" : "label2_14_R"}
              color={readOnly ? "gray_3" : "gray_2"}
              whiteSpace="nowrap"
            >
              {label}
            </Text>
          </S.PoopStatusRadioWrap>
        ))}
      </S.PoopStatusFieldSet>
    );
  }
);

const poopStatus = [
  {
    label: "딱딱함",
    status: POOP_STATUS.HARD,
    icon: <PoopHard />,
    activeColor: colors.primaryColor
  },
  {
    label: "건강함",
    status: POOP_STATUS.HEALTHY,
    icon: <PoopHealthy />,
    activeColor: colors.primaryColor
  },
  {
    label: "묽은 변",
    status: POOP_STATUS.WATERY,
    icon: <PoopWatery />,
    activeColor: colors.primaryColor
  },
  {
    label: "갈색이 아닌",
    status: POOP_STATUS.NOT_BROWN,
    icon: <PoopNotBrown />,
    activeColor: "#5D7E42"
  },
  {
    label: "주의필요",
    status: POOP_STATUS.WARNING,
    icon: <PoopWarning />,
    activeColor: colors.red_1
  }
];

export default PoopStatusGroup;
