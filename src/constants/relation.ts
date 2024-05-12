interface IRelation {
  [key: string]: string;
}

// TODO 언니/누나, 오빠/형의 경우 강아지 성별에 따라 판단되는지 확인 필요
export const RELATION_DATA: IRelation = {
  MOTHER: "엄마",
  FATHER: "아빠",
  SISTER: "언니/누나",
  BROTHER: "오빠/형",
  FRIEND: "친구"
};

export const RELATION_DATA_ARR: IRelation[] = [
  {
    relation: "엄마",
    type: "MOTHER"
  },
  {
    relation: "아빠",
    type: "FATHER"
  },
  {
    relation: "언니/누나",
    type: "SISTER"
  },
  {
    relation: "오빠/형",
    type: "BROTHER"
  },
  {
    relation: "친구",
    type: "FRIEND"
  }
];
