<template>
  <div class="content">
    <div class="row">
      Invoice ID: {{ invoiceId }}
    </div>
    <div class="row">
      Amount of tokens: {{ this.invoice.amountOfTokens }}
    </div>
    <div class="row">
      USD Amount: {{ this.invoice.usdAmount }}
    </div>
    <div class="row">
      Coin: {{ this.invoice.coin }}
    </div>
    <div class="row">
      Spot price: {{ this.invoice.spotPrice }}
    </div>
    <div class="row">
      Payment Address: {{ this.invoice.paymentAddress }}
    </div>
    <div class="row">
      Ethereum Return Address: {{ this.invoice.ethereumReturnAddress }}
    </div>
  </div>
</template>


<script>
import gql from 'graphql-tag'
import { isEmpty } from 'lodash'


export default {
  props: ['invoiceId'],
  apollo: {
    invoice: {
      query: function () {
        return gql`query invoice($invoiceId: ID!) {
          invoice(invoiceId: $invoiceId) {
              invoiceId
              amountOfTokens
              usdAmount
              coin
              spotPrice
              paymentAddress
              ethereumReturnAddress
          }}`;
      },
      variables() {
        return {
          invoiceId: this.invoiceId,
        };
      },
      client: 'invoices'
    },

  }
}
</script>

<style scoped>
.content {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  padding: 50px;
  padding-bottom: 100px;
  position: relative;
  min-height: 300px;
}
</style>


