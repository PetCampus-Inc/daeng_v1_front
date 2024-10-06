import ErrorDogSvg from "assets/images/error-dog.svg";
import ErrorDogWebp from "assets/images/error-dog.webp";
import { Flex, Text, Box, Button } from "components/common";
import { ErrorPageLayout } from "components/Error";
import { useRouteError } from "react-router-dom";
import { Img } from "styles/StyleModule";

import type { ApiErrorResponse } from "types/Response.type";

const LoaderErrorPage = () => {
  const error = useRouteError() as ApiErrorResponse;

  if (process.env.NODE_ENV === "development") console.log("[🚨ERROR]: ", error);

  return (
    <ErrorPageLayout>
      <Flex direction="column" gap="2">
        <Text typo="title1_24_B" color="darkBlack">
          정보를 불러오지 못했어요
        </Text>
        <Text typo="body2_16_R" color="gray_2">
          다시 시도해 주세요
        </Text>
      </Flex>
      <Box width="100%" style={{ marginTop: "7vh" }}>
        <picture style={{ height: "50%", position: "absolute", left: "-6rem" }}>
          <Img as="source" srcSet={ErrorDogWebp} type="image/webp" />
          <Img as="source" srcSet={ErrorDogSvg} type="image/jpeg" />
          <Img src={ErrorDogSvg} alt={"에러 알림 강아지"} />
        </picture>
        <Text typo="body2_16_R" color="gray_2">
          {`${error.code} error`}
        </Text>
      </Box>
    </ErrorPageLayout>
  );
};

export default LoaderErrorPage;
