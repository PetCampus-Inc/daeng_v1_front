interface IGender {
  [key: string]: string;
}

export const GENDER_DATA: IGender = {
  FEMALE: "여성",
  MALE: "남성"
};

export const GENDER_DATA_ARR: IGender[] = [
  {
    gender: "여성",
    type: "FEMALE"
  },
  {
    gender: "남성",
    type: "MALE"
  }
];
