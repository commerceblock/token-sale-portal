import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import InvoiceType from '../types/invoice';

function loadInvoice(invoiceId) {
  return Promise.reoslve({
    data: {
      amountOfTokens: payload.data.amount_of_tokens,
      usdAmount: payload.data.usd_amount,
      coin: payload.data.coin,
      spotPrice: payload.data.spot_price,
      paymentAddress: payload.data.payment_address,
    },
  })
}

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    invoice: {
      type: InvoiceType,
      args: {
        invoiceId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, { invoiceId }) {
        return loadInvoice(invoiceId).then((payload) => {
          invoiceId: payload.data.invoice_id,
          amountOfTokens: payload.data.amount_of_tokens,
          usdAmount: payload.data.usd_amount,
          coin: payload.data.coin,
          spotPrice: payload.data.spot_price,
          paymentAddress: payload.data.payment_address,
        });
      },
    }
  }),
});

export default QueryType;
