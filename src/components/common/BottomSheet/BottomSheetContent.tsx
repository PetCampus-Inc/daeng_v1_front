import type { PropsWithChildren } from "react";

import { Content } from "./styles";

const BottomSheetContent = ({ children }: PropsWithChildren) => {
  return <Content>{children}</Content>;
};

export default BottomSheetContent;
