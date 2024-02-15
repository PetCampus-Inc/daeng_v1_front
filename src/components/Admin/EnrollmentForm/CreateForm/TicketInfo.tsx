import { useFormContext } from "react-hook-form";

import type { ITicketInfo } from "types/School.type";

interface TicketInfoProps {
  info?: ITicketInfo;
  requiredItems?: Map<number, boolean>;
}

const TicketInfo = ({ info, requiredItems }: TicketInfoProps) => {
  const { watch, control, setValue } = useFormContext();

  return <div>TicketInfo</div>;
};

export default TicketInfo;
