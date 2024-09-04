import { ACCESS_TOKEN_KEY } from "constants/storage";

import { useLocalStorage } from "hooks/common/useLocalStorage";
import { useMemo } from "react";
import { User, Role } from "types/common/role.types";
import { extractRoleByToken, extractUserByToken } from "utils/token";

export const useTokenHandler = () => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(ACCESS_TOKEN_KEY, null);

  const role = useMemo(() => {
    if (!accessToken) return Role.ROLE_GUEST;
    const role = extractRoleByToken(accessToken);
    return role ? role : Role.ROLE_GUEST;
  }, [accessToken]);

  const user = useMemo(() => {
    if (!accessToken) return User.GUEST;
    const user = extractUserByToken(accessToken);
    return user ? user : User.GUEST;
  }, [accessToken]);

  return {
    role,
    user,
    accessToken,
    setAccessToken
  };
};
