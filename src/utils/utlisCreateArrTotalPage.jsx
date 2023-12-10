export const handleCreateArrTotalPage = (totalPage) => {
  let total = [];
  for (let i = 0; i < totalPage; i++) {
    total.push(i + 1);
  }
  return total;
};
