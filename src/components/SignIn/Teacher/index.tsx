import { memo, Dispatch, SetStateAction } from "react";
import Step1 from "../Step/step1";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const Teacher = ({ searchText, setSearchText }: Props) => {
  return <Step1 searchText={searchText} setSearchText={setSearchText} />;
};

export default memo(Teacher);
