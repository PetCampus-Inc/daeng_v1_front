import { useLocalStorageValue } from "hooks/common/useLocalStorage";
import { createContext, ReactNode, useState } from "react";
import { AUTH_KEY, getUserInfo, hasToken } from "store/auth";
import { AdminAuthType } from "types/admin/admin.type";

type AuthContextType = {
  isLoggedIn: boolean;
  auth: AdminAuthType | null;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: Props) => {
  // FIXME: access token 사용 시 주석 해제
  // const [isLoggedIn, setLoggedIn] = useState<boolean>(hasToken());
  // const [auth, setAuth] = useState<AdminAuthType | null>(getUserInfo());

  const auth = useLocalStorageValue<AdminAuthType | null>(AUTH_KEY, null);
  const isLoggedIn = !!auth;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        auth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
