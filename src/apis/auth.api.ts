import axios from "axios";

export interface AppleLoginInfo {
  code: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  authToken: string;
}

export const postAppleLogin = async ({ req }: { req: AppleLoginInfo }): Promise<LoginData> => {
  const url = `${process.env.REACT_APP_SERVER_DOMAIN}/login/oauth2/code/apple`;
  const { data } = await axios.get(url, {
    params: {
      code: req.code,
      firstName: req.firstName,
      lastName: req.lastName
    }
  });
  return data.data;
};
