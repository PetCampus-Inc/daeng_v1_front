import { FIELD_ITEMS, type FieldItemKeys, type FieldItemLabels } from "constants/item";

/**
 * 문자열에서 `/n`을 개행 문자로 대체하는 함수
 *
 * @param {string} str - 개행 문자가 포함된 입력 문자열
 * @returns {string} - `/n`이 개행 문자로 대체된 문자열
 */
export const replaceNewline = (str: string) => {
  return str.replace(/\/n/g, "\n");
};

export const formatDate = (year: string, month: string, day: string, type?: string) => {
  if (!year || !month || !day) return "";
  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");

  return type === "dot"
    ? `${year}.${formattedMonth}.${formattedDay}`
    : `${year}-${formattedMonth}-${formattedDay}`;
};

export const extractNumber = (text: string) => {
  if (!text) return 0;
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export const formatPhoneNumber = (value: string): string => {
  if (value.length > 13) {
    value = value.substring(0, 13);
  }
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/(-{1,2})$/g, "");
};

export const formatSchoolNumber = (value: string) => {
  value = value.replace(/\D/g, "");

  if (value.length > 11) {
    return value.slice(0, 11);
  }

  if (value.length > 10) {
    // 13자리 숫자일 때 (000-0000-0000 형식)
    return value.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3").replace(/(-)+$/, "");
  } else if (value.length > 9) {
    // 10자리 숫자일 때 (000-000-0000 형식)
    return value.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3").replace(/(-)+$/, "");
  } else {
    // 9자리 이하일 때 (00-000-0000 형식)
    return value.replace(/^(\d{2})(\d{3})(\d{4})$/, "$1-$2-$3").replace(/(-)+$/, "");
  }
};

export const formatBusinessNumber = (value: string) => {
  value = value.replace(/\D/g, "");
  if (value.length > 10) {
    value = value.substring(0, 10);
  }
  return value.replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/, "$1-$2-$3").replace(/(-)+$/, "");
};

/**
 * 지정된 카테고리와 값에 해당하는 레이블을 반환합니다.
 *
 * @param {K} category - 값을 조회할 카테고리의 키입니다.
 * @param {V} value - 카테고리 내에서 조회할 값의 키입니다.
 * @returns {FieldItemLabels[K][V]} - 조회된 레이블 문자열을 반환합니다. 카테고리와 값에 해당하는 레이블이 존재할 경우 해당 레이블을 반환하고, 그렇지 않으면 입력된 값을 그대로 반환합니다.
 *
 * @example
 * // '남'을 반환합니다.
 * getLabelForValue('memberGender', 'MALE');
 */

export const getLabelForValue = <K extends keyof FieldItemLabels, V extends FieldItemKeys<K>>(
  category: K,
  value: V
): FieldItemLabels[K][V] => {
  return FIELD_ITEMS[category][value];
};

/**
 * 주어진 레이블에 해당하는 키를 찾아 반환합니다.
 *
 * @param {K} category - 키를 찾을 카테고리의 키입니다.
 * @param {string} label - 찾고자 하는 레이블의 문자열입니다.
 * @returns {keyof FieldItemLabels[K] | undefined} - 찾은 키를 반환합니다. 해당 레이블을 가진 키가 있으면 그 키를, 없으면 undefined를 반환합니다.
 *
 * @example
 * // 'MALE'을 반환합니다.
 * getKeyForLabel('memberGender', '남');
 */
export const getKeyForLabel = <K extends keyof FieldItemLabels>(
  category: K,
  label: string
): keyof FieldItemLabels[K] | undefined => {
  const entries = Object.entries(FIELD_ITEMS[category]) as [keyof FieldItemLabels[K], string][];
  const entry = entries.find(([, v]) => v === label);
  return entry ? entry[0] : undefined;
};
