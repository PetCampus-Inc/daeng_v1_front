import { INIT_COUNTER, LIST, type TSortOptionList } from "constants/option";

import { atom } from "recoil";

export const sortOptionAtom = atom<TSortOptionList>({
  key: "sortOption",
  default: LIST.REGISTERED
});

export const ticketCounterAtom = atom<number>({
  key: "ticketCounter",
  default: INIT_COUNTER
});
