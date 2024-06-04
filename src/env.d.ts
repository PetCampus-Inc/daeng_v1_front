/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SERVER_HOST: string;
    REACT_APP_SERVER_DOMAIN: string;
    REACT_APP_BUSINESS_API_KEY: string;

    REACT_APP_AWS_BUCKET: string;
    REACT_APP_AWS_REGION: string;
    REACT_APP_AWS_ACCESS_KEY_ID: string;
    REACT_APP_AWS_SECRET_ACCESS_KEY: string;

    REACT_APP_SENTRY_DSN: string;
    REACT_APP_SENTRY_BASE_URL: string;
  }
}
