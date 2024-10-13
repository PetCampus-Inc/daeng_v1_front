import { Box, Flex } from "components/common";
import { LayoutGroup } from "framer-motion";
import { useGetMemberFormList } from "hooks/api/admin/school";
import { useAdminInfo } from "hooks/common/useAdminInfo";

import { MemberWaitingCard } from "./MemberWaitingCard";
import * as S from "./styles";
import TitleWithIcon from "../../TitleWithIcon";

export function MemberWaitingList() {
  const { schoolId } = useAdminInfo();
  const { data } = useGetMemberFormList(schoolId);

  return (
    <Box width="full" mt={67} position="relative">
      <TitleWithIcon title="승인 대기중인 견주들" />
      {data?.length > 0 ? (
        <Flex direction="column" gap={12}>
          <LayoutGroup>
            {data.map((owner) => (
              <MemberWaitingCard key={owner.enrollmentFormId} data={owner} />
            ))}
          </LayoutGroup>
        </Flex>
      ) : (
        <S.Text>승인 대기중인 견주가 없어요</S.Text>
      )}
    </Box>
  );
}
