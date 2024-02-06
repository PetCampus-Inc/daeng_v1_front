export const textMapping = new Map<string, string | { [key: string]: string }>([
  ["남", "MALE"],
  ["여", "FEMALE"],
  ["수컷", "MALE"],
  ["암컷", "FEMALE"],
  ["대형견", "BIG"],
  ["중형견", "MEDIUM"],
  ["소형견", "SMALL"],
  ["했어요", { neutralization: "NEUTERED", vaccination: "VACCINATED" }],
  ["안했어요", { neutralization: "NEUTERED", vaccination: "VACCINATED" }],
  ["신청", "REQUEST"],
  ["미신청", "NOT_REQUEST"],
  ["편도", "ONE_WAY"],
  ["왕복", "ROUND"]
]);
