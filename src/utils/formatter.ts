import { ITEM_MAPS, type ItemMaps } from "constants/item";

export const formatDate = (year: string, month: string, day: string) => {
  if (!year || !month || !day) return "";
  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
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

type TItem = Record<string, string>[];
export const extractTicketValues = (items: TItem = []) => {
  return items.map((item) => parseInt(item.value, 10));
};

export const getMapValue = (category: keyof ItemMaps, value: string) => {
  const categoryMap = ITEM_MAPS[category];
  return (categoryMap as any)[value] || value;
};

export const reverseMapValue = <T extends keyof ItemMaps>(category: T, value: string) => {
  const categoryMap = ITEM_MAPS[category] as Record<string, string>;
  const reversedKey = Object.keys(categoryMap).find((key) => categoryMap[key] === value);
  return reversedKey || value;
};
