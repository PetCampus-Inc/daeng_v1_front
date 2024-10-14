import { routes } from "constants/path";

import ApplicationBrownIcon from "assets/svg/application-brown-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import YellowApplication from "assets/svg/yellow-application";
import { Box, Flex, Text } from "components/common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertDateArrayToString } from "utils/date";

import * as S from "./styles";

import type { SchoolFormList } from "types/admin/enrollment.types";

interface SchoolFormCardProps {
  isUsed?: boolean;
  data: SchoolFormList;
  isEditable?: boolean;
  setSelectedList?: React.Dispatch<React.SetStateAction<number[]>>;
}

export function SchoolFormCard({
  isUsed = false,
  data,
  isEditable = false,
  setSelectedList
}: SchoolFormCardProps) {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(false);
  }, [isEditable]);

  const handleTouch = () => {
    if (isEditable && setSelectedList) {
      setIsSelected(!isSelected);
      setSelectedList((prev) =>
        isSelected ? prev.filter((id) => id !== data.schoolFormId) : [...prev, data.schoolFormId]
      );
    } else {
      navigate(routes.admin.school.enrollment.ownerForms.dynamic(data.schoolFormId));
    }
  };

  return (
    <S.ItemCard onClick={() => handleTouch()} $isUsed={isUsed} $isSelected={isSelected}>
      <Flex align="center">
        <S.Image>{isUsed ? <YellowApplication /> : <ApplicationBrownIcon />}</S.Image>
        <Box display="flex" direction="column" textAlign="left" ml={16} gap={2}>
          <Text as="p" typo="body2_16_B" color="gray_1" whiteSpace="nowrap">
            {data.schoolFormName}
          </Text>
          <Text as="p" typo="label2_14_R" color="gray_2" whiteSpace="nowrap">
            {isUsed ? "현재 사용중인 신청서에요" : "이전에 작성된 신청서에요"}
          </Text>
          <Text typo="caption1_12_R" color="gray_3" whiteSpace="nowrap">
            {convertDateArrayToString(data.createdDate)} 작성됨
          </Text>
        </Box>
      </Flex>
      <ArrowRightIcon size={16} />
    </S.ItemCard>
  );
}
