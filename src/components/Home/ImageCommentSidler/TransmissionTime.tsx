import { getTimeAgo } from "utils/date";

import { TimeText } from "./styles";

const TransmissionTime = ({ time }: { time?: string }) => {
  const timeAgo = time ? getTimeAgo(time) : null;

  return <TimeText>{timeAgo}</TimeText>;
};

export default TransmissionTime;
