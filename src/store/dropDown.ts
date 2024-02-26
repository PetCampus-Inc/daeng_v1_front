import { atom } from "recoil";

export const dropdownAtom = atom<number | null>({
  key: "dropdownAtom",
  default: null
});
