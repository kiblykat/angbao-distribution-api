export const allocateRandomAmounts = (
  totAmount: number,
  numUsers: number
): number[] => {
  let remainingAmount = totAmount;
  let allocationArray: number[] = [];

  //grab random amount from total
  //subtract random amount from total
  //push subtracted amount to allocationArray
  //repeat until no money left
  //lastly, addd the final remaining amount from the pool
  for (let i = 0; i < numUsers - 1; i++) {
    let currAmount = Math.random() * remainingAmount;
    allocationArray.push(currAmount);
    remainingAmount -= currAmount;
  }

  allocationArray.push(remainingAmount);

  return allocationArray;
};
