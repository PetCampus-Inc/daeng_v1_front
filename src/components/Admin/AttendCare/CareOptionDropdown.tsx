import { PATH } from "constants/path";

import { useOverlay } from "hooks/common/useOverlay";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import OptionDropdown from "./button/OptionDropdown";
import AgendaSchedulerBottomSheet from "./modal/AgendaSchedulerBottomSheet";

const CareOptionDropdown = () => {
  const navigate = useNavigate();
  const overlay = useOverlay();

  const openSchedulerPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AgendaSchedulerBottomSheet isOpen={isOpen} close={close} />
    ));

  const CARE_OPTIONS: { [key: string]: () => void } = {
    "관리 강아지 삭제": () => navigate(PATH.ADMIN_CARE + "/delete"),
    "알림장 일괄 전송": openSchedulerPopup
  };

  const handleOptionClick = useCallback((option: string) => {
    CARE_OPTIONS[option]?.();
  }, []);

  return (
    <OptionDropdown options={Object.keys(CARE_OPTIONS)} handleOptionClick={handleOptionClick} />
  );
};

export default CareOptionDropdown;
