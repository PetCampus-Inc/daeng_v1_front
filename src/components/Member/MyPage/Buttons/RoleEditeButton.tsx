import { RELATION_DATA, RELATION_DATA_ARR } from "constants/relation";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ThemeConfig } from "styles/ThemeConfig";

import * as S from "./styles";

interface IProps {
  isShowRoles: boolean;
  handleShowRoles: () => void;
  relationData: string;
}

const RoleEditeButton = ({ isShowRoles, handleShowRoles, relationData }: IProps) => {
  const [currentRelation, setCurrentRelation] = useState<string>(RELATION_DATA[relationData]);
  const { register, setValue, watch } = useFormContext();
  const notSelectedRelation = RELATION_DATA_ARR.filter((item) => item.relation !== currentRelation);

  const handleSelectedRelation = (relation: string) => {
    //TODO 버튼 클릭 시 호칭 영역 + 버튼 순서 변경
    setCurrentRelation(RELATION_DATA[relation]);
    setValue("relation", relation);
  };

  useEffect(() => {
    // watch("relation") 데이터가 없을 때 기존 데이터 저장
    if (!watch("relation")) {
      setValue("relation", relationData);
    }
  }, [relationData, setValue, watch]);

  return (
    <>
      <S.RoleEditeButton
        width="100%"
        height="49px"
        textcolor={ThemeConfig.colors.gray_1}
        backcolor={ThemeConfig.colors.white}
        handleClick={handleShowRoles}
      >
        {currentRelation}
      </S.RoleEditeButton>
      {isShowRoles && (
        <>
          {notSelectedRelation.map((item, idx) => (
            <S.RoleSelectButton
              key={idx}
              width="100%"
              height="49px"
              textcolor={ThemeConfig.colors.gray_3}
              backcolor={ThemeConfig.colors.gray_4}
              handleClick={() => handleSelectedRelation(item.type)}
            >
              {item.relation}
            </S.RoleSelectButton>
          ))}
        </>
      )}
    </>
  );
};

export default RoleEditeButton;
