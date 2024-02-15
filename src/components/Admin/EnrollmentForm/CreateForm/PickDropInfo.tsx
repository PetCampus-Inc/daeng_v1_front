import type { IPickDropInfo } from "types/School.type";

interface PickDropInfoProps {
  info?: IPickDropInfo;
  requiredItems?: Map<number, boolean>;
}
const PickDropInfo = ({ info, requiredItems }: PickDropInfoProps) => {
  return <div>PickDropInfo</div>;
};

export default PickDropInfo;
