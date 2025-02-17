export const buildOrderByObject = (order: string, asc: string) => {
  const orders = order.split('.');
  const orderBy = {};
  let currentLevel = orderBy;

  for (let i = 0; i < orders.length; i++) {
    const key = orders[i];
    if (i === orders.length - 1) {
      currentLevel[key] = asc;
    } else {
      currentLevel[key] = {};
      currentLevel = currentLevel[key];
    }
  }

  return orderBy;
};
