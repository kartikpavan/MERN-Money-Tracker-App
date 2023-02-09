export const formatDate = (dateString: string): string => {
   const res = dateString.split("-");
   const [year, month, date] = res;
   return `${year}-${month}-${date.slice(0, 2)}`;
};
