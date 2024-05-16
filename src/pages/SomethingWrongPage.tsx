import ErrorDogSvg from "assets/images/error-dog.svg";
import ErrorDogWebp from "assets/images/error-dog.webp";
import { Box, Flex, Text } from "components/common";
import { ErrorPageLayout } from "components/Error";
import { FallbackProps } from "react-error-boundary";
import { ConfirmButton, Img } from "styles/StyleModule";

const SomethingWrongPage = ({ resetErrorBoundary }: FallbackProps) => {
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
      </Box>
      <Box position="fixed" style={{ bottom: "5vh", left: "1rem", right: "1rem", width: "auto" }}>
        <ConfirmButton type="button" onClick={resetErrorBoundary}>
          다시 불러오기
        </ConfirmButton>
      </Box>
    </ErrorPageLayout>
  );
};

export default SomethingWrongPage;
