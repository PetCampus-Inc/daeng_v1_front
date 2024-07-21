import useFocus from "hooks/common/useFocus";

import NickNameEdit from "../Edit/NickNameEdit";
import RoleEdit from "../Edit/RoleEdit";

const NickName = () => {
  const { handleFocus, handleBlur } = useFocus();
  return (
    <>
      <NickNameEdit handleFocus={handleFocus} handleBlur={handleBlur} />의
      <RoleEdit />
    </>
  );
};

export default NickName;
