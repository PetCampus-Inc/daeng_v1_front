export interface ISchoolInfo {
  schoolId: number;
  name: string;
  phoneNumber: string;
  address: string;
}

interface Breed {
  breedId: number;
  breedName: string;
}
export interface IBreedInfo {
  data: Breed[];
}
