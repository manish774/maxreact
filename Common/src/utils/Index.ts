export const selectSubarray = (
  array: any[],
  startIndex: number,
  endIndex: number
) => {
  const subarray = array.slice(startIndex, endIndex + 1);

  return subarray;
};
export const ASC = "asc";
export const DESC = "desc";

export const sortRecords = (records: any[], key: string, order: string) => {
  const sortedArray = [...records];

  sortedArray.sort((a, b) => {
    const valueA = String(a[key]).toLowerCase();
    const valueB = String(b[key]).toLowerCase();

    if (order === ASC) {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    } else if (order === DESC) {
      if (valueA > valueB) return -1;
      if (valueA < valueB) return 1;
      return 0;
    }

    return 0;
  });

  return sortedArray;
};
