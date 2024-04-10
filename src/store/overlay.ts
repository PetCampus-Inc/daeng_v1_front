import { LIST, type TSortOptionList } from "constants/option";

import { atom } from "recoil";

export const sortOptionAtom = atom<TSortOptionList>({
  key: "sortOptionAtom",
  default: LIST.REGISTERED
});
