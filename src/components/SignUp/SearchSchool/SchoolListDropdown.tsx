import { Flex, Box, Text } from "components/common";
import styled from "styled-components";

import type { ISchoolInfo } from "types/admin/school.types";

interface SchoolListDropdownProps {
  list: ISchoolInfo[];
  onSelect: (id: number, name: string) => void;
}

const SchoolListDropdown = ({ list, onSelect }: SchoolListDropdownProps) => {
  if (list.length === 0) {
    return (
      <Box borderRadius="rectangle" border={1} borderColor="gray_4" bg="white">
        <Flex direction="column" gap={4} paddingInline={16} paddingBlock={40}>
          <Text as="p" typo="body2_16_R" color="gray_1" textAlign="center">
            검색 결과가 없어요
          </Text>
          <Text as="p" typo="caption1_12_R" color="gray_3" textAlign="center">
            다시 입력해 주세요
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box as="ul" borderRadius="rectangle" border={1} borderColor="gray_4" bg="white">
      {list.map((item) => (
        <ListItem key={item.schoolId} onClick={() => onSelect(item.schoolId, item.name)}>
          <Text typo="body2_16_R" color="gray_1">
            {item.name}
          </Text>
          <Text typo="caption1_12_R" color="gray_3">
            {item.address}
          </Text>
        </ListItem>
      ))}
    </Box>
  );
};

export default SchoolListDropdown;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding-block: 10px;
  padding-inline: 18px;

  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => theme.colors.gray_5};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_4};
  }

  transition: background-color 0.2s ease-out;
  cursor: pointer;
`;
