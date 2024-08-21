import { Box, Text } from "components/common";
import { useState } from "react";

import SchoolInfoCard from "./SchoolInfoCard";

const SchoolInfo = () => {
  // FIXME: 이전 유치원 내역있을때 내역 리팩토링 필요
  const [isPrevSchool, setIsPrevSchool] = useState(false);

  return (
    <>
      <SchoolInfoCard />
      {isPrevSchool && (
        <>
          <Box mb={12}>
            <Text typo="body2_16_B">이전 유치원 내역</Text>
          </Box>
          <SchoolInfoCard isPrevSchool={isPrevSchool} />
        </>
      )}
    </>
  );
};

export default SchoolInfo;
