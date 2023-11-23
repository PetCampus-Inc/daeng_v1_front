const useFormatDate = (monthlyTicket: number[]) => {
  if (monthlyTicket !== null) {
    const [year, month, day] = monthlyTicket;
    const formattedDate = `${String(year).slice(-2)}.${String(month).padStart(
      2,
      "0"
    )}.${String(day).padStart(2, "0")}`;
    return formattedDate;
  }
};

export default useFormatDate;
