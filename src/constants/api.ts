export const KAKAO_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API}&redirect_uri=https://localhost:3000/login/oauth2/code/kakao&response_type=code`;

export const GOOGLE_API_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_API}&redirect_uri=https://localhost:3000/login/oauth2/code/google&response_type=code&scope=openid%20profile%20email`;
