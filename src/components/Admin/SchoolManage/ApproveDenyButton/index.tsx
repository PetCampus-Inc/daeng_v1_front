import { Dispatch, SetStateAction, useState } from "react";
import { themeConfig } from "styles/themeConfig";

import * as S from "./styles";

interface IApproveDenyButton {
  setIsShow: Dispatch<SetStateAction<boolean>>;
  approveFunc: () => void;
  denyFunc: () => void;
}

export function ApproveDenyButton({ setIsShow, approveFunc, denyFunc }: IApproveDenyButton) {
  const [firstButtonVisible, setFirstButtonVisible] = useState(true);
  const [secondButtonVisible, setSecondButtonVisible] = useState(true);

  const handleButton1Click = () => {
    approveFunc();
    setSecondButtonVisible(false);
  };

  const handleButton2Click = () => {
    denyFunc();
    setFirstButtonVisible(false);
  };

  const customVariants = {
    greenScaleUp: { backgroundColor: themeConfig.colors.green, width: "120px" },
    redScaleUp: {
      backgroundColor: themeConfig.colors.red_1,
      width: "120px",
      color: themeConfig.colors.white
    },
    disappear: { opacity: 0, display: "none" }
  };

  return (
    <S.ButtonWrapper>
      {firstButtonVisible && (
        <S.ButtonWrapper>
          <S.Button
            key="button1"
            variants={customVariants}
            initial={{ opacity: 1, scale: 1 }}
            animate={!secondButtonVisible && "greenScaleUp"}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            onClick={handleButton1Click}
            onAnimationComplete={() => setIsShow(false)}
          >
            승인
          </S.Button>
        </S.ButtonWrapper>
      )}

      {secondButtonVisible && (
        <S.ButtonWrapper style={{ justifyContent: "flex-end" }}>
          <S.Button
            key="button2"
            className="second"
            variants={customVariants}
            initial={{ opacity: 1, scale: 1 }}
            animate={!firstButtonVisible && "redScaleUp"}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            onClick={handleButton2Click}
            onAnimationComplete={() => setIsShow(false)}
          >
            거절
          </S.Button>
        </S.ButtonWrapper>
      )}
    </S.ButtonWrapper>
  );
}
