import { FIELD } from "./field";

import type { NonEmptyArray } from "types/helper.type";
import type { PickDropRequestType, PickDropStateType } from "types/member/enrollment.types";

export const MEMBER_ENROLL_STEP = [
  {
    title: "견주 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "견주 정보",
    isVisible: () => true
  },
  {
    title: "강아지 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "강아지 정보",
    isVisible: () => true
  },
  {
    title: "이용권 종류를 선택해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "이용권",
    isVisible: () => true
  },
  {
    title: "유의사항을 확인해주세요",
    subtitle: "필수입력에 동의하지 않으면 가입이 어려울 수 있어요",
    indicator: "유의사항",
    isVisible: () => true
  },
  {
    title: "픽드랍 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "픽드랍",
    isVisible: (status: PickDropStateType) => status === "RUNNING"
  }
];

export const MEMBER_DOG_ADD_ENROLL_STEP = [
  {
    title: "강아지 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "강아지 정보",
    isVisible: () => true
  },
  {
    title: "이용권 종류를 선택해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "이용권",
    isVisible: () => true
  },
  {
    title: "유의사항을 확인해주세요",
    subtitle: "필수입력에 동의하지 않으면 가입이 어려울 수 있어요",
    indicator: "유의사항",
    isVisible: () => true
  },
  {
    title: "픽드랍 정보를 입력해 주세요",
    subtitle: "아래 내용을 빠짐없이 입력해 주세요",
    indicator: "픽드랍",
    isVisible: (status: PickDropStateType) => status === "RUNNING"
  }
];

export const MEMBER_DOG_INFO_ENROLL_STEP = [
  {
    title: "견주에게 받을 정보들이에요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "견주 정보",
    isVisible: () => true
  },
  {
    title: "반려견에 대해 받을 정보들이에요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "반려견 정보",
    isVisible: () => true
  },
  {
    title: "유치원 이용 형태를 선택해 주세요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "이용권",
    isVisible: () => true
  },
  {
    title: "견주에게 안내할 유의사항들이에요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "유의사항",
    isVisible: () => true
  },
  {
    title: "픽드랍 정보를 입력해 주세요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "픽드랍",
    isVisible: (status: PickDropRequestType) => status === "REQUEST"
  }
];

export const ADMIN_CREATE_FORM_STEP = [
  {
    title: "견주에게 받을 정보들이에요",
    subtitle: "필수입력과 선택입력 둘 중 하나를 선택해 주세요",
    indicator: "견주 정보",
    isVisible: () => true
  },
  {
    title: "강아지에 대해 받을 정보들이에요",
    subtitle: "필수입력과 선택입력 둘 중 하나를 선택해 주세요",
    indicator: "강아지 정보",
    isVisible: () => true
  },
  {
    title: "이용권 종류를 선택해 주세요",
    subtitle: "먼저 이용권 종류를 고른 후 알맞은 내용을 추가해 주세요",
    indicator: "이용권",
    isVisible: () => true
  },
  {
    title: "견주에게 안내할 유의사항들이에요",
    subtitle: "견주에게 안내하고 동의 받을 내용들을 작성해 주세요",
    indicator: "유의사항",
    isVisible: () => true
  },
  {
    title: "픽드랍 정보를 입력해 주세요",
    subtitle: "픽드랍 운영시 픽드랍 안내사항을 입력해 주세요",
    indicator: "픽드랍",
    isVisible: () => true
  }
] as const;

export const ADMIN_READ_FORM_STEP = [
  {
    title: "견주에게 받을 정보들이에요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "견주 정보",
    isVisible: () => true
  },
  {
    title: "강아지에 대해 받을 정보들이에요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "강아지 정보",
    isVisible: () => true
  },
  {
    title: "이용권 종류를 선택해 주세요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "이용권",
    isVisible: () => true
  },
  {
    title: "견주에게 안내할 유의사항들이에요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "유의사항",
    isVisible: () => true
  },
  {
    title: "픽드랍 정보를 입력해 주세요",
    subtitle: "견주가 볼 가입신청서 화면이에요",
    indicator: "픽드랍",
    isVisible: (pickDropState: string) => pickDropState === "운영"
  }
] as const;

const STEP_KEYS = ["견주정보", "강아지정보", "이용권", "유의사항", "픽드랍"] as const;
type STEP_KEYS = (typeof STEP_KEYS)[number];

const stepFields: { [key in STEP_KEYS]: string[] } = {
  견주정보: [
    FIELD.MEMBER_NAME,
    FIELD.MEMBER_GENDER,
    FIELD.MEMBER_ADDRESS,
    FIELD.MEMBER_ADDRESS_DETAIL,
    FIELD.MEMBER_PHONE,
    FIELD.EMERGENCY_NUMBER
  ],
  강아지정보: [
    FIELD.DOG_NAME,
    FIELD.DOG_GENDER,
    FIELD.DOG_SIZE,
    FIELD.DOG_BREED,
    FIELD.NEW_BREED,
    FIELD.DOG_BIRTHDAY,
    FIELD.NEUTRALIZATION,
    FIELD.VACCINATION,
    FIELD.VACCINATION_URL,
    FIELD.ALLERGY_DISEASE
  ],
  이용권: [
    FIELD.PRICE_INFO,
    FIELD.TICKET_TYPE,
    FIELD.ROUND_TICKET_NUMBER,
    FIELD.MONTHLY_TICKET_NUMBER,
    FIELD.OPEN_DAYS,
    FIELD.TICKET_INFO
  ],
  유의사항: [FIELD.LIMITS_INFO, FIELD.ACCIDENT_INFO, FIELD.ABANDONMENT_INFO],
  픽드랍: [
    FIELD.PICKDROP_STATE,
    FIELD.PICKDROP_NOTICE,
    FIELD.PICKDROP_REQUEST,
    FIELD.PICKDROP_TYPE,
    FIELD.PICKDROP_MEMO,
    FIELD.PICKDROP_INFO_TERM
  ]
};

interface ConfigInterface {
  excludeSteps?: NonEmptyArray<STEP_KEYS> | null;
  field: string;
  enable?: boolean;
}

/**
 * 주어진 필드에 대해 지정된 스텝의 활성화 또는 비활성화 상태를 바탕으로 해당 필드의 스텝 인덱스를 가져옵니다.
 * 기본적으로 모든 스텝은 활성화되며, `excludeSteps`를 통해 특정 스텝들만 비활성화할 수 있습니다.
 *
 * @param {Object} params - 스텝 결정을 위한 설정 파라미터
 * @param {NonEmptyMatrix<STEP_KEYS> | null} [params.excludeSteps] - 활성화 상태를 변경할 스텝들의 배열. 이 배열에 있는 스텝들은 `enable`의 반대 상태로 설정됩니다.
 * @param {string} params.field - 스텝 번호를 찾고자 하는 필드 이름
 * @param {boolean} [params.enable=true] - 스텝들을 활성화할지 여부를 결정합니다. 기본값은 true로, 모든 스텝을 활성화합니다. `excludeSteps`가 주어지면, 해당 스텝들만 비활성화됩니다.
 * @returns {number | undefined} - 필드가 속한 스텝의 인덱스를 반환합니다. 해당 필드가 어느 스텝에도 속하지 않거나 지정된 스텝이 비활성화된 경우 undefined를 반환합니다.
 */
export function getFieldStep({
  excludeSteps = null,
  field,
  enable = true
}: ConfigInterface): number | undefined {
  const stepsActive: { [key in STEP_KEYS]: boolean } = {
    견주정보: enable,
    강아지정보: enable,
    이용권: enable,
    유의사항: enable,
    픽드랍: enable
  };

  // excludeSteps가 주어지면, 해당 스텝만 반대 상태로 설정
  if (excludeSteps) {
    excludeSteps.forEach((step) => {
      stepsActive[step] = !enable;
    });
  }

  // 필드가 속한 스텝 번호 찾기
  for (const stepName of STEP_KEYS) {
    if (stepsActive[stepName] && stepFields[stepName].includes(field)) {
      return STEP_KEYS.indexOf(stepName as STEP_KEYS); // 스텝 번호 반환
    }
  }

  return undefined; // 필드가 어느 스텝에도 속하지 않거나 해당 스텝이 비활성화된 경우
}

export const ADMIN_DOG_DETAIL_INFO_STEP = [
  "강아지 정보",
  "등원 기록",
  "이용권",
  "유의사항"
] as const;

export const MEMBER_DOG_INFO_STEP = ["강아지 정보", "유치원 정보", "출결 및 이용권"] as const;
