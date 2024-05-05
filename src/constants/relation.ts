interface Irelation {
  [key: string]: string;
}

// TODO 언니/누나, 오빠/형의 경우 강아지 성별에 따라 판단되는지 확인 필요
export const RELATION_DATA: Irelation = {
  DAD: "아빠",
  MOM: "엄마",
  SISTER: "언니/누나",
  BROTHER: "오빠/형",
  FRIEND: "친구"
};
