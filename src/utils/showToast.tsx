import CustomToast from "components/common/CustomToast";
import { toast } from "react-toastify";

const showToast = (
  children: string,
  position: "adminNav" | "bottom" | "ownerNav" | "gallery",
  autoClose?: number
) => {
  toast(<CustomToast position={position}>{children}</CustomToast>, {
    toastId: children,
    autoClose: autoClose ?? 2000
  });
};

export default showToast;
