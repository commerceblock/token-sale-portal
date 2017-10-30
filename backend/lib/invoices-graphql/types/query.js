import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import InvoiceType from '../types/invoice';
import { loadInvoice } from '../../events-store';
import { isEmpty, first } from 'lodash';

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
        return loadInvoice(invoiceId)
          .then((events) => {
            if (events !== null && !isEmpty(events)) {
              const payload = first(events);
              return {
                invoiceId: payload.invoice_id,
                amountOfTokens: payload.data.amount_of_tokens,
                usdAmount: payload.data.usd_amount,
                ethereumReturnAddress: payload.data.ethereum_return_address,
                coin: payload.data.coin,
                spotPrice: payload.data.spot_price,
                paymentAddress: payload.data.payment_address,
              };
            }
            return null;
        });
      },
    }
  }),
});

export default QueryType;
