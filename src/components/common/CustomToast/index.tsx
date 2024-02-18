import "react-toastify/dist/ReactToastify.css";
import * as S from "./styles";

export interface CustomToastProps {
  position: "adminNav" | "bottom" | "ownerNav" | "gallery";
  children: string;
}

const CustomToast = ({ position, children }: CustomToastProps) => {
  return <S.Toast $position={position}>{children}</S.Toast>;
};

export default CustomToast;
