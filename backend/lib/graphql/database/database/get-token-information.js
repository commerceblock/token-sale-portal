
// 1 USD == 16 CBT
const token_unit_per_usd = 16

export default async (userId) => {
  return {
    unitPrice: token_unit_per_usd,
  };
};
