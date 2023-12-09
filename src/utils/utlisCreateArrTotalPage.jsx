export const handleCreateArrTotalPage = (totalpage) => {
  let total = [];
  for (let i = 0; i < totalpage; i++) {
    total.push(i + 1);
  }
  return total;
};
