import customAxios from "libs/CustomAxios";

export const handleKaKaoLogin = async (code: string) => {
  const url: string = `auth/kakao/callback`;
  const { data } = await customAxios.post(url, {
    code: code
  });
  return data.data;
};
