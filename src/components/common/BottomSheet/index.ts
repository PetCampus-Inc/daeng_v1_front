import { RootBottomSheet } from "./BottomSheet";
import { BottomSheetButton } from "./BottomSheetButton";
import { BottomSheetContent } from "./BottomSheetContent";
import { BottomSheetControl } from "./BottomSheetControl";
import { BottomSheetSubTitle, BottomSheetTitle } from "./BottomSheetTitle";

const BottomSheetComponents = {
  Title: BottomSheetTitle,
  Subtitle: BottomSheetSubTitle,
  Content: BottomSheetContent,
  Button: BottomSheetButton,
  Control: BottomSheetControl
};

export const BottomSheet = Object.assign(RootBottomSheet, BottomSheetComponents);

export * from "./AlertBottomSheet";
export * from "./CallBottomSheet";
export * from "./InfoBottomSheet";

export type { BottomSheetProps } from "./BottomSheet";
