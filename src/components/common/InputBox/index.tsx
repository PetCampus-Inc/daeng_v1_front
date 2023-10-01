import { memo, SetStateAction } from "react";
import {
  StyledWrapper,
  StyledButtonWrapper,
  StyledMainWrapper,
} from "./styles";

interface Props {
  width: string;
  height: string;
  placeholdText?: string;
  inputValue: any;
  setInputValue: (e: any) => void | SetStateAction<any>;
  type?: string;
}

const InputBox = ({
  width,
  height,
  placeholdText,
  inputValue,
  setInputValue,
  type,
}: Props) => {
  return (
    <StyledMainWrapper width={width} height={height}>
      <StyledWrapper
        placeholder={placeholdText}
        type={type}
        value={inputValue}
        onChange={setInputValue}
      />
      {type === "search" && (
        <StyledButtonWrapper>
          <img src="images/search.png" alt="bell-icon" />
        </StyledButtonWrapper>
      )}
    </StyledMainWrapper>
  );
};

export default memo(InputBox);
