export interface ItemMapValue {
  neutralization: string;
  vaccination: string;
}
// FIXME: ticketType 유형 "회차권' | "정기권" 값 수정 필요
export const ITEM_MAP = new Map<string, string | ItemMapValue>([
  ["남", "MALE"],
  ["여", "FEMALE"],
  ["수컷", "MALE"],
  ["암컷", "FEMALE"],
  ["대형견", "BIG"],
  ["중형견", "MEDIUM"],
  ["소형견", "SMALL"],
  ["했어요", { neutralization: "NEUTERED", vaccination: "VACCINATED" }],
  ["안했어요", { neutralization: "NOT_NEUTERED", vaccination: "NOT_VACCINATED" }],
  ["신청", "REQUEST"],
  ["미신청", "NOT_REQUEST"],
  ["편도", "ONE_WAY"],
  ["왕복", "ROUND"],
  ["회차권", "ROUND"],
  ["정기권", "MONTHLY"]
]);
