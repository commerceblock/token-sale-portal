import 'whatwg-fetch';
import httpStatus from 'http-status-codes';
import { isEmpty, first, filter } from 'lodash';
import { btcAPI, btcUrl, ethAPI, ethUrl } from './endpoints'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

export function computeTokenAmount(usdAmountStr, tokenUnitsPerUSD) {
  try {
    const usdAmount = parseFloat(usdAmountStr);
    return usdAmount * tokenUnitsPerUSD;
  } catch (err) {
    console.log(err)
  }
}

export function computeCryptoAmount(usdAmountStr, spotPriceInCents) {
  try {
    const usdAmountInCents = parseFloat(usdAmountStr) * 100;
    const result = usdAmountInCents / spotPriceInCents;
    return result.toFixed(3).replace(/\.?0*$/,'');
  } catch (err) {
    console.log(err)
  }
}

export function fetchTxid(context) {
  if (context.paymentAddress) {
    const result = isBTC(context.coin) ? fetchBTCTxid(context) : fetchETHTxid(context);
    result.catch(err => {
      console.log(err);
    });
  }
}

export function fetchBTCTxid(context) {
  return fetch(`${btcAPI(context.coin)}/v1/blockchain/address/${context.paymentAddress}`, {
    headers: DEFAULT_HEADERS
  })
  .then(result => {
    if (result.status === httpStatus.OK) {
      return result.json();
    }
  })
  .then(data => {
    if (data && data.address && !isEmpty(data.address.transactions)) {
      const tx = first(data.address.transactions)
      context.txid = tx.txid;
      context.transactionLink = `${btcUrl(context.coin)}/tx/${context.txid}`
      context.numberOfConfirmations = tx.confirmations || 0;
    }
  });
}

export function fetchConfirmations(context) {
  if (isBTC(context.coin) && context.txid) {
    fetch(`${btcAPI(context.coin)}/v1/blockchain/tx/${context.txid}`, {
      headers: DEFAULT_HEADERS
    })
    .then(result => {
      if (result.status === httpStatus.OK) {
        return result.json();
      }
    })
    .then(data => {
      if (data && data.transaction) {
        context.numberOfConfirmations = data.transaction.confirmations || 0;
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export function fetchETHTxid(context) {
  return fetch(`${ethAPI(context.coin)}&address=${context.paymentAddress}`)
  .then(result => {
    if (result.status === httpStatus.OK) {
      return result.json();
    }
  })
  .then(data => {
    if (data && data.result && !isEmpty(data.result)) {
      const transactions = data.result
      const validTransactions = filter(transactions, (t) => {
        return t.isError === '0' && t.value > 0
      })
      const firstValid = first(validTransactions);
      if (firstValid) {
        context.txid = firstValid.hash;
        context.transactionLink = `${ethUrl(context.coin)}/tx/${context.txid}`;
        context.numberOfConfirmations = firstValid.confirmations || 0;
        context.transactionError = null
      } else {
        // invalid
        const firstInvalid = first(transactions);
        context.txid = firstInvalid.hash;
        context.transactionLink = `${ethUrl(context.coin)}/tx/${context.txid}`;
        context.transactionError = 'Transaction failed, send a new one.'
      }
    }
  });
}

export function requiredMinConfirmations(coin) {
  if (isBTC(coin)) {
    return 6;
  } else if (isETH(coin)) {
    return 12;
  }
  return null;
}

export function isBTC(coin) {
  return coin === 'BTC' || coin === 'tBTC';
}

export function isETH(coin) {
  return coin === 'ETH' || coin === 'tETH';
}
