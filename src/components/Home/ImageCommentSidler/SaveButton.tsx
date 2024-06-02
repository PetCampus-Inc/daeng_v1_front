import DownloadIcon from "assets/svg/download-icon";

import { IconButton } from "./styles";

const SaveButton = ({ isOpen }: { isOpen?: boolean }) => {
  return (
    <IconButton type="button" className={isOpen ? "active" : ""}>
      <DownloadIcon />
    </IconButton>
  );
};

export default SaveButton;
