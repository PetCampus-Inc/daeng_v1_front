import type { IMemberDto } from "types/School.type";

interface MemberInfoProps {
  info: IMemberDto;
  requiredItems: Map<number, boolean>;
}

const MemberInfo = ({ info, requiredItems }: MemberInfoProps) => {
  return <div>{info.memberName}</div>;
};

export default MemberInfo;
