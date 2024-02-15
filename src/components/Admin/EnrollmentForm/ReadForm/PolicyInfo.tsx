import type { IPolicyInfo } from "types/School.type";

interface PolicyInfoProps {
  info?: IPolicyInfo;
  requiredItems?: Map<number, boolean>;
}

const PolicyInfo = ({ info, requiredItems }: PolicyInfoProps) => {
  return <div>PolicyInfo</div>;
};

export default PolicyInfo;
