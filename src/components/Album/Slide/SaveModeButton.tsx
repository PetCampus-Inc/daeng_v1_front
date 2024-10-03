import DownloadIcon from "assets/svg/download-icon";
import { XSmallButton } from "components/common/Button/Templates";
import { css } from "styled-components";

interface SaveModeButtonProps {
  isSaveMode: boolean;
  onToggleMode: () => void;
}

export function SaveModeButton({ isSaveMode, onToggleMode }: SaveModeButtonProps) {
  return (
    <>
      {isSaveMode ? (
        <XSmallButton
          colorScheme="gray_5"
          typo="caption1_12_R"
          css={{ height: "24px", padding: 0 }}
          onClick={onToggleMode}
        >
          취소
        </XSmallButton>
      ) : (
        <XSmallButton colorScheme="white" onClick={onToggleMode} css={DefaultButtonStyle}>
          <DownloadIcon />
        </XSmallButton>
      )}
    </>
  );
}

const DefaultButtonStyle = css`
  background-color: transparent;
  padding: 0px;
  height: 24px;
`;
