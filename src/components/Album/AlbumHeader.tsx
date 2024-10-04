import { routes } from "constants/path";

import CalendarIcon from "assets/svg/calendar";
import { Box, Flex, Text } from "components/common";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface AlbumHeaderProps {
  dogId: number;
  dogName: string | null;
}

const AlbumHeader = ({ dogId, dogName }: AlbumHeaderProps) => {
  const navigation = useNavigate();
  return (
    <Box display="flex" justify="space-between" pb={8} borderBottom={1} borderColor="gray_5">
      <Flex direction="column" gap={4}>
        <Text typo="title2_20_B" color="gray_1">
          사진 앨범
        </Text>
        <Text typo="body2_16_R" color="gray_2">
          {dogName ?? ""} 사진을 모아서 볼 수 있어요
        </Text>
      </Flex>
      <LinkButton
        onClick={() => navigation(routes.member.album.date.dynamic(dogId), { state: { dogName } })}
      >
        <CalendarIcon w="40" h="40" rx="20" />
      </LinkButton>
    </Box>
  );
};

export default AlbumHeader;

const LinkButton = styled.button`
  display: flex;
  height: fit-content;
`;
