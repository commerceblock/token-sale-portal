
const token_price_in_usd_cents = 1000
const bouns_precentage = 25.0;

export default async (userId) => {
  return {
    unitPrice: token_price_in_usd_cents,
    bounsPrecentage: bouns_precentage
  };
};
