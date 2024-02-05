export const getCaptions = (currentStep: number, stepsLength: number) => {
  return currentStep === stepsLength - 1
    ? [
        "정보를 모두 입력해야 가입신청이 가능합니다.",
        "제출하신 후에는 수정이 불가하니, 꼼꼼히 확인해 주세요."
      ]
    : ["정보를 모두 입력해야 가입신청이 가능합니다."];
};
