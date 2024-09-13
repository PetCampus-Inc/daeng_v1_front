import { ACCESS_TOKEN_KEY } from "constants/storage";

import { useLocalStorage } from "hooks/common/useLocalStorage";
import { useMemo } from "react";
import { Role } from "types/common/role.types";
import { extractRoleByToken } from "utils/token";

export const useTokenHandler = () => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(ACCESS_TOKEN_KEY, null);

  const role = useMemo(() => {
    if (!accessToken) return Role.ROLE_GUEST;
    const role = extractRoleByToken(accessToken);
    return role ? role : Role.ROLE_GUEST;
  }, [accessToken]);

  return {
    role,
    accessToken,
    setAccessToken
  };
};
