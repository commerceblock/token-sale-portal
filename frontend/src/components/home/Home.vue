<template>
  <div class="wrapper">
    <next-steps-modal v-if="showNextSteps" @close="showNextSteps = false" />
    <form-wizard title="" subtitle="" class="invoice" color="#538C46" @on-complete="onComplete">
      <tab-content title="Distribution Details" icon="fa fa-cloud-download" :before-change="submitOrderV2">
        <div class="invoice-box">
          <invoice-header :title="'Contribution Details'" />
          <payment-details :usdAmount="usdAmount" :coin="coin" :tokenUnitPrice="tokenUnitPrice" :changeRates="changeRates" ref="paymentDetails" />
          <distribution-details :ethereumReturnAddress="ethereumReturnAddress" ref="distributionDetails" />
        </div>
      </tab-content>
      <tab-content title="Invoice Summary" icon="fa fa-qrcode">
        <div class="invoice-box">
          <invoice-summary-header :order="result" :cbtTokenAmount="cbtTokenAmount" :coin="coin" :paymentAddress="paymentAddress" :invoiceId="invoiceId" ref="invoiceSummaryHeader" />
          <invoice-summary :cryptoAmount="cryptoAmount" :coin="coin" :paymentAddress="paymentAddress" :usdAmount="usdAmount" />
        </div>
      </tab-content>
    </form-wizard>
    <div>
      <div class="footer"><a href="https://www.commerceblock.com/">https://www.commerceblock.com/</a></div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import InvoiceHeader from './InvoiceHeader.vue'
import DistributionDetails from './DistributionDetails.vue'
import PaymentDetails from './PaymentDetails.vue'
import InvoiceSummary from './InvoiceSummary.vue'
import InvoiceSummaryHeader from './InvoiceSummaryHeader.vue'
import NextStepsModal from './NextStepsModal.vue'
import {
  FormWizard,
  TabContent
} from 'vue-form-wizard'
import {
  computeTokenAmount,
  computeCryptoAmount
 } from '../../lib/util'

export default {
  name: 'Home',
  components: {
    InvoiceHeader,
    DistributionDetails,
    PaymentDetails,
    InvoiceSummary,
    InvoiceSummaryHeader,
    NextStepsModal,
    FormWizard,
    TabContent
  },
  data() {
    return {
      showNextSteps: false,
      result: null,
    }
  },
  computed: {
    apolloClient() {
      return this.$apollo.provider.defaultClient;
    },
    ethereumReturnAddress() {
      return this.orderV2 && this.orderV2.ethereumReturnAddress;
    },
    usdAmount() {
      return this.orderV2 && this.orderV2.usdAmount;
    },
    coin() {
      return this.orderV2 && this.orderV2.coin;
    },
    tokenUnitPrice() {
      return this.tokenInformation && this.tokenInformation.unitPrice;
    },
    changeRates() {
      return this.tickers
    },
    cbtTokenAmount() {
      if (this.orderV2
        && this.orderV2.usdAmount
        && this.tokenInformation
        && this.tokenInformation.unitPrice) {
        return computeTokenAmount(this.orderV2.usdAmount, this.tokenInformation.unitPrice);
      }
    },
    cryptoAmount() {
      if (this.orderV2
        && this.orderV2.usdAmount
        && this.orderV2.spotPrice) {
        return computeCryptoAmount(this.orderV2.usdAmount, this.orderV2.spotPrice);
      }
    },
    coin() {
      if (this.orderV2 && this.orderV2.coin) {
        return this.orderV2.coin;
      }
    },
    paymentAddress() {
      if (this.orderV2
        && this.orderV2.paymentAddress) {
        return this.orderV2.paymentAddress;
      }
    },
    usdAmount() {
      if (this.orderV2
        && this.orderV2.usdAmount) {
        return this.orderV2.usdAmount;
      }
    },
    invoiceId() {
      return this.orderV2 && this.orderV2.invoiceId;
    }
  },
  methods: {
    onComplete() {
      this.showNextSteps = true;
    },
    submitOrderV2() {
      if (this.orderV2 !== null) {
        return true;
      }

      const that = this;
      const distributionDetails = this.$refs.distributionDetails;
      return this.apolloClient
        .mutate({
          mutation: gql`mutation {
                  createOrderV2(order: {
                    ethereumReturnAddress: "${distributionDetails.$refs.ethereumReturnAddress.value}"
                    usdAmount: "${this.$refs.paymentDetails.$refs.usdAmount.value}"
                  }) {
                    invoiceId
                    amountOfTokens
                    usdAmount
                    coin
                    spotPrice
                    paymentAddress
                  }
                }`})
        .then(result => {
          that.$apollo.queries.orderV2.refetch();
          that.result = result
          console.log(result);
          return Promise.resolve(true);
        }).catch(err => {
          // TODO: show error
          console.log(err)
          return Promise.reject(err);
        });
    },
  },
  apollo: {
    tokenInformation: {
      query: function() {
        return gql`query {
            tokenInformation {
              unitPrice
            }
          }`;
      }
    },
    tickers: {
      query: function() {
        return gql`query {
            tickers {
              BTC
              ETH
            }
          }`;
      }
    },
    orderV2: {
      query: function() {
        return gql`query {
            orderV2 {
              invoiceId
              usdAmount
              coin
              spotPrice
              paymentAddress
              ethereumReturnAddress
            }
          }`;
      }
    },
  },
  mounted () {
    this.$refs.invoiceSummaryHeader.refreshTxStatus();
  },
}

</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.invoice {
  /*width: 600px;*/
  margin: 5px;
}

.invoice-box {
  border-radius: 3px;
  background-color: #FFFFFF;
  min-height: 535px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.25);
}

.footer {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  text-align: center;
}

.footer-link {
  font-family: "Open Sans";
  font-size: 14px;
  line-height: 19px;
  text-align: center;
}

a:link,
a:visited,
a:hover,
a:active {
  color: rgba(20, 20, 20, 0.5);
}
</style>
