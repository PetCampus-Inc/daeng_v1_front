// MEMO: 영어인 데이터를 한국어를 반환하기 위해 type 설정
interface IEnToKr {
  [key: string]: string;
}

export const ITEM_ENGLISH_TO_KOREAN: IEnToKr = {
  SMALL: "소형견",
  MEDIUM: "중형견",
  BIG: "대형견",
  MALE: "수컷",
  FEMALE: "암컷",
  NEUTERED: "했어요", // neutralization
  NOT_NEUTERED: "안했어요", // neutralization
  VACCINATED: "했어요", // vaccination
  NOT_VACCINATED: "안했어요", // vaccination
  ROUND: "회차권",
  MONTHLY: "정기권"
};
