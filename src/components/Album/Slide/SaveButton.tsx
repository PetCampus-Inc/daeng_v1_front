import DownloadIcon from "assets/svg/download-icon";
import { XSmallButton } from "components/common/Button/Templates";
import { css } from "styled-components";

interface SaveButtonProps {
  isSaveMode: boolean;
  handleSaveMode: () => void;
}

const SaveButton = ({ isSaveMode, handleSaveMode }: SaveButtonProps) => {
  return (
    <>
      {isSaveMode ? (
        <XSmallButton
          colorScheme="gray_5"
          typo="caption1_12_R"
          css={{ height: "24px" }}
          onClick={handleSaveMode}
        >
          취소
        </XSmallButton>
      ) : (
        <XSmallButton colorScheme="white" onClick={handleSaveMode} css={DefaultButtonStyle}>
          <DownloadIcon />
        </XSmallButton>
      )}
    </>
  );
};

export default SaveButton;

const DefaultButtonStyle = css`
  background-color: transparent;

  padding: 0px 8px;

  height: 24px;
`;
