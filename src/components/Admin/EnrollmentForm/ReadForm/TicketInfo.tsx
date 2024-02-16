import type { ITicketInfo } from "types/School.type";
interface TicketInfoProps {
  info?: ITicketInfo;
  requiredItems?: Map<number, boolean>;
}

const TicketInfo = ({ info, requiredItems }: TicketInfoProps) => {
  return <div>TicketInfo</div>;
};

export default TicketInfo;
