export interface CalendarProps {
  /**
   * 캘린더 타일에 표시될 날짜
   * @type {Date[] | undefined}
   */
  tileDate?: Date[];

  /**
   * 캘린더 활성 범위의 최소 날짜
   * @type {Date}
   */
  minDate: Date;
}

export type CalendarVariants = "admin" | "member";
