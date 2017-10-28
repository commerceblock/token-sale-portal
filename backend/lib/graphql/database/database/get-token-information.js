// 1 USD == 16 CBT
const token_unit_per_usd = 16;
const total_sold_tokens = 1000000;

export default async (userId) => {
  return {
    unitPrice: token_unit_per_usd,
    totalTokensSold: total_sold_tokens,
  };
};
