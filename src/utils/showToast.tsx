import CustomToast from "components/common/CustomToast";
import { toast } from "react-toastify";

const showToast = (children: string, position: "adminNav" | "bottom" | "ownerNav" | "gallery") => {
  toast(<CustomToast position={position}>{children}</CustomToast>, {
    toastId: children
  });
};

export default showToast;
