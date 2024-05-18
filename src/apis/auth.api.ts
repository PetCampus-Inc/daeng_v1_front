import customAxios from "libs/CustomAxios";

export const postAppleLogin = async (code: string) => {
  const url = `member/login/code`;
  const { data } = await customAxios.post(url, {
    code: code
  });
  return data.data;
};
