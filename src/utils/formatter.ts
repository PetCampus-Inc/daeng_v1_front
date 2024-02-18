import { ITEM_MAP, ItemMapValue } from "constants/item";

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
    .replace(/(\-{1,2})$/g, "");
};

type TItem = Record<string, string>[];
export const extractTicketValues = (items: TItem) => {
  return items.map((item) => parseInt(item.value, 10));
};

export const getMapValue = (key: string): string | ItemMapValue => {
  if (ITEM_MAP.has(key)) {
    return ITEM_MAP.get(key) as string | ItemMapValue;
  }
  return "";
};
