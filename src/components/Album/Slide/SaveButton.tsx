import DownloadIcon from "assets/svg/download-icon";
import SimpleButton from "components/common/Button/SimpleButton";

import { DefaultButtonStyle, GrayButtonStyle } from "./styles";

interface SaveButtonProps {
  isSaveMode: boolean;
  handleSaveMode: () => void;
}

const SaveButton = ({ isSaveMode, handleSaveMode }: SaveButtonProps) => {
  return (
    <>
      {isSaveMode ? (
        <SimpleButton colorScheme="gray" onClick={handleSaveMode} css={GrayButtonStyle}>
          취소
        </SimpleButton>
      ) : (
        <SimpleButton onClick={handleSaveMode} css={DefaultButtonStyle}>
          <DownloadIcon />
        </SimpleButton>
      )}
    </>
  );
};

export default SaveButton;
