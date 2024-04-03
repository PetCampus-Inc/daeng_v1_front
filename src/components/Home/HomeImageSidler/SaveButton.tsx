import DownloadIcon from "assets/svg/download-icon";

import { IconButton } from "./style";

const SaveButton = () => {
  return (
    <IconButton type="button" onClick={() => console.log("저장버튼 클릭")}>
      <DownloadIcon />
    </IconButton>
  );
};

export default SaveButton;
