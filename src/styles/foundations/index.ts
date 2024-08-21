import { breakPoints } from "./breakPoints";
import { colors } from "./colors";
import { shadows } from "./shadows";
import { transition } from "./transition";
import { typo } from "./typography";
import { zIndex } from "./zIndex";

export const foundations = {
  zIndex,
  colors,
  typo,
  shadows,
  transition,
  breakPoints
} as const;
