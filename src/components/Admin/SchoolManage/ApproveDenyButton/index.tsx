import { ThemeConfig } from "styles/ThemeConfig";
import * as S from "./styles";
import { useState } from "react";

const ApproveDenyButton = () => {
  const [button1Visible, setButton1Visible] = useState(true);
  const [button2Visible, setButton2Visible] = useState(true);

  const handleButton1Click = () => {
    setButton2Visible(false);
  };

  const handleButton2Click = () => {
    setButton1Visible(false);
  };

  const customVariants = {
    greenScaleUp: { backgroundColor: ThemeConfig.colors.green, width: "120px" },
    redScaleUp: { backgroundColor: ThemeConfig.colors.red_1, width: "120px", color: "white" },
    disappear: { opacity: 0, display: "none" }
  };

  return (
    <S.ButtonWrapper>
      {button1Visible && (
        <S.ButtonWrapper>
          <S.Button
            variants={customVariants}
            initial={{ opacity: 1, scale: 1 }}
            animate={!button2Visible && "greenScaleUp"}
            exit={{ opacity: 0, y: -20 }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            onClick={handleButton1Click}
          >
            승인
          </S.Button>
        </S.ButtonWrapper>
      )}

      {button2Visible && (
        <S.ButtonWrapper style={{ justifyContent: "flex-end" }}>
          <S.Button
            key="button2"
            className="second"
            variants={customVariants}
            initial={{ opacity: 1, scale: 1 }}
            animate={!button1Visible && "redScaleUp"}
            exit={{ opacity: 0, y: -20, backgroundColor: "blue" }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            onClick={handleButton2Click}
          >
            거절
          </S.Button>
        </S.ButtonWrapper>
      )}
    </S.ButtonWrapper>
  );
};

export default ApproveDenyButton;
