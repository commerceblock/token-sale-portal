
export function computeTokenAmount (usdAmountStr, tokenUnitPriceInCents) {
  // TODO: confirm this logic
  try {
    const usdAmountInCents = parseFloat(usdAmountStr) * 100;
    const result = usdAmountInCents / tokenUnitPriceInCents
    return result.toFixed(3).replace(/\.?0*$/,'');
  } catch (err) {
    console.log(err)
  }
}
