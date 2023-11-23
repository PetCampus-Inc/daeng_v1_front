import { useEffect, useState } from "react";

const GetExpirationDate = (expirationDate: number[]) => {
  const [isExpired, setIsExpired] = useState(false);
  const [isBeforeExpiry, setIsBeforeExpiry] = useState(false);

  useEffect(() => {
    if (expirationDate !== null) {
      const [year, month, day] = expirationDate;
      const expiration = new Date(year, month - 1, day);
      const currentDate = new Date();

      if (currentDate > expiration) {
        setIsExpired(true);
      } else {
        const BeforeExpiration = new Date(expiration);
        BeforeExpiration.setDate(expiration.getDate() - 7);
        if (currentDate >= BeforeExpiration) {
          setIsBeforeExpiry(true);
        }
      }
    }
  }, [expirationDate]);
  return { isBeforeExpiry, isExpired };
};

export default GetExpirationDate;
